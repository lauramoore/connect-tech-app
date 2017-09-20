'use strict';

let api;

function getPlayer(playerName) {

    return {
       name: playerName
    };


}

api = {
    getPlayer: getPlayer
};

module.exports = api;
