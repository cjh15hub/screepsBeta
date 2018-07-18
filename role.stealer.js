var roleStealer = {

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            Cost : 600
        },
    },


    run: function(creep){
        creep.emote();
        let pathColor = creep.memory.pathColor || '#ffffff';
        
        // if(!creep.memory['reachedW']){
        //     creep.moveTo(Game.flags['W'], {visualizePathStyle: {stroke: pathColor }});
        // }
        
        // if(DISTANCE(creep.pos, Game.flags['W'].pos) == 0){
        //     creep.memory['reachedW'] = true;
        // }

        if(creep.ticksToLive < 5 && Game.flags[creep.memory.birthPlace] && creep.room.name == Game.flags[creep.memory.birthPlace].room.name){
            Game.notify('Died but within room! Dropped: ' + creep.carry.energy + ' Trip count: ' + creep.memory.tripCount);
        }
        else if(creep.ticksToLive < 5){
            Game.notify('Died in room: ' + creep.room.name + ' Trip count: ' + creep.memory.tripCount);
        }

        //if(creep.memory['reachedW']){
            if(creep.carry.energy < creep.carryCapacity){
                if(Game.flags['S'].room && creep.room.name == Game.flags['S'].room.name){
                   let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: structure => structure.structureType == STRUCTURE_STORAGE && structure.store.energy > 0
                    });
                    
                    if(!target){
                        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: structure => (structure.structureType == STRUCTURE_EXTENSION && structure.energy > 0) || (structure.structureType == STRUCTURE_TOWER && structure.energy > 0) || (structure.structureType == STRUCTURE_LINK && structure.energy > 0)
                        });
                    }
                    
                    let status = creep.tryWithdrawEnergy(target);
                    if(status == 0){
                        creep.memory['reachedW'] = false;
                    }
                    
                    if(target.store.energy == 0){
                        Game.notify('Theft Job Complete!!');
                    }
                    
                }
                else{
                    creep.moveTo(Game.flags['S'], {visualizePathStyle: {stroke: pathColor }});
                }
            }
            else{
                if(Game.flags[creep.memory.birthPlace].room && creep.room.name == Game.flags[creep.memory.birthPlace].room.name){
                    
                    // let target = creep.pos.findInRange(FIND_STRUCTURES, {
                    //     filter: structure => structure.structureType == STRUCTURE_CONTAINER && Memory.rooms[creep.memory.birthPlace].stationContainerIds.includes(structure.id)
                    // });
                    
                    let sstorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: structure => structure.structureType == STRUCTURE_STORAGE
                    });
                    
                    let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: structure => structure.structureType == STRUCTURE_CONTAINER 
                        && Memory.rooms[creep.memory.birthPlace].stationContainerIds.includes(structure.id)
                        && structure.store.energy < structure.storeCapacity
                    });
                    
                    if(container) console.log(container);
                    if(sstorage) console.log(sstorage);
                    
                    let status = creep.tryDepositEnergy(container || sstorage);
                    if(status == 0){
                        creep.memory['reachedW'] = false;
                        if(creep.memory['tripCount'] == undefined) creep.memory['tripCount'] = 0;
                        creep.memory['tripCount']++;
                        if(creep.memory.tripCount == 3){
                            Game.notify('Worth it boys!');
                        }
                        else if(creep.memory.tripCount == 4){
                            Game.notify('Woooh!');
                        }
                    }
                }
                else{
                    creep.moveTo(Game.flags[creep.memory.birthPlace], {visualizePathStyle: {stroke: pathColor }});
                }
            }
        //}
    } 
    
};

module.exports = roleStealer;