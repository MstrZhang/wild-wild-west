// keep track of what the computer and the player intend to do
let computerAction = '';
let playerAction = '';

// returns a random number between 0 and max (inclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// process the game given both players' actions
function process() {
    let playerBullets = parseInt(document.getElementById('player-bullets').innerHTML);
    let computerBullets = parseInt(document.getElementById('comp-bullets').innerHTML);

    let playerMessage = '';
    let computerMessage = '';
    let endMessage = '';

    // handle the player's message
    if (playerAction === 'SHOOT') {
        if (playerBullets === 0) {
            playerMessage = 'The PLAYER tried to shoot an empty gun!';
        } else {
            playerMessage = 'The PLAYER shot his gun!'
        }
    } else if (playerAction === 'BLOCK') {
        playerMessage = 'The PLAYER put up a shield!'
    } else {
        playerMessage = 'The PLAYER reloads his gun!'
    }

    // handle the computer's message
    if (computerAction === 'SHOOT') {
        if (computerBullets === 0) {
            computerMessage = 'The COMPUTER tried to shoot an empty gun!';
        } else {
            computerMessage = 'The COMPUTER shot his gun!'
        }
    } else if (computerAction === 'BLOCK') {
        computerMessage = 'The COMPUTER put up a shield!'
    } else {
        computerMessage = 'The COMPUTER reloads his gun!'
    }

    // progress the game
    if (playerAction === 'SHOOT' || computerAction === 'SHOOT') {
        if (playerAction === computerAction && playerBullets > 0 && computerBullets > 0) {
            endMessage = "Both parties are hit! It's a TIE!";
        } else if (playerAction !== 'SHOOT' && computerBullets > 0) {
            if (playerAction === 'BLOCK') {
                endMessage = 'The PLAYER blocks the hit!'
            } else {
                endMessage = 'The PLAYER is hit! The COMPUTER wins!';
            }
        } else if (computerAction !== 'SHOOT' && playerBullets > 0) {
            if (computerAction === 'BLOCK') {
                endMessage = 'The COMPUTER blocks the hit!'
            } else {
                endMessage = 'The COMPUTER is hit! The PLAYER wins!';
            }
        } else {
            endMessage = 'The game continues...';
        }
    } else {
        endMessage = 'The game continues...';
    }

    // update the game log
    let gameContent = document.getElementById('game-content');

    let playerItem = document.createElement('li');
    playerItem.appendChild(document.createTextNode(playerMessage));
    let computerItem = document.createElement('li');
    computerItem.appendChild(document.createTextNode(computerMessage));
    let endItem = document.createElement('li');
    endItem.appendChild(document.createTextNode(endMessage));

    gameContent.appendChild(playerItem);
    gameContent.appendChild(computerItem);
    gameContent.appendChild(endItem);

}

// computer logic
// this runs every time the player performs an action
function runComputer() {
    let computerBullets = document.getElementById('comp-bullets').innerHTML;

    let option = getRandomInt(3);
    // choose a random action for the computer to do
    switch (option) {
        case 0:
            computerAction = 'SHOOT';
            // update bullets accordingly
            if (computerBullets > 0)
                document.getElementById('comp-bullets').innerHTML = parseInt(computerBullets) - 1;
            break;
        case 1:
            computerAction = 'BLOCK';
            break;
        case 2:
            computerAction = 'RELOAD';
            // update bullets accordingly
            document.getElementById('comp-bullets').innerHTML = parseInt(computerBullets) + 1;
            break;
        default:
            break;
    }
    process();
}

// player logic
// this runs every time the player performs an action
function runPlayer(action) {
    let playerBullets = document.getElementById('player-bullets').innerHTML;

    // keep track of the player's action
    playerAction = action;

    // update bullets accordingly
    if (action === 'SHOOT' && playerBullets > 0) {
        document.getElementById('player-bullets').innerHTML = parseInt(playerBullets) - 1;
    }
    if (action === 'RELOAD') {
        document.getElementById('player-bullets').innerHTML = parseInt(playerBullets) + 1;
    }

    // run the computer
    runComputer();
}