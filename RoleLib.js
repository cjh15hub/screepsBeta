var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGraveRobber = require('role.graverobber');
var roleRepairer = require('role.repairer');
var roleTransporter = require('role.transporter');
var roleDefender = require('role.defender');
var roleClaimer = require('role.claimer');
var roleMineralMiner = require('role.mineralminer');
var roleMineralRunner = require('role.mineralrunner');

var roleHealDrainer = require('role.healdrainer');
var roleMelee = require('role.melee');
var roleStealer = require('role.stealer');
var roleStealUpgrader = require('role.stealUpgrader');
var roleDistraction = require('role.distraction');

var roleRemoteHarvester = require('role.remoteHarvester');
var roleRemoteDeliverer = require('role.remoteDeliverer');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleRemoteRepairer = require('role.remoteRepairer');
var roleRemoteUpgrader = require('role.remoteUpgrader');
var roleReserver = require('role.reserver');
var roleXBuilder = require('role.xbuilder');

var roleAlakbar = require('role.alakbar');
//var newRole = require('role.newrole');


const RoleNames = {
    HARVESTER: 'harvester',
    UPGRADER: 'upgrader',
    BUILDER: 'builder',
    GRAVE_ROBBER: 'graveRobber',
    REPAIRER: 'repairer',
    TRANSPORTER: 'transporter',
    DEFENDER: 'defender',
    MELEE: 'melee',
    HEAL_DRAINER: 'healDrainer',
    CLAIMER: 'claimer',
    STEALER: 'stealer',
    STEAL_UPGRADER: 'stealUpgrader',
    REMOTE_HARVESTER: 'remoteHarvester',
    REMOTE_DELIVERER: 'remoteDeliverer',
    REMOTE_BUILDER: 'remoteBuilder',
    REMOTE_REPAIRER: 'remoteRepairer',
    REMOTE_UPGRADER: 'remoteUpgrader',
    DISTRACTION: 'distraction',
    RESERVER: 'reserver',
    XBUILDER: 'xbuilder',
    MINERAL_MINER: 'mineralMiner',
    MINERAL_RUNNER: 'mineralRunner'
    //NEWROLE: 'newRole'
}

