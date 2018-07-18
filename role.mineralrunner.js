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
        creep.say('🚚');
        
        let storageExists = creep.room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_STORAGE
        });
        
        //console.log(creep.name +  ' storage found: ' + storageExists);
        let delivering = false;
        
        if(_.sum(creep.carry) == creep.carryCapacity){
            delivering = true;
        }
        else{
            delivering = true;
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
        }
        
        
    }

};

module.exports = roleMineralRunner;
