var roleStealUpgrader = {
    ROLE_NAME: 'stealUpgrader',
    
    BluePrints: {
        MaxLevel: 2,
        LVL1: {
            Parts : [WORK, CARRY, CARRY, MOVE, MOVE],
            Cost : 300
        },
        LVL2: {
            Parts : [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
            Cost : 600
        },
        
    },


    spawn: function(options){
        //{ level, source}
        let random = Math.random() * Math.floor(100);
        let toBeNamed = `${this.ROLE_NAME}-${random}`;
        toBeNamed = (toBeNamed + '').replace('.','');
        
        let status = 0;
        
        
        named = toBeNamed;
        status = Game.spawns['MotherLand'].spawnCreep(this.BluePrints.LVL2.Parts, named , { memory: {role: this.ROLE_NAME  } });
        if(status!=0)
            status = Game.spawns['MotherLand'].spawnCreep(this.BluePrints.LVL1.Parts, named , { memory: {role: this.ROLE_NAME  } });
        
        console.log(this.ROLE_NAME + ' spawn status: ' + status);
        
        return status;
    },

    run: function(creep) {
        //return;
        this.behavior(creep);
    },
    
    behavior: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.emote();
        
        
        if(creep.room.name != Game.flags['Claim'].room.name){
             if(!creep.memory['reachedW']){
                creep.moveTo(Game.flags['W'], {visualizePathStyle: {stroke: pathColor}});
            }
            
            if(DISTANCE(creep.pos, Game.flags['W'].pos) == 0){
                creep.memory['reachedW'] = true;
            }
            
            if(creep.memory.reachedW)
                creep.moveTo(Game.flags['Claim']);
            return;
        }
        
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
            
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: structure => structure.structureType == STRUCTURE_STORAGE && structure.store.energy > 0
            });
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: structure => (structure.structureType == STRUCTURE_EXTENSION && structure.energy > 0) || (structure.structureType == STRUCTURE_TOWER && structure.energy > 0) || (structure.structureType == STRUCTURE_LINK && structure.energy > 0)
                });
            }
            
            if(target){
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: pathColor }});
                }
            }
            else{
                
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_LINK || s.structureType == STRUCTURE_TOWER
                });
                
                if(target){
                    if(creep.dismantle(target) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target, {visualizePathStyle: {stroke: pathColor }});
                    }
                }
                else{
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: pathColor }});
                    }
                }
                
            }
            
        }
    },
};

module.exports = roleStealUpgrader;
