
var roleBuilder = require('role.builder');

var roleRemoteBuilder = {

    BluePrints : roleBuilder.BluePrints,

    /** @param {Creep} creep **/
    run: function(creep) {
        let pathColor = creep.memory.pathColor || '#ffffff';
        //console.log(creep.name + ' builder');
        //creep.say(creep.memory.remoteRoom && creep.room.name != Game.flags[creep.memory.remoteRoom].room.name);
        if(creep.memory.remoteRoom && (!Game.flags[creep.memory.remoteRoom].room || creep.room.name != Game.flags[creep.memory.remoteRoom].room.name) ){
            //console.log('remote');
            //console.log(creep.memory.remoteRoom);
            creep.moveTo(Game.flags[creep.memory.remoteRoom], {visualizePathStyle: {stroke: pathColor}});
            return;
        }
        
        // if(creep.memory.remoteRoom){
        //     creep.moveTo(Game.flags[creep.memory.remoteRoom], {visualizePathStyle: {stroke: pathColor}});
        // }
        
        roleBuilder.behavior(creep);// this.behavior(creep);
        
    }
    
};

module.exports = roleRemoteBuilder;
