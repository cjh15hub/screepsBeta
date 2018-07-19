

var roleTransporter = {

    BluePrints: {
        MaxLevel: 3,
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
        },
        LVL4: {
            Parts : [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            Cost : 600
        },
    },


    run: function(creep){
        creep.emote();
        let pathColor = creep.memory.pathColor || '#ffffff';
        
        
        let percent = creep.carry.energy / creep.carryCapacity;
        
        if(creep.memory.delivering && creep.carry.energy == 0){
            creep.memory.delivering = false;
        }
        if(!creep.memory.delivering && percent > .5 ){
            creep.memory.delivering = true;
        }
        
        
        //console.log(percent);
        if(creep.memory.delivering){
            // find primary store locations
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.energy < structure.energyCapacity
            });
            
            if(!target){
                //console.log('all full');
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => {
                        return (structure.structureType == STRUCTURE_LINK && structure.energy < structure.energyCapacity)
                        ||
                        (structure.structureType == STRUCTURE_CONTAINER
                        && structure.store[RESOURCE_ENERGY] < structure.storeCapacity
                        && Memory.rooms[creep.memory.birthPlace].stationContainerIds.includes(structure.id)
                        //DISTANCE(structure.pos, Game.spawns['MotherLand'].pos) > 10
                        );
                    }
                });
                //console.log(target);
            }
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: structure => structure.structureType == STRUCTURE_STORAGE
                });
                Game.notify('Transporter found everything to be full. Storage time.');
                
            }
            
            if(target){
                let status = creep.tryDepositEnergy(target);
                //console.log(status);
            }
        }
        else{
            // no loot
            const pennyTheory = creep.carryCapacity * .666;

            let droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: dropped => dropped.energy > pennyTheory && dropped.resourceType == RESOURCE_ENERGY
            });
            
            
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
                        && structure.store[RESOURCE_ENERGY] > 35 
                        && Memory.rooms[creep.memory.birthPlace].dropContainerIds.includes(structure.id)
                        //&& DISTANCE(structure.pos, Game.spawns['MotherLand'].pos) <= 10
                    }
                });
                    
                if(target){
                    creep.tryWithdrawEnergy(target);
                }
            }
            
        }
        
    }
    
};

module.exports = roleTransporter;