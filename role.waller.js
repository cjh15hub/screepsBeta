var roleWaller = {

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, MOVE],
            Cost : 500
        }
    },


    run: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.memory.isAggressive = true;
        
        // if(!creep.memory['reachedW']){
        //     creep.moveTo(Game.flags['W'], {visualizePathStyle: {stroke: pathColor}});
        // }
        
        // if(DISTANCE(creep.pos, Game.flags['W'].pos) == 0){
        //     creep.memory['reachedW'] = true;
        // }
        
        //if(creep.memory['reachedW']){
            if(Game.flags['Wall'].room && creep.room.name == Game.flags['Wall'].room.name){
                console.log('Ahhhhhh');
                let target = null;
                // let look = creep.room.lookAt(19, 39);
                // look.forEach(lookObject => {
                //   if(lookObject.type == LOOK_STRUCTURES && lookObject.structure && lookObject.structure.structureType == STRUCTURE_WALL){
                //       target = lookObject.structure;
                //       //console.log(target);
                //   }
                // });
                
                
                // if(!target){
                //     look = creep.room.lookAt(4, 23);
                //     look.forEach(lookObject => {
                //       if(lookObject.type == LOOK_STRUCTURES && lookObject.structure && lookObject.structure.structureType == STRUCTURE_WALL){
                //           target = lookObject.structure;
                //           //console.log(target);
                //       }
                //     });
                // }
                
                
                // if(!target){
                //     look = creep.room.lookAt(34, 29);
                //     look.forEach(lookObject => {
                //       if(lookObject.type == LOOK_STRUCTURES && lookObject.structure && lookObject.structure.structureType == STRUCTURE_WALL){
                //           target = lookObject.structure;
                //           //console.log(target);
                //       }
                //     });
                // }
                // if(!target){
                //     target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                //         filter: _creep => _creep.isDropMiner()
                //     });
                // }
                
                // if(!target){
                //     target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                //         filter: _creep => _creep.getActiveBodyparts(WORK) == 5
                //     });
                // }
                
                // if(!target){
                //     target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                //         filter: _creep => _creep.getActiveBodyparts(WORK) > 0
                //     });
                // }
                
                if(!target){
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: structure => structure.structureType == STRUCTURE_SPAWN
                    });
                }
                
                if(!target){
                    target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                }
                
                //console.log(target);
                
                if(target){
                    let status = creep.attack(target);
                    //console.log(creep.name);
                    //console.log(status);
                    //creep.say(status);
                    if(status == ERR_NOT_IN_RANGE){
                        creep.moveTo(target, {visualizePathStyle: {stroke: pathColor}});
                    }
                    else if(status == -12){
                        creep.moveTo(Game.flags['WALL'], {visualizePathStyle: {stroke: pathColor}});
                    }
                    else if(status == 0){
                        
                    }
                    else{
                        creep.moveTo(Game.flags['WALL'], {visualizePathStyle: {stroke: pathColor}});
                    }
                }
                else{
                    creep.moveTo(Game.flags['WALL'], {visualizePathStyle: {stroke: pathColor}});
                }
            }
            else{
                creep.moveTo(Game.flags['WALL'], {visualizePathStyle: {stroke: pathColor}});
            }
        //}
        
        
        
    }

};

module.exports = roleWaller;

