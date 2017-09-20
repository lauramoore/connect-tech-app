'use strict';
const makeCard = require('./lib/makeCard.js'),
    playerApi = require('./lib/playerApi.js'),
    _ = require('lodash');

/**
  * Watercooler contains all of the custom and built in intents we are using for the skill.
**/


let virtualGamerApp = function (app) {
    app.makeCard = makeCard;
    app.players = playerApi;
    app._ = _;

    /**
     * app.pre is run before every request.
     */
    // app.pre = function (request) {
    //
    // };


    /**
     *  Custom Intents:
     *      launch
     *      readyPlayer
     **/
     app.launch(function (request, response) {
         response.say('Hello Virtual Gamer! Who am I filling in for today?');
         response.shouldEndSession(false, 'What did you say?').send();
     });


     app.intent('readyPlayer', {
         slots: {NAME: 'NAME'}
     }, (request, response) => {
       let player = {
         name: request.slot('NAME')
       }
       app.makeCard(player.name, response, 'active');
       return response.say(`${player.name}. is ready.`)
                           .shouldEndSession(false, 'Who was that again?')
                           .send();
     });


    /**
     *  Amazon built-in intents:
     *      AMAZON.NextIntent,
     *      AMAZON.PauseIntent,
     *      AMAZON.ResumeIntent,
     *      AMAZON.StopIntent,
     *      AMAZON.CancelIntent
     *      AMAZON.HelpIntent
     **/
     app.intent('AMAZON.CancelIntent', (request, response) => {
         return response.say('Great Game! See you next week.')
                             .shouldEndSession(true)
                             .send();
     });

};

module.exports = virtualGamerApp;
