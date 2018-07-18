var roleReserver = {

    BluePrints: {
        MaxLevel: 1,
        LVL1: {
            Parts : [CLAIM, MOVE, MOVE],
            Cost : 700
        }
    },


    run: function(creep){
        creep.emote();
        let pathColor = creep.memory.pathColor || '#ffffff';
        
        let remoteRoom = creep.memory['remoteRoom'];
        
        let isInRemoteRoom = null;
        if(!Game.flags[creep.memory.remoteRoom].room || creep.room.name != Game.flags[creep.memory.remoteRoom].room.name){
            isInRemoteRoom = false;
        }
        else{
            isInRemoteRoom = true;
        }
        
        if(!isInRemoteRoom){
            creep.moveTo(Game.flags[creep.memory.remoteRoom], {visualizePathStyle: {stroke: pathColor}});
            //return;
        }
        else{
            
            if(creep.room.controller) {
                let status = creep.reserveController(creep.room.controller);
                if(status == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                else if(status !== 0){
                    creep.say('Grr ' + status);
                }
            }
            else{
                creep.say('????');
                console.log('cannot find controller in room');
            }
            
        }
        
        
    }
    
};

module.exports = roleReserver;
