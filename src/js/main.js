'use strict';

// Stylesheets
require('../sass/main.scss');

import HeaderController from './controllers/HeaderController.js';
import ViewManager from './ViewManager.js';

let headerController;
let viewManager = new ViewManager();
let players = [
    {
        id: 0,
        name: 'Joueur 1',
        choice: null,
        choiceLabel: null,
        score: 0
    },
    {
        id: 1,
        name: 'Joueur 2',
        choice: null,
        choiceLabel: null,
        score: 0
    }
];
let nextPlayer = 0;

let choices = [
    {
        label: 'Pierre',
        value: 'rock',
        looseAgainst: ['spock', 'paper']
    },
    {
        label: 'Feuille',
        value: 'paper',
        looseAgainst: ['lizard', 'scissors']
    },
    {
        label: 'Ciseaux',
        value: 'scissors',
        looseAgainst: ['rock', 'spock']
    },
    {
        label: 'Lézard',
        value: 'lizard',
        looseAgainst: ['scissors', 'rock']
    },
    {
        label: 'Spock',
        value: 'spock',
        looseAgainst: ['paper', 'lizard']
    }
];

/**
 * Result the result of the match
 *
 * @returns {Object}
 */
function getResults() {
    let winner;
    let c1 = players[0].choice;
    let c2 = players[1].choice;

    console.group('Résultats');
    console.log(`${players[0].name} choose ${c1}`);
    console.log(`${players[1].name} choose ${c2}`);

    if (c1 === c2) {
        console.log('=> égalité');
    } else {
        let looseList = (choices.find(o => o.value === c1)).looseAgainst;
        console.warn(looseList);
        let isLoosing = looseList.find(c => c === c2);
        console.warn(isLoosing);
        if (isLoosing) {
            console.log(`${players[1].name} win!`);
            winner = players[1];
            players[1].score++;
        } else {
            console.log(`${players[0].name} win!`);
            winner = players[0];
            players[0].score++;
        }
    }

    console.groupEnd();

    return winner;
}

document.addEventListener('DOMContentLoaded', function() {
    // console.info('DOM loaded');

    headerController = new HeaderController(document.querySelector('.main-header'), players);
    headerController.render();

    viewManager.loadView('Start');
});

document.addEventListener('StartGame', function(e) {
    // console.log('start The Game');

    viewManager.unloadView();

    viewManager.loadView('PlayerChoice', {
        player: players[nextPlayer],
        choices: choices
    });
});

document.addEventListener('StoreChoice', function(e) {
    let playerID = e.detail.player.id;
    let playerName = e.detail.player.name;
    let playerChoice = e.detail.player.choice;

    // console.log(`${playerName} choose ${playerChoice}`);

    players[playerID].choice = playerChoice;

    if (nextPlayer === 0) {
        nextPlayer++;

        viewManager.unloadView();

        viewManager.loadView('PlayerChoice', {
            player: players[nextPlayer],
            choices: choices
        });
    } else {
        let winner = getResults();
        nextPlayer = 0;

        viewManager.unloadView();

        viewManager.loadView('Results', {
            players: players,
            winner: winner
        });

        headerController.updateScore(players);
    }
});