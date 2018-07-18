
var utils = {
    
}

XWORK = function(num){
    let output = [WORK];
    for(let i = 0; i< num - 1; i++){
        output.push(WORK);
    }
    return output;
}

XCARRY = function(num){
    let output = [CARRY];
    for(let i = 0; i< num - 1; i++){
        output.push(CARRY);
    }
    return output;
}

XMOVE = function(num){
    let output = [MOVE];
    for(let i = 0; i< num - 1; i++){
        output.push(MOVE);
    }
    return output;
}

XPARTS = function(){
    let output = [];
    for(let i = 0; i < arguments.length; i++){
        output = output.concat(arguments[i]);
    } 
    return output;
}

//let config = XPARTS( WORK, XWORK(3), XCARRY(3), XMOVE(6) )

module.exports = {
    utils
};

