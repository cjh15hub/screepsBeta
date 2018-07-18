var roleRepairer = {

    BluePrints: {
        MaxLevel: 3,
        LVL1: {
            Parts : [WORK, CARRY, MOVE, MOVE],
            Cost : 250
        },
        LVL2: {
            Parts : [WORK, WORK, CARRY, MOVE, MOVE],
            Cost : 350
        },
        LVL3: {
            Parts : [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
            Cost : 550
        }
    },


    /** @param {Creep} creep **/
    run: function(creep) {
        this.behavior(creep);
    },
    
    behavior : function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.emote();
        
        let _sourceTarget = 1;//creep.memory['sourceTarget'] || 0;
        //creep.say(creep.memory.repairing);
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('R');
        }

        if(creep.memory.repairing) {
            
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => (structure.hits / structure.hitsMax < .5) 
                    && structure.structureType != STRUCTURE_WALL
                    && structure.structureType != STRUCTURE_RAMPART
            });
            
            if(!target){
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => (structure.hits < structure.hitsMax) 
                        && structure.structureType != STRUCTURE_WALL
                        && structure.structureType != STRUCTURE_RAMPART
                });
            }
            
            if(target){
                creep.tryRepair(target);
            }
            else{
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target){
                    creep.tryBuild(target);
                }
            }
        }
        else {
            let containersExist = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => structure.structureType == STRUCTURE_CONTAINER
                });
            
            if(containersExist){
                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
                });
                
                //creep.say('c ' + containersExist);
                if(target){
                    creep.tryWithdrawEnergy(target);
                    // if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    //     creep.moveTo(target, {visualizePathStyle: {stroke: '#ff55ff'}});
                    // }
                }
                else{
                    let sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: pathColor }});
                    }
                }
            }
            else{
                let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: pathColor }});
                }
            }
            
        }
    }
    
};

module.exports = roleRepairer;
