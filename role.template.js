var roleNameMe = {

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            Cost : 600
        },
    },


    run: function(creep){
        creep.say('');
        
        // let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: structure => structure.structureType == STRUCTURE_STORAGE
        // });
                    
        // creep.moveTo(target, {visualizePathStyle: {stroke: pathColor }});
        
    } 
};

module.exports = roleNameMe;
