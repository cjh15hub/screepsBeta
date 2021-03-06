
INIT_ROOM = function(location, name, remoteOf){
    let room_memory = {
        location : location,
        //spawnName : name,
        spawnId : '',
        sourceIds : [],
        extensionIds : [],
        dropContainerIds : [],
        stationContainerIds : [],
        towerIds : [],
        storageId: null,
        REQ : {
            harvester : 0,
            builder : 0,
            upgrader : 0,
            graveRobber : 0,
            repairer : 0,
            transporter : 0
        }
    };
    
    
    if(remoteOf){
        
        if(!Memory.rooms[remoteOf]){
            throw 'No room of that name: ' + remoteOf;
        }
        
        room_memory.spawnName = remoteOf;
        if(Game.spawns[remoteOf]){
            room_memory.spawnId = Game.spawns[remoteOf].id;
        }
        else{
            throw 'Spawn not found: ' + remoteOf;
        }
        
        let _name = `${name}${remoteOf}`;
        
        if(!Memory.rooms[remoteOf].remoteRoomNames) Memory.rooms[remoteOf].remoteRoomNames = [];
        
        Memory.rooms[remoteOf].remoteRoomNames.push(_name);
        
        Memory.remoteRooms[_name] = room_memory;
    }
    else{
        room_memory.spawnName = name;
        if(Game.spawns[name]){
            room_memory.spawnId = Game.spawns[name].id;
        }
        else{
            throw 'Spawn not found: ' + name;
        }
        
        Memory.rooms[name] = room_memory;
    }
    
    return room_memory;
}

SHOW_REQUIREMENTS = function(name){
    if(Memory.rooms[name]){
        let REQ = Memory.rooms[name].REQ;
        for(let k in REQ){
            console.log(k + ' : ' + REQ[k]);
        }
        return REQ;
    }
    else{
        console.log('No room with name: ' + name);
        return 'No room with name: ' + name;
    }
}


if(!Room.prototype._createConstructionSite){
    Room.prototype._createConstructionSite = Room.prototype.createConstructionSite;
    
    Room.prototype.createConstructionSite = function(x, y, structureType, name){
    
        console.log('A new construction site?');
        
        if(typeof x === 'object'){
            // Provided the pos object instead or cords
            if(structureType){
                return this._createConstructionSite(x, y, structureType);
            }
            else{
                return this._createConstructionSite(x, y);
            }
        }
        else{
            if(name){
                return this._createConstructionSite(x, y, structureType, name);
            }
            else{
                return this._createConstructionSite(x, y, structureType);
            }
        }
        
    }
}


//Rooms 11/15/18
// {"MotherLand":{"location":"E49N55","spawnName":"MotherLand","spawnId":"5b3a3d9b9f7b267dcac50c32","sourceIds":["59f1a64982100e1594f3fd67","59f1a64982100e1594f3fd68"],"extensionIds":["5b3a4c938162e4338bcfa9cc","5b3a4d702ead863b0918ca56","5b3a4dab9d1c483f1136207f","5b3a5e14403e7d592a9a31c8","5b3a63401ca96b59438a5662","5b3af42fc074613aec927240","5b3afa1609bd9470dbb7840a","5b3afa780baf6d03ce464be3","5b3afe9aba1d1d77f0341483","5b3b010ff8c7fa739a68c3ee","5b3c035f94a13a78202e3d2e","5b3c069009bd9470dbb7ed67","5b3c0c34bd00f26bbb6f9ae0","5b3c0e68d88b0003cf21f536","5b3c19a6008bbf77da3a0134","5b3c19f01f446c7359b7ba32","5b3c1cbf1a499b43adbd3159","5b3c1e08fdf9e15929af7b08","5b3e439c1f446c7359b8a8bf","5b3e482e3b287b3ad7e46975","5b43a29de15e100251f5fb1a","5b43a864d06c650285a2b166"],"dropContainerIds":["5b3a573fe276cc3af5767b95","5b3a5d4fdcffcd710866bc68"],"stationContainerIds":["5b3b93b32814d977f694e23a","5b3a78e724e3b90395b264b5"],"towerIds":["5b3aeea2ee2ad0738d093500","5b3ea83a94a13a78202f7562"],"storageId":"5b3c5e12008bbf77da3a2158","REQ":{"harvester":2,"builder":1,"upgrader":4,"graveRobber":1,"repairer":1,"transporter":4,"defender":2,"healDrainer":0},"remoteRoomNames":["R0MotherLand"]},"Steal":{"location":"E48N51","spawnName":"Steal","spawnId":"5b46c5e37c36064a23c29bd6","sourceIds":["59f1a63982100e1594f3fbea","59f1a63982100e1594f3fbeb"],"extensionIds":["5b479fc12758d02d34d7c83a","5b47b26f05ef47344117eb18","5b47c634e30571430d34fd46","5b47d7b892ae8c4a0b3041f6","5b47eaaae18cc24347f4bfb9"],"dropContainerIds":["5b4801299ddd22346038da37","5b482c9942e86c5e91524047"],"stationContainerIds":[],"towerIds":[],"storageId":"5b38bfa7a8f8e36bc70bec32","REQ":{"harvester":2,"builder":2,"upgrader":4,"graveRobber":0,"repairer":1,"transporter":1}}}

//Remote Rooms 11/15/18
// {"R0MotherLand":{"location":"E48N55","spawnId":"5b3a3d9b9f7b267dcac50c32","sourceIds":["59f1a63882100e1594f3fbdd"],"extensionIds":[],"dropContainerIds":["5b4995efab88262d6a5ff051"],"stationContainerIds":[],"towerIds":[],"storageId":"","REQ":{"remoteHarvester":1,"remoteBuilder":0,"upgrader":0,"graveRobber":0,"remoteRepairer":1,"remoteDeliverer":2},"spawnName":"MotherLand"}}

