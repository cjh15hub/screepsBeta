
var RoleLib = require('RoleLib');
require('util.count');
require('util.room');

require('extension.creep');
require('utils');


module.exports.loop = function () {
    //console.log( XPARTS( MOVE, XWORK(2), XCARRY(2), XMOVE(3)) );
    //left overs /////////////////////

    ////////////////////////////////
        
    let roomCreepMap = {};
    let birthPlaces = Object.keys(Memory.rooms);
        //birthPlaces.forEach(b => console.log(b));
    
    // Clean up dead creeps and organize them  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for(var c in Memory.creeps) {
        
        if(!Game.creeps[c]) {
            delete Memory.creeps[c];
        }
        else{
            let creep = Game.creeps[c];
            
            if(birthPlaces.indexOf(creep.memory.birthPlace) != -1 ){
                //console.log(Game.creeps[c].name);
                if(!roomCreepMap[creep.memory.birthPlace]) roomCreepMap[creep.memory.birthPlace] = [];
                
                roomCreepMap[creep.memory.birthPlace].push(creep);
            }
            else{
                console.log('homeless creep: ' + creep.name + ' home: ' + creep.memory.birthPlace);
                creep.memory.birthPlace = 'MotherLand';
            }
            
        }
    }
    

    //Room specific code low priority   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    // Room Management  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let availableRoles = RoleLib.RolesList;
    
    for(let r in Memory.rooms){
        let room = Memory.rooms[r];
        //console.log(room.spawnName);
        
        let hostiles = Game.rooms[room.location].find(FIND_HOSTILE_CREEPS, {
            filter: hostile => hostile.owner.username != 'Invader'
        });
        
        if (hostiles.length > 0) {
            console.log('safe mode!');
            Game.rooms[room.location].controller.activateSafeMode();
        }
        
        
        
        let roomCreeps = roomCreepMap[room.spawnName];
        let roomRemoteRoomCount = {};
        if(!roomCreeps) roomCreeps = [];
        
        let UnitRequirements = room.REQ;
        
        let countChecker = CountCheck(availableRoles);
        
        //Count Roles   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        for(let i = 0; i < roomCreeps.length; i++){
            let _creep = roomCreeps[i];
            let role = _creep.memory.role;
            
            if(_creep.memory.remoteRoom){
                //console.log('creep found that is remote. Role: ' + _creep.memory.role + '; Home is:  ' + _creep.memory.birthPlace + '; Remote is: ' + _creep.memory.remoteRoom)
                if(!roomRemoteRoomCount[_creep.memory.remoteRoom]){
                    roomRemoteRoomCount[_creep.memory.remoteRoom] = CountCheck(availableRoles);
                }
                
                if(roomRemoteRoomCount[_creep.memory.remoteRoom][role] != 'undefined'){
                    roomRemoteRoomCount[_creep.memory.remoteRoom][role]++;
                }
                //roomRemoteRoomCount[_creep.memory.remoteRoom].push(_creep);
            }
            else{
                if(countChecker[role] != 'undefined'){
                    countChecker[role]++;
                }
            }
            
        }
        
        
        
        //Remote Rooms
        let remoteRooms = room.remoteRoomNames || [];
        for(let rr = 0; rr < remoteRooms.length; rr++){
            
            let remoteRoomName = remoteRooms[rr];
            //console.log(remoteRoomName);
            
            let remoteRoom = Memory.remoteRooms[remoteRoomName];
            let remoteRoomREQ = remoteRoom.REQ;
            
            if(!roomRemoteRoomCount[remoteRoomName]){
                // zero everything out if there were no creeps to generate the empty count earlier
                roomRemoteRoomCount[remoteRoomName] = CountCheck(availableRoles);
            }
            
            if(roomRemoteRoomCount[remoteRoomName].remoteUpgrader < remoteRoomREQ.remoteUpgrader){
                //console.log('need builder role: ' + RoleLib.RoleNames.REMOTE_BUILDER);
                let status = RoleLib.spawn(remoteRoom.spawnName, RoleLib.RoleNames.REMOTE_UPGRADER, {remoteRoom: remoteRoomName });
            }
            
            if(roomRemoteRoomCount[remoteRoomName].defender < remoteRoomREQ.defender){
                //console.log('need builder role: ' + RoleLib.RoleNames.DEFENDER);
                let status = RoleLib.spawn(remoteRoom.spawnName, RoleLib.RoleNames.DEFENDER, {remoteRoom: remoteRoomName, post: remoteRoomName });
            }
            
            if(roomRemoteRoomCount[remoteRoomName].reserver < remoteRoomREQ.reserver){
                //console.log('need builder role: ' + RoleLib.RoleNames.RESERVER);
                let status = RoleLib.spawn(remoteRoom.spawnName, RoleLib.RoleNames.RESERVER, {remoteRoom: remoteRoomName });
            }
            
            if(roomRemoteRoomCount[remoteRoomName].remoteRepairer < remoteRoomREQ.remoteRepairer){
                //console.log('need builder role: ' + RoleLib.RoleNames.REMOTE_REPAIRER);
                let status = RoleLib.spawn(remoteRoom.spawnName, RoleLib.RoleNames.REMOTE_REPAIRER, {remoteRoom: remoteRoomName, level: 1 });
            }
            
            if(roomRemoteRoomCount[remoteRoomName].remoteBuilder < remoteRoomREQ.remoteBuilder){
                //console.log('need builder role: ' + RoleLib.RoleNames.REMOTE_BUILDER);
                let status = RoleLib.spawn(remoteRoom.spawnName, RoleLib.RoleNames.REMOTE_BUILDER, {remoteRoom: remoteRoomName });
            }
            
            if(roomRemoteRoomCount[remoteRoomName].remoteDeliverer < remoteRoomREQ.remoteDeliverer){
                //console.log('need builder role: ' + RoleLib.RoleNames.REMOTE_DELIVERER);
                let status = RoleLib.spawn(remoteRoom.spawnName, RoleLib.RoleNames.REMOTE_DELIVERER, {sourceTarget: 0, remoteRoom: remoteRoomName });
            }
            
            if(roomRemoteRoomCount[remoteRoomName].remoteHarvester < remoteRoomREQ.remoteHarvester){
                //console.log('need builder role: ' + RoleLib.RoleNames.REMOTE_HARVESTER);
                let status = RoleLib.spawn(remoteRoom.spawnName, RoleLib.RoleNames.REMOTE_HARVESTER, {sourceTarget: 0, remoteRoom: remoteRoomName });
            }
            
        }
        

        //All rooms
        // Decide to build creeps   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Reverse order of priority
        let hold = false;
        
        if(countChecker.healDrainer < UnitRequirements.healDrainer){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.HEAL_DRAINER);
        }
        
        if(countChecker.stealer < UnitRequirements.stealer){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.STEALER);
        }
        
        let target = Game.spawns[room.spawnName].room.find(FIND_MINERALS)[0];
        if(countChecker.mineralMiner < UnitRequirements.mineralMiner){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.MINERAL_MINER, { sourceTarget: target  });
        }
        
        if(countChecker.mineralRunner < UnitRequirements.mineralRunner){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.MINERAL_RUNNER, { sourceTarget: target  });
        }
        
        if(countChecker.repairer < UnitRequirements.repairer){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.REPAIRER);
        }
        
        if(countChecker.graveRobber < UnitRequirements.graveRobber){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.GRAVE_ROBBER);
        }
        
        if(countChecker.defender < UnitRequirements.defender){
            let post = null;
            if(room.spawnName == 'MotherLand') post = 'PostA1';
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.DEFENDER, {post});
        }
        
        //console.log('main.js line 170: ' + (countChecker.builder < UnitRequirements.builder));
        
        //console.log(Game.rooms[room.location].find(FIND_CONSTRUCTION_SITES).length);
        
        if(countChecker.builder < UnitRequirements.builder && Game.rooms[room.location] && Game.rooms[room.location].find(FIND_CONSTRUCTION_SITES).length > 0 && countChecker.xbuilder < 1){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.BUILDER);
        }
        
        if(countChecker.drainer < UnitRequirements.drainer){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.HEAL_DRAINER);
        }
        
        if(countChecker.upgrader < UnitRequirements.upgrader){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.UPGRADER);
        }
        
        if(countChecker.transporter < UnitRequirements.transporter){
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.TRANSPORTER);
        }
        //console.log(Memory.rooms[room.spawnName].dropContainerIds.length > 0);
        if(countChecker.harvester < UnitRequirements.harvester){
            let attemptLevel = Memory.rooms[room.spawnName].dropContainerIds.length > 0 ? 4 : 3;
            let status = RoleLib.spawn(room.spawnName, RoleLib.RoleNames.HARVESTER, {level: attemptLevel});
        }
        
        // renew close harvesters
        let closeHarvesters = Game.spawns[room.spawnName].room.find(FIND_MY_CREEPS, {
            filter: _creep => _creep.memory.role == 'harvester' && DISTANCE(Game.spawns[room.spawnName].pos, _creep.pos) == 1 && _creep.ticksToLive < 600
        });
        closeHarvesters.forEach(_creep => Game.spawns[room.spawnName].renewCreep(_creep));
        
        
        //run towers  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        hostiles = Game.rooms[room.location].find(FIND_HOSTILE_CREEPS);
        let towers = Game.rooms[room.location].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                
        if(hostiles.length > 0) {
            //var username = hostiles[0].owner.username;
            //Game.notify(`User ${username} spotted in room ${roomName}`);
            if(towers){
                towers.forEach(tower => {
                    let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                        filter: hostile => {
                            //console.log(hostile.isDangerous());
                            return (hostile.pos.x > 1 && hostile.pos.x < 48 && hostile.pos.y > 2 && hostile.pos.y < 48)
                            && (hostile.isDangerous());
                        }
                    });
                    if(closestHostile) {
                        //console.log("x: " + closestHostile.pos.x + ', y: ' + closestHostile.pos.y );
                        tower.attack(closestHostile);
                    }
                });
            }
        }
        // else{
        //     towers.forEach(tower => {
        //         var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //             filter: (structure) => structure.hits / structure.hitsMax < .4
        //         });
        //         if(closestDamagedStructure) {
        //             //tower.repair(closestDamagedStructure);
        //         }
        //     });
        // }
    } // End of room loop


    // Run creeps  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for(const c in Game.creeps){
        let _creep = Game.creeps[c];
        
        let underAttack = _creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: hostile => hostile.getActiveBodyparts(ATTACK) > 0 || hostile.getActiveBodyparts(RANGED_ATTACK)
        }).length > 0;
        
        if(underAttack){
            _creep.runAway();
        }
        
        RoleLib.RoleRunner.run(_creep);
    }


    //Room Specific Code ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let originLink = Game.getObjectById('5b44e889a8f9805e72ba3727');
    let destLink = Game.getObjectById('5b450177931ad37d5f2aad22');
    
    if(originLink && originLink.energy == originLink.energyCapacity && destLink.energy == 0){
        originLink.transferEnergy(destLink);
    }

    originLink = Game.getObjectById('5b4f9e2f1fde535e697029bd');
    destLink = Game.getObjectById('5b4f75528087f443459eace5');
    
    let s;
    
    if(originLink && originLink.energy == originLink.energyCapacity && destLink.energy == 0){
        s = originLink.transferEnergy(destLink);
    }


    // let closeHarvesters = Game.spawns['MotherLand'].room.find(FIND_MY_CREEPS, {
    //     filter: _creep => _creep.memory.role == 'harvester' && DISTANCE(Game.spawns['MotherLand'].pos, _creep.pos) == 1 && _creep.ticksToLive < 600
    // });
    // closeHarvesters.forEach(_creep => Game.spawns['MotherLand'].renewCreep(_creep));
    
    //Watcher();
    
}