let RoleLib = {
    
    RoleNames,
    
    Roles: {
        'harvester' : {
            behavior : roleHarvester,
            name: RoleNames.HARVESTER,
            pathColor: '#ffffff',
            roleEmote: '⛏️'
        },
        'upgrader' : {
            behavior : roleUpgrader,
            name: RoleNames.UPGRADER,
            pathColor: '#ffaa00',
            roleEmote: '🔺'
        },
        'builder' : {
            behavior : roleBuilder,
            name: RoleNames.BUILDER,
            pathColor: '#ffaa00',
            roleEmote: '🏗️'
        },
        'graveRobber' : {
            behavior : roleGraveRobber,
            name: RoleNames.GRAVE_ROBBER,
            pathColor: '#32CD32',
            roleEmote: '👻'
        },
        'repairer' : {
            behavior : roleRepairer,
            name: RoleNames.REPAIRER,
            pathColor: '#ffaa00',
            roleEmote: '🔧️'
        },
        'transporter' : {
            behavior : roleTransporter,
            name: RoleNames.TRANSPORTER,
            pathColor: '#0055ff',
            roleEmote: '🚎'
        },
        'defender' : {
            behavior : roleDefender,
            name: RoleNames.DEFENDER,
            pathColor: '#ff5500',
            roleEmote: '👮'
        },
        'melee' : {
            behavior : roleMelee,
            name: RoleNames.MELEE,
            pathColor: '#ff5500',
            roleEmote: '--|=====>'
        },
        'healDrainer' : {
            behavior : roleHealDrainer,
            name: RoleNames.HEAL_DRAINER,
            pathColor: '#ffffff',
            roleEmote: '[]'
        },
        'claimer' : {
            behavior : roleClaimer,
            name: RoleNames.CLAIMER,
            pathColor: '#ff0088',
            roleEmote: 'C'
        },
        'stealer': {
            behavior : roleStealer,
            name : RoleNames.STEALER,
            pathColor: '#ffffff',
            roleEmote: '💰'
        },
        'stealUpgrader': {
            behavior : roleStealUpgrader,
            name : RoleNames.STEAL_UUPGRADER,
            pathColor: '#ff0088',
            roleEmote: '🔺'
        },
        'alakbar': {
            behavior : roleAlakbar,
            name : 'alakabar',
            pathColor: '#ff5500',
            roleEmote: '💣'
        },
        'remoteHarvester': {
            behavior : roleRemoteHarvester,
            name : RoleNames.REMOTE_HARVESTER,
            pathColor: '#dd00ff',
            roleEmote: '🛰️⛏️'
        },
        'remoteDeliverer': {
            behavior : roleRemoteDeliverer,
            name : RoleNames.REMOTE_DELIVERER,
            pathColor: '#0055ff',
            roleEmote: '🍕'
        },
        'remoteBuilder': {
            behavior : roleRemoteBuilder,
            name : RoleNames.REMOTE_BUILDER,
            pathColor: '#ffaa00',
            roleEmote: ''
        },
        'remoteRepairer': {
            behavior : roleRemoteRepairer,
            name : RoleNames.REMOTE_REPAIRER,
            pathColor: '#ffaa00',
            roleEmote: '🛰️🔧'
        },
        'remoteUpgrader': {
            behavior : roleRemoteUpgrader,
            name : RoleNames.REMOTE_UPGRADER,
            pathColor: '#ffaa00',
            roleEmote: '🛰️🔺'
        },
        'distraction': {
            behavior : roleDistraction,
            name : RoleNames.DISTRACTION,
            pathColor: '#ffffff',
            roleEmote: '<>'
        },
        'reserver': {
            behavior : roleReserver,
            name : RoleNames.RESERVER,
            pathColor: '#ffaa00',
            roleEmote: '💡'
        },
        'xbuilder': {
            behavior : roleXBuilder,
            name : RoleNames.XBUILDER,
            pathColor: '#00ffff',
            roleEmote: 'X🏗️'
        },
        'mineralMiner': {
            behavior : roleMineralMiner,
            name : RoleNames.MINERAL_MINER,
            pathColor: '#ffffff',
            roleEmote: '💎️'
        },
        'mineralRunner': {
            behavior : roleMineralRunner,
            name : RoleNames.MINERAL_RUNNER,
            pathColor: '#00ffff',
            roleEmote: '🚚️'
        },
        // 'newRole' : {
        //     behavior : newRole,
        //     name : RoleNames.NEWROLE,
        //     pathColor: '#ffffff'
        // }
    },
    
    spawn(spawnName, role, _memory){
        let _role = RoleLib.Roles[role];
        if(_role){
            
            if(_role.behavior.spawn){
                return _role.behavior.spawn(_memory);
            }
            else{
                if(!_memory) _memory = {};
                
                _memory.role = _role.name;
                _memory.pathColor = _role.pathColor;
                _memory.birthPlace = spawnName; 
                
                _memory.roleEmote = _role.roleEmote || '??';
                
                let random = Math.random() * Math.floor(100);
                let toBeNamed = `${_role.name}-${random}`;
                toBeNamed = (toBeNamed + '').replace('.','');
                
                let status = 0;
                let _level = 0;
                
                if(!_memory.level){
                    _level = _role.behavior.BluePrints.MaxLevel;
                }
                else{
                    _level = _memory.level;
                }
                
                let prefix = 'Spawn: ' + spawnName + ', Role: ' ; 
                
                for(let i = _level; i > 0; i--){
                    console.log(prefix + _role.name + ' : ' + i);
                    status = Game.spawns[spawnName].spawnCreep(_role.behavior.BluePrints['LVL' + i].Parts, `LVL${i}_${toBeNamed}`, { memory: _memory });
                    if(status == 0) break;
                    else if(status == ERR_BUSY){
                        console.log('Spawn is busy.');
                        break;
                    }
                }
                
                //console.log(prefix + _role.name + ' spawn status: ' + status);
                return status;
            }
            
        }
        else{
            let message = 'Cannot spawn requested role: ' + role
            console.log(message);
            Game.notify(message);
        }
    },
    
    get RoleList(){
        return Object.keys(this.Roles);
    },
    
    get RolesList(){
        return this.RoleList;
    },
    

    RoleRunner: {
        run: function(creep){
            let behavior = RoleLib.Roles[creep.memory.role];
            if(behavior){
                try{
                    behavior.behavior.run(creep);
                }
                catch(err){
                    let message = 'Behavior: ' + creep.memory.role + ', Error: ' + err;
                    console.log(message);
                    Game.notify(message);
                }
            }
            else{
                let message = 'Invalid role on creep : ' + creep.name + ' with role ' + creep.memory.role
                console.log(message);
                Game.notify(message);
            }
        }
    }
}


SPAWN_STEALUPGRADER = function(){
    let status = RoleLib.spawn('MotherLand', RoleLib.RoleNames.STEAL_UPGRADER);
    console.log(status);
    return status;
}


SPAWN_CLAIMER = function(){
    let status = RoleLib.spawn('Steal', RoleLib.RoleNames.CLAIMER);
    console.log(status);
    return status;
}

SPAWN_DISTRACTION = function(){
    let status = RoleLib.spawn('Steal', RoleLib.RoleNames.DISTRACTION);
    //roleHealDrainer.spawn();
    console.log(status);
    return status;
}

SPAWN_DRAINER = function(){
    let status = RoleLib.spawn('Steal', RoleLib.RoleNames.HEAL_DRAINER);
    //roleHealDrainer.spawn();
    console.log(status);
    return status;
}

SPAWN_BARBARIAN = function(){
    let status = RoleLib.spawn('Steal', RoleLib.RoleNames.MELEE);
    //roleMelee.spawn();
    console.log(status);
    return status;
}

SPAWN_REMOTEHARVESTER = function(){
    let options = {
        remoteRoom : 'Steal',
        sourceTarget : 0
    };
    
    let status = RoleLib.spawn('MotherLand', RoleLib.RoleNames.REMOTE_HARVESTER, options);
    console.log(status);
    return status;
}

SPAWN_REMOTEDELIVERER = function(){
    let options = {
        remoteRoom : 'R0MotherLand',
        sourceTarget : 0
    };
    
    let status = RoleLib.spawn('MotherLand', RoleLib.RoleNames.REMOTE_DELIVERER, options);
    console.log(status);
    return status;
}

SPAWN_XBUILDER = function(){
    let status = RoleLib.spawn('MotherLand', RoleLib.RoleNames.XBUILDER);
    console.log(status);
    return status;
}

SPAWN_MINERALRUNNER = function(){
    let status = RoleLib.spawn('MotherLand', RoleLib.RoleNames.MINERAL_RUNNER);
    console.log(status);
    return status;
}

module.exports = RoleLib;
