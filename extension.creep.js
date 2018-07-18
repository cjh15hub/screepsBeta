const utilEmotes = require('util.emotes');

var extensionCreep = {
    
};

Creep.prototype.isDropMiner = function(){
    if(this.memory.isDropMiner === true || this.memory.isDropMiner === false){
        return this.memory.isDropMiner;
    }
    
    let body = this.body;
    let workParts = 0;
    let moveParts = 0;
    for(let i =0; i< body.length; i++){
        if(body[i].type == WORK) workParts ++;
        else if(body[i].type == MOVE) moveParts++;
    }
    if(workParts >= 5 && moveParts >= 1){
        this.memory.isDropMiner = true;
    }
    else{
        this.memory.isDropMiner = false;
    }
    
    return this.memory.isDropMiner;
}

Creep.prototype.isDangerous = function(){
    let body = this.body;
    let isDangerous = false;
    for(let i = 0; i < body .length; i++){
        //console.log(body[i].type);
        if(body[i].type == ATTACK || body[i].type == RANGED_ATTACK){
            isDangerous = true;
            break;
        }
    }
    
    return isDangerous;
}

Creep.prototype.runAway = function(){
    if(!this.memory.isAggresive){
        this.say('😨');
        let target = this.room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_SPAWN
        })[0];
        if(target){
            this.moveTo(target);
        }
        else{
            this.moveTo(Game.flags['M1']);
        }
    }
}

Creep.prototype.tryHarvest = function(source){
    let status = this.harvest(source);
    let pathColor = this.memory.pathColor || '#ffffff';
    if(status == ERR_NOT_IN_RANGE) {
        this.moveTo(source, {visualizePathStyle: {stroke: pathColor}});
    }
    return status;
}

Creep.prototype.tryBuild = function(site){
    let status = this.build(site);
    let pathColor = this.memory.pathColor || '#ffffff';
    if(status == ERR_NOT_IN_RANGE) {
        this.moveTo(site, {visualizePathStyle: {stroke: pathColor}});
    }
    return status;
}

Creep.prototype.tryRepair = function(structure){
    let status = this.repair(structure);
    let pathColor = this.memory.pathColor || '#ffffff';
    if(status == ERR_NOT_IN_RANGE) {
        this.moveTo(structure, {visualizePathStyle: {stroke: pathColor}});
    }
    return status;
}


Creep.prototype.tryDepositEnergy = function(site){
    let status = this.transfer(site, RESOURCE_ENERGY);
    let pathColor = this.memory.pathColor || '#ffffff';
    if(status == ERR_NOT_IN_RANGE) {
        this.moveTo(site, {visualizePathStyle: {stroke: pathColor}});
    }
    return status;
}

Creep.prototype.tryDepositMinerals = function(site){
    let pathColor = this.memory.pathColor || '#ffffff';
    let mineral = Object.keys(this.carry)[1];
    //console.log('type of mineral' + mineral);
    let status = this.transfer(site, mineral);
    if(status == ERR_NOT_IN_RANGE){
        this.moveTo(site, {visualizePathStyle: {stroke: pathColor}});
    }
    else{
        console.log('try deposit mineral status ' + status);
    }
    return status;
}


Creep.prototype.tryWithdrawEnergy = function(site){
    let status = this.withdraw(site, RESOURCE_ENERGY);
    let pathColor = this.memory.pathColor || '#ffffff';
    if(status == ERR_NOT_IN_RANGE) {
        this.moveTo(site, {visualizePathStyle: {stroke: pathColor}});
    }
    return status;
}

Creep.prototype.emote = function(message){
    if(message){
        if(message.charAt(0) === '[' && message.charAt(message.length-1) === ']'){
            let key =  message.substring(1, message.length-2);
            let val = utilEmotes[key];
            
            if(val){
                message = val;
            }
        }
    }
    else{
        message = '';
    }

    return this.say(this.memory.roleEmote + message);
}

module.exports = extensionCreep;
