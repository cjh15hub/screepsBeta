var roleBuilder = {

    BluePrints: {
        MaxLevel: 4,
        LVL1: {
            Parts : [WORK, CARRY, CARRY, MOVE, MOVE], //W1,C2,M2
            Cost : 300
        },
        LVL2: {
            Parts : [WORK, WORK, CARRY, CARRY, MOVE, MOVE], //W2,C2,M2
            Cost : 400
        },
        LVL3: {
            Parts : [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, MOVE ], //W2,C2,M4
            Cost : 500
        },
        LVL4: {
            Parts : [MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, MOVE ], //W2,C3,W5
            Cost : 600
        },
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        this.behavior(creep);
    },
    
    behavior : function(creep){
        creep.emote();
        let pathColor = creep.memory.pathColor || '#ffffff';
        
        let _sourceTarget = creep.memory['sourceTarget']!= 0 && creep.memory['sourceTarget']!= 1 ? 1 : creep.memory['sourceTarget'];
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.emote('[refreshing]');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.emote('[building]');
        }


        if(creep.memory.building) {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: site => site.structureType == STRUCTURE_SPAWN
            });
            //console.log(target);
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_TOWER
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_STORAGE
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_EXTENSION && site.progress > 0
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_EXTENSION
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_CONTAINER
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            }
            
            if(target) {
                creep.moveTo(target);
                creep.tryBuild(target);
                creep.memory['sourceFound'] = null;
            }
            else{
                //creep.say('R?');
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => (structure.hits / structure.hitsMax < .7) && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
                });
                
                //if(target)creep.say(true);
                //else creep.say(false);
                
                // Find a below average wall to reinforce
                if(!target){
                    let allWalls  = creep.room.find(FIND_STRUCTURES, {
                        filter: structure => structure.structureType == STRUCTURE_WALL
                    });
                    
                    let averageWall, sum = 0;
                    
                    for(let w = 0; w < allWalls.length; w++){
                        sum += allWalls[w].hits;
                    }
                    
                    averageWall = sum / allWalls.length;
                    //console.log('average wall: ' + averageWall);
                    if(averageWall < 1000){
                        target = allWalls[0];
                    }
                    else{
                        
                        for(let i = 1; i< 10; i++){
                            let percentOfAverage = (i / 10) * averageWall;
                            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: structure => (structure.hits < percentOfAverage ) && structure.structureType == STRUCTURE_WALL
                            });
                            
                            if(target) 
                                break;
                        }
                    }
                    
                }
                
                if(target){
                    creep.tryRepair(target);
                }
                else{
                    let target = creep.pos.findClosestByRange(STRUCTURE_SPAWN);
                    creep.tryDepositEnergy(target);
                }
            }
        } // End of building
        else {
            creep.emote('[refreshing]');
            let containersExist = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: structure => structure.structureType == STRUCTURE_CONTAINER
            });
            
            
            if(creep.memory.isStealing){
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: structure => structure.structureType == STRUCTURE_STORAGE
                });
                
                creep.tryWithdrawEnergy(target);
                return;
            }
            
            
            //console.log(creep.name + ' : ' + containersExist);
            if(containersExist){
                const droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: resource => resource.resourceType === RESOURCE_ENERGY
                });
            
                if(droppedResource){
                    let status = creep.pickup(droppedResource);
                    //console.log(status);
                    if(status == ERR_NOT_IN_RANGE){
                        creep.moveTo(droppedResource, {visualizePathStyle: {stroke: pathColor}});
                    }
                }
                else{
                    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: structure => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
                    });
                    //console.log(creep.name + ' : ' + target);
                    if(target){
                        creep.tryWithdrawEnergy(target);
                    }
                    else{
                        let sources = creep.room.find(FIND_SOURCES_ACTIVE).sort((a,b) => (b.energy*1) - (a.energy*1));
                        let sourceTarget
                        //console.log(creep.name + ' : ' + sources);
                        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[0], {visualizePathStyle: {stroke: pathColor}});
                        }
                    }
                }
                
            }
            else{
                let sourceFound =  creep.memory['sourceFound'];
                if(!sourceFound){
                    let sources = creep.room.find(FIND_SOURCES_ACTIVE).sort((a,b) => (b.energy*1) - (a.energy*1));
                    sourceFound = sources[0].id;
                    creep.memory.sourceFound = sourceFound;
                }
                
                if(creep.harvest(Game.getObjectById(sourceFound)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(sourceFound), {visualizePathStyle: {stroke: pathColor}});
                }
            }
            
        } // End of filling back up
    }
    
};

module.exports = roleBuilder;