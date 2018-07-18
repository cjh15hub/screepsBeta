var roleUpgrader = {
    
    BluePrints: {
        MaxLevel: 6,
        LVL1: {
            Parts : [WORK, CARRY, CARRY, MOVE, MOVE],
            Cost : 300
        },
        LVL2: {
            Parts : [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            Cost : 400
        },
        LVL3: {
            Parts: [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, MOVE],
            Cost : 500
        },
        LVL4: {
            Parts: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE],
            Cost : 700
        },
        LVL5: {
            Parts: [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE],
            Cost : 900
        },
        LVL6: {
            Parts: [ MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE],
            Cost : 950
        }
    },


    run: function(creep) {
        //return;
        this.behavior(creep);
    },
    
    behavior: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.emote();
        
        //return;
        
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.emote('[refreshing]');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.emote('[upgrading]');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: pathColor}});
            }
            else{
                //creep.moveTo(Game.flags['UpgradeSite']);
            }
        }
        else {
            
            let containersExist = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => structure.structureType == STRUCTURE_CONTAINER
            });
            
            if(containersExist){
                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => 
                        (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0 )
                        ||
                        (structure.structureType == STRUCTURE_LINK && structure.energy > 0)
                    
                });
                
                if(target){
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target, {visualizePathStyle: {stroke: pathColor }});
                    }
                }
                else{
                    
                    creep.moveTo(Game.flags[creep.memory.birthPlace]);
                }
            }
            else{
                //let sources = creep.room.find(FIND_SOURCES);
                let sources = creep.room.find(FIND_SOURCES_ACTIVE).sort((a,b) => (b.energy*1) - (a.energy*1));
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: pathColor }});
                }
            }
            
            
        }
    }
};

module.exports = roleUpgrader;
