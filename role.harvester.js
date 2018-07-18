var roleBuilder = require('role.builder');

var roleHarvester = {

    ROLE_NAME : 'harvester',

    BluePrints: {
        MaxLevel: 4,
        LVL1: {
            Parts : [WORK, WORK, CARRY, MOVE],
            Cost : 300
        },
        LVL2: {
            Parts : [WORK, WORK, WORK, WORK, WORK, MOVE],//[WORK, WORK, CARRY, MOVE],
            Cost : 300
        },
        LVL3: {
            Parts : [WORK, WORK, WORK, WORK, WORK, MOVE],//[WORK, WORK, CARRY, MOVE],
            Cost: 300
        },
        LVL4: {
            Parts : [WORK, WORK, WORK, WORK, WORK, MOVE],
            Cost: 550
        }
    },


    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.isAggressive = true;
        creep.emote();
        
        let _sourceTarget = creep.memory['sourceTarget'];
        
        if(_sourceTarget != 0 && _sourceTarget != 1){
            console.log('sourceTarget not set');
            //Game.notify('sourceTarget not set');
            
            try{
            
                let zeroFound = false;
                for(let c in Game.creeps){
                    let _creep = Game.creeps[c];
                    
                    if(_creep.id != creep.id && _creep.memory.role == 'harvester' && _creep.memory.birthPlace == creep.memory.birthPlace && _creep.memory.sourceTarget == 0){
                        zeroFound = true;
                        //console.log(_creep);
                        break;
                    }
                    
                }
                //console.log(zeroFound);
                if(zeroFound){
                    _sourceTarget = 1;
                    creep.memory['sourceTarget'] = 1;
                }
                else{
                   _sourceTarget = 0;
                    creep.memory['sourceTarget'] = 0; 
                }
            }
            catch(err){
                Game.notify(err);
                _sourceTarget = 0;
                creep.memory['sourceTarget'] = 0; 
            }
            
        }
         
        creep.memory.dropMode = creep.isDropMiner() && Memory.rooms[creep.memory.birthPlace].dropContainerIds.length > 0;
        
        if(creep.memory.building){
            creep.say('B');
            roleBuilder.behavior(creep);
            return;
        }
        
        
        if(creep.carry.energy < creep.carryCapacity || creep.memory.dropMode) {
            let source = null;
            
            if(Memory.rooms[creep.memory.birthPlace].sourceIds){
                let sourceId = Memory.rooms[creep.memory.birthPlace].sourceIds[_sourceTarget];
                if(sourceId) source = Game.getObjectById(sourceId);
            }
            
            if(!source) source = creep.room.find(FIND_SOURCES)[_sourceTarget];
            
            if(creep.memory.dropMode){
                let containerId = Memory.rooms[creep.memory.birthPlace].dropContainerIds[_sourceTarget];
                let dest = Game.getObjectById(containerId);
                
                creep.moveTo(dest);
                creep.harvest(source);   
            }
            else{
                creep.tryHarvest(creep.room.find(FIND_SOURCES)[_sourceTarget]);
            }
        }
        else {
            // Full of energy 
            
            if(!creep.memory['dropMode']){
                //find basic structures
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, { 
                    filter: (structure) => (structure.structureType == STRUCTURE_EXTENSION || 
                    structure.structureType == STRUCTURE_SPAWN 
                    //|| structure.structureType == STRUCTURE_TOWER
                    ) && structure.energy < structure.energyCapacity
                });
                
                //find containers
                if(!target){
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: structure => (Memory.rooms[creep.memory.birthPlace].dropContainerIds.includes(structure.id)) 
                            && (structure.structureType == STRUCTURE_CONTAINER) 
                            && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                    });
                }
                
                if(target) {
                    creep.tryDepositEnergy(target);
                }
                else{
                    console.log(creep.name + ' is bored; I guess Ill build');
                    creep.memory.building = true;
    
                }
            }
            
        }
    }
    
};

module.exports = roleHarvester;
