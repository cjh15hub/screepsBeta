var roleGraveRobber = {

    BluePrints: {
        MaxLevel: 2,
        LVL1: {
            Parts : [CARRY, CARRY, MOVE, MOVE],
            Cost : 200
        },
        LVL2: {
            Parts : [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            Cost : 300
        },
        LVL3: {
            Parts : [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            Cost : 400
        }
    },

    run: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.emote();
        
        if( (Object.keys(creep.carry).length > 1)){
            // has mineral
            //console.log(Object.keys(creep.carry)[0]);
            //console.log('holding mineral? ' + Object.keys(creep.carry)[1]);
            let dropOff = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => structure.structureType == STRUCTURE_STORAGE
            });
            
            creep.tryDepositMinerals(dropOff);
            
        }   
        else if(creep.carry.energy > 0){
            let target = null;
            
            //find storage containers
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                }
            });
            
            if(target){
                //this.deposit(target);
                creep.tryDepositEnergy(target);
            }
            else{
                // find primary drop locations
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER) && 
                                    structure.energy < structure.energyCapacity
                });
                
                if(target){
                    //this.deposit(target);
                    creep.tryDepositEnergy(target);
                }
                else{
                    console.log('Grave Robber: No where to put this!!!');
                }
            }
        }
        else{
            // no loot
            let mineralFound = false;
            
            let tombStone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: structure => Object.keys(structure.store).length > 1
            });
            
            let droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter : resource => resource.resourceType != RESOURCE_ENERGY
            });
            
            if(tombStone){
                mineralFound = true;
                //console.log('mineral found? ' + mineralFound);
            }
            else if(droppedResource){
                mineralFound = true;
                //console.log('mineral found? ' + mineralFound);
            }
            else{
                mineralFound = false;
                
                tombStone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                    filter: structure => structure.store[RESOURCE_ENERGY] > 0
                });
                
                droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                
            }
            
            if(mineralFound){
                if(tombStone){
                    if(DISTANCE(creep.pos, tombStone.pos) > 1){
                        creep.moveTo(tombStone, {visualizePathStyle: {stroke: pathColor}});
                    }
                    else{
                        let elementsFound = Object.keys(tombStone.store);
                        elementsFound = elementsFound.slice(1);
                        
                        for(let i = 0; i< elementsFound.length; i++){
                            let toWithdrawName = elementsFound[i];
                            creep.withdraw(tombStone, toWithdrawName);
                        }
                        
                        //creep.withdraw(tombStone, RESOURCE_ENERGY);
                    }
                }
                else if(droppedResource){
                    if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                        creep.moveTo(droppedResource, {visualizePathStyle: {stroke: pathColor}});
                    }
                }
                else{
                    console.log('WHAT?!?');
                }
            }
            else{
                if(tombStone){
                    creep.tryWithdrawEnergy(tombStone);
                    
                    // if(creep.withdraw(tombStone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    //     creep.moveTo(tombStone, {visualizePathStyle: {stroke: pathColor}});
                    // }
                }
                else if(droppedResource){
                    if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                        creep.moveTo(droppedResource, {visualizePathStyle: {stroke: pathColor}});
                    }
                }
                else{
                    //nothing
                    //console.log('out da way');
                    creep.moveTo(Game.flags[creep.memory.birthPlace], {visualizePathStyle: {stroke: pathColor}});
                }
            }
            
        }
        
    }

};

module.exports = roleGraveRobber;
