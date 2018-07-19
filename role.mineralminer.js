var roleMineralMiner = {

    BluePrints: {
        MaxLevel: 2,
        LVL1: {
            Parts : [WORK, WORK, WORK, WORK, MOVE, MOVE],
            Cost: 500
        },
        LVL2: {
            Parts : [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE],
            Cost: 600
        },
    },


    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.isAggressive = true;
        creep.emote();
        
        let sourceTarget = creep.memory['sourceTarget'];
        
        //creep.memory.dropMode = creep.isDropMiner();
        
        let mineralTarget = Game.getObjectById(sourceTarget);
        
        let targetMineralType;
        
        if(mineralTarget) targetMineralType = mineralTarget.mineralType;
        
        if(!mineralTarget){
            mineralTarget = creep.pos.findClosestByRange(FIND_MINERALS);
        }
        
        if(mineralTarget){
            creep.tryHarvest(mineralTarget);
        }
        
    }
    
};

module.exports = roleMineralMiner;