DISTANCE = function(p1, p2){
    let a = p1.x - p2.x;
    let b = p1.y - p2.y;
    
    let c = Math.sqrt( a*a + b*b );
    c = Math.floor(c);
    return c;
}

TEST = function(){
    for(let c in Game.creeps){
        let creep = Game.creeps[c];
        
        creep.memory.roleEmote = RoleLib.Roles[creep.memory.role].roleEmote;
    }
}

CreationCapacity = function(Spawn){
    let ea = Game.spawns[Spawn].room.energyCapacityAvailable;
    console.log(ea);
   return ea;
}

Watcher = function(){
    if(!Memory.watches.conSite2 && !Game.constructionSites['5b47ff206a85af4886d61322']){
        Memory.watches.conSite2 = true;
        
        let look = Game.spawns['Steal'].room.lookAt(25, 44);
        let target = null;
        look.forEach(lookObject => {
          if(lookObject.type == LOOK_STRUCTURES && lookObject.structure && lookObject.structure.structureType == STRUCTURE_CONTAINER){
              target = lookObject.structure;
              //console.log(target);
          }
        });
        
        if(target){
            Memory.rooms['Steal'].dropContainerIds.push(target.id);
            Memory.rooms['Steal'].REQ.harvester = 2;
            
        } 
    }
}


//Game.spawns['Steal'].room.find(FIND_STRUCTURES, {filter: s => s.structureType == STRUCTURE_EXTENSION}).forEach(e => Memory.rooms['Steal'].extensionIds.push(e.id))


