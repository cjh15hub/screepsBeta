var roleHealDrainer = {
    //Game.spawns['MotherLand'].spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], 'DudeGuierton2' , { memory: {role: 'melee' } });

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL],
            Cost : 780
        },
        LVL2: {
            Parts : [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL],
            Cost : 900
        }
    },

    run: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.memory.isAggressive = true;
        //creep.memory['reachedW'] = true;
        //console.log('drainer run');
        
        //creep.say('H');
        
        let target = creep.pos.findClosestByRange(FIND_CREEPS, {
            filter: _creep => _creep.hits < _creep.hitsMax
        });
        if(target){
            creep.heal(target);
        }
        
        
        // if(!creep.memory['reachedW']){
        //     creep.moveTo(Game.flags['W'], {visualizePathStyle: {stroke: pathColor}});
        // }
        
        // if(DISTANCE(creep.pos, Game.flags['W'].pos) == 0){
        //     creep.memory['reachedW'] = true;
        // }
        
        //if(creep.memory['reachedW']){
            if(creep.hitsMax - creep.hits >= 350){
                creep.memory['healing'] = true;
                creep.moveTo(Game.flags['H'], {visualizePathStyle: {stroke: pathColor}});
                //creep.heal(creep);
            }
            else if(creep.hitsMax == creep.hits){
                creep.memory['healing'] = false;
            }
            
            if(creep.memory['healing']){
                creep.moveTo(Game.flags['H'], {visualizePathStyle: {stroke: pathColor}});
                creep.heal(creep);
            }
            else{
                let status = creep.moveTo(Game.flags['D'], {visualizePathStyle: {stroke: pathColor}});
                //console.log('HD move status: ' + status);
            }
        //}
         
    }

};

module.exports = roleHealDrainer;

