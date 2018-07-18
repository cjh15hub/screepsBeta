var roleAlakbar = {

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [MOVE],
            Cost : 50
        },
    },


    run: function(creep){
        creep.emote();
        
        let spawn = Game.getObjectById(Memory.rooms[creep.memory.birthPlace].spawnId);
        
        if(DISTANCE(creep.pos, spawn.pos) > 1){
            creep.moveTo(spawn);
        }
        else{
            spawn.recycleCreep(creep);
            //creep.suicide();
        }
        
    } 
};

ALAKBAR = function(creepId){
    let creep = Game.getObjectById(creepId);
    creep.memory.role = 'alakbar';
}

module.exports = roleAlakbar;
