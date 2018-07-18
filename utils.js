/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils');
 * mod.thing == 'a thing'; // true
 */

var utils = {
    XWORK : function(num){
        let output = [WORK];
        for(let i = 0; i< num - 1; i++){
            output.push(WORK);
        }
        return output;
    },

    XCARRY : function(num){
        let output = [CARRY];
        for(let i = 0; i< num - 1; i++){
            output.push(CARRY);
        }
        return output;
    },
    
    XMOVE : function(num){
        let output = [MOVE];
        for(let i = 0; i< num - 1; i++){
            output.push(MOVE);
        }
        return output;
    },

    XPARTS : function(){
        let output = [];
        for(let i = 0; i < arguments.length; i++){
            output.concat(arguments[i]);
        } 
        return output;
    }
}


module.exports = {
    utils
};

