var roleRemoteTransporter = {

    BluePrints: {
        MaxLevel: 2,
        LVL1: {
            Parts : [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            Cost : 300
        },
        LVL2: {
            Parts : [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            Cost : 400
        }
    },


    run: function(creep){
        creep.emote();
        let pathColor = creep.memory.pathColor || '#ffffff';
        
        let percent = creep.carry.energy / creep.carryCapacity;
        
        if(creep.memory.delivering && creep.carry.energy == 0){
            creep.memory.delivering = false;
        }
        if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity ){
            creep.memory.delivering = true;
        }
        
        let _sourceTarget = creep.memory['sourceTarget'];
        let remoteRoom = creep.memory['remoteRoom'];
        
        let isInRemoteRoom = null;
        if(!Game.flags[creep.memory.remoteRoom].room || creep.room.name != Game.flags[creep.memory.remoteRoom].room.name){
            isInRemoteRoom = false;
        }
        else{
            isInRemoteRoom = true;
        }
        
        //creep.say(creep.memory.delivering);
        
        //console.log(percent);
        if(creep.memory.delivering){
            // find primary store locations
            if(isInRemoteRoom){
                let status = creep.moveTo(Game.flags[creep.memory.birthPlace], {visualizePathStyle: {stroke: pathColor}});
                //console.log(status);
                return;
            }
            
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => 
                        (structure.structureType == STRUCTURE_LINK && structure.energy < structure.energyCapacity)
                        ||
                        (structure.structureType == STRUCTURE_CONTAINER
                        && structure.store[RESOURCE_ENERGY] < structure.storeCapacity
                        && Memory.rooms[creep.memory.birthPlace].stationContainerIds.includes(structure.id)
                        //DISTANCE(structure.pos, Game.spawns['MotherLand'].pos) > 10
                        )
                    
            });
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: structure => structure.structureType == STRUCTURE_STORAGE
                });
            }
            
            //console.log(target);
            
            if(target){
                let status = creep.tryDepositEnergy(target);
                //console.log(status);
            }
        }
        else{
            // no loot
            if(!isInRemoteRoom){
                creep.moveTo(Game.flags[creep.memory.remoteRoom], {visualizePathStyle: {stroke: pathColor}});
                return;
            }
            
            let droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: dropped => dropped.resourceType == RESOURCE_ENERGY
            });
            
            //console.log('rt dropped resource ' + droppedResource);
            
            if(droppedResource){
                let status = creep.pickup(droppedResource);
                //console.log(status);
                if(status == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedResource, {visualizePathStyle: {stroke: pathColor }});
                }
            }
            else{
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER 
                        && structure.store[RESOURCE_ENERGY] > 0 
                        && Memory.remoteRooms[creep.memory.remoteRoom].dropContainerIds.includes(structure.id)
                        //&& DISTANCE(structure.pos, Game.spawns['MotherLand'].pos) <= 10
                    }
                });
                 
                //creep.say(Memory.remoteRooms[creep.memory.remoteRoom].dropContainerIds);
                    
                if(target){
                    creep.tryWithdrawEnergy(target);
                }
                else{
                    creep.moveTo(Game.flags[creep.memory.remoteRoom], {visualizePathStyle: {stroke: pathColor }});
                }
            }
            
        }
        
    }
    
};

module.exports = roleRemoteTransporter;
