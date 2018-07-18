var roledefender = {

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, MOVE ], //T1,A3,M4
            Cost : 450
        }
    },


    run: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        creep.memory.isAggressive = true;
        creep.emote();
        
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(target){
            if(creep.attack(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target, {visualizePathStyle: {stroke: pathColor}});
            }
        }
        else{
            creep.moveTo(Game.flags[creep.memory.post], {visualizePathStyle: {stroke: pathColor }});
        }
        
    },

};

module.exports = roledefender;

