
var roleRemoteHarvester = {

    BluePrints: {
        MaxLevel: 2,
        LVL1: {
            Parts : [WORK, WORK, WORK, WORK, WORK, MOVE],
            Cost : 550
        },
        LVL2: {
            Parts : [MOVE, WORK, WORK, WORK, WORK, WORK, MOVE],
            Cost : 600
        }
    },


    /** @param {Creep} creep **/
    run: function(creep) {
        let pathColor = creep.memory.pathColor || '#ffffff';
        
        creep.emote();
        
        let _sourceTarget = creep.memory['sourceTarget'];
        let remoteRoom = creep.memory['remoteRoom'];
        
        //creep.memory.dropMode = creep.isDropMiner() && Memory.rooms[creep.memory.remoteRoom].dropContainerIds.length > 0;
        //creep.say(Game.flags[creep.memory.remoteRoom].room.name);
        //creep.say(creep.room.name != Game.flags[creep.memory.remoteRoom].name);
        if(!Game.flags[creep.memory.remoteRoom].room || creep.room.name != Game.flags[creep.memory.remoteRoom].room.name){
            creep.say('🚲');
            // if(!creep.memory['reachedW']){
            //     creep.moveTo(Game.flags['W'], {visualizePathStyle: {stroke: pathColor}});
            // }
            
            // if(DISTANCE(creep.pos, Game.flags['W'].pos) == 0){
            //     creep.memory['reachedW'] = true;
            // }
            
            //if(creep.memory['reachedW']){
                creep.moveTo(Game.flags[creep.memory.remoteRoom], {visualizePathStyle: {stroke: pathColor}});
            //}
            return;
        }
        
        let source = null;
        
        if(Memory.remoteRooms[remoteRoom].sourceIds){
            let sourceId = Memory.remoteRooms[remoteRoom].sourceIds[_sourceTarget];
            if(sourceId) source = Game.getObjectById(sourceId);
        }
        
        if(!source) source = creep.room.find(FIND_SOURCES)[0];
        
        let containerId = Memory.remoteRooms[remoteRoom].dropContainerIds[_sourceTarget];
        let dest = Game.getObjectById(containerId);
        
        if(!dest) dest = source;
        
        creep.moveTo(dest);
        creep.harvest(source);   

    }
    
};

module.exports = roleRemoteHarvester;
