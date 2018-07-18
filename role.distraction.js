var roleDistraction = {
    //Game.spawns['MotherLand'].spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], 'DudeGuierton2' , { memory: {role: 'melee' } });

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [MOVE, MOVE],
            Cost : 100
        }
    },

    run: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.memory.isAggressive = true;
        //creep.memory['reachedW'] = true;
        //console.log('drainer run');
        
        creep.emote();
        
        creep.moveTo(Game.flags['D']);
        // if(!creep.memory['reachedW']){
        //     creep.moveTo(Game.flags['W'], {visualizePathStyle: {stroke: pathColor}});
        // }
        
        // if(DISTANCE(creep.pos, Game.flags['W'].pos) == 0){
        //     creep.memory['reachedW'] = true;
        // }
        
        //if(creep.memory['reachedW']){
            
        //}
         
    }

};

module.exports = roleDistraction;

