var roleXBuilder = {

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
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
        
        //let _sourceTarget = creep.memory['sourceTarget']!= 0 && creep.memory['sourceTarget']!= 1 ? 1 : creep.memory['sourceTarget'];
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.emote('[refreshing]');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.emote('[xbuilding]');
        }


        if(creep.memory.building) {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: site => site.structureType == STRUCTURE_TOWER
            });
            //console.log(target);
            
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_EXTRACTOR
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_LAB && site.progress > 0
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_LAB
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.progress > 0
                });
            }
            
            if(!target){
                target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            }
            
            if(target) {
                creep.moveTo(target);
                creep.tryBuild(target);
            }
            else{
                creep.say('R?');
                
            }
        } // End of building
        else {
            creep.emote('[refreshing]');
            let storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: structure => structure.structureType == STRUCTURE_STORAGE && structure.store.energy > 50000
            });
            
            creep.tryWithdrawEnergy(storage);
            
        } // End of filling back up
    }
    
};

module.exports = roleXBuilder;
