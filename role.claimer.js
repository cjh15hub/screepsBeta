var roleClaimer = {
    
    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [CLAIM, WORK, CARRY, MOVE, MOVE],
            Cost : 850
        }
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        this.behavior(creep);
    },
    
    behavior: function(creep){
        let pathColor = creep.memory.pathColor || '#ffffff';
        
        // if(!creep.memory['reachedW']){
        //     creep.moveTo(Game.flags['W'], {visualizePathStyle: {stroke: pathColor }});
        // }
        
        // if(DISTANCE(creep.pos, Game.flags['W'].pos) == 0){
        //     creep.memory['reachedW'] = true;
        // }
        
        //if(creep.memory['reachedW']){
            
            //console.log(creep.room);
            
           if( Game.flags['Claim'].room && creep.room.name == Game.flags['Claim'].room.name){
                let status = creep.claimController(creep.room.controller);
                //console.log(status);
                if(status == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: pathColor }});
                }
                else if(status == 0){
                    creep.memory.role = 'upgrader';
                }
                
            }
            else{
                creep.moveTo(Game.flags['Claim'], {visualizePathStyle: {stroke: pathColor }});
            } 
        //}
            
    }
};

module.exports = roleClaimer