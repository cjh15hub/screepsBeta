var roleMineralRunner = {

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
        
        
        // if(creep.memory.remoteRoom && (!Game.flags[creep.memory.remoteRoom].room || creep.room.name != Game.flags[creep.memory.remoteRoom].room.name) ){
        //     //console.log('remote');
        //     //console.log(creep.memory.remoteRoom);
        //     creep.moveTo(Game.flags[creep.memory.remoteRoom], {visualizePathStyle: {stroke: pathColor}});
        //     return;
        // }
        
        
        
        //console.log(creep.name +  ' storage found: ' + storageExists);
        let delivering = false;
        
        if(_.sum(creep.carry) == creep.carryCapacity){
            delivering = true;
        }
        else{
            delivering = false;
        }
        
        if(delivering){
             let dropOff = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => structure.structureType == STRUCTURE_STORAGE
            });
            
            creep.tryDepositMinerals(dropOff);
        }
        else{
             let droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter : resource => resource.resourceType != RESOURCE_ENERGY
            });
            
            if(droppedResource){
                if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedResource, {visualizePathStyle: {stroke: pathColor}});
                }
            }
            else{
                let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: structure => structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) > 0 && structure.store.energy == 0
                });
                
                if(container){
                    let key = Object.keys(container.store)[1];
                    //console.log(Object.keys(container.store));
                    let status = creep.withdraw(container, key);
                    if(status == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: pathColor}});
                    }
                }
                
            }
        }
        
        
    }

};

module.exports = roleMineralRunner;
