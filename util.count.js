
CountCheck = function(roles){
    let countCheck = {};
    for(let i = 0; i< roles.length; i++){
        countCheck[roles[i]] = 0;
    }
    return countCheck;
}
