'use strict';

var game;


const ARMOR_COPPER = 1;
const ARMOR_IRON = 2;
const ARMOR_MAGICAL = 3;

const LEVEL_EASY = 1;
const LEVEL_NORMAL = 2;
const LEVEL_HARD = 3;

const SWORD_WOOD = 1;
const SWORD_STEEL = 2;
const SWORD_EXCALIBUR = 3;





function computeDragonDamagePoint() {
    var damagePoint;

    if (game.difficulty == LEVEL_EASY) {

        damagePoint = getRandomInteger(10, 20);
    } else {
        damagePoint = getRandomInteger(30, 40);
    }


    return Math.round(damagePoint / game.armorRatio);
}

function computePlayerDamagePoint() {
    var damagePoint;


    switch (game.difficulty) {
        case LEVEL_EASY:
            damagePoint = getRandomInteger(25, 30);
            break;

        case LEVEL_NORMAL:
            damagePoint = getRandomInteger(15, 20);
            break;

        case LEVEL_HARD:
            damagePoint = getRandomInteger(5, 10);
            break;
    }

    return Math.round(damagePoint * game.swordRatio);
}

function gameLoop() {
    var damagePoint;
    var dragonSpeed;
    var playerSpeed;


    while (game.hpDragon > 0 && game.hpPlayer > 0) {
        console.log('Tour numéro ' + game.round);


        dragonSpeed = getRandomInteger(10, 20);
        playerSpeed = getRandomInteger(10, 20);


        if (dragonSpeed > playerSpeed) {

            damagePoint = computeDragonDamagePoint();


            game.hpPlayer -= damagePoint;


            console.log(
                'Le dragon est plus rapide et vous brûle, il vous enlève ' +
                damagePoint + ' PV'
            );
        } else {

            damagePoint = computePlayerDamagePoint();


            game.hpDragon -= damagePoint;


            console.log(
                'Vous êtes plus rapide et frappez le dragon, vous lui enlevez ' +
                damagePoint + ' PV'
            );
        }

        showGameState();


        game.round++;
    }
}

function initializeGame() {
    game = new Object();
    game.round = 1;

    game.difficulty = requestInteger(
        'Niveau de difficulté ?\n' +
        '1. Facile - 2. Normal - 3. Difficile',
        1, 3
    );

    /*
     * Détermination des points de vie de départ du joueur et du dragon selon 
     * le niveau de difficulté.
     */
    switch (game.difficulty) {
        case LEVEL_EASY:
            game.hpDragon = getRandomInteger(150, 200);
            game.hpPlayer = getRandomInteger(200, 250);
            break;

        case LEVEL_NORMAL:
            game.hpDragon = getRandomInteger(200, 250);
            game.hpPlayer = getRandomInteger(200, 250);
            break;

        case LEVEL_HARD:
            game.hpDragon = getRandomInteger(200, 250);
            game.hpPlayer = getRandomInteger(150, 200);
            break;
    }


    game.armor = requestInteger(
        'Armure ?\n' +
        '1. Cuivre - 2. Fer - 3. Magique',
        1, 3
    );

    game.sword = requestInteger(
        'Epée ?\n' +
        '1. Bois - 2. Acier - 3. Excalibur',
        1, 3
    );


    switch (game.armor) {

        case ARMOR_COPPER:
            game.armorRatio = 1;
            break;


        case ARMOR_IRON:
            game.armorRatio = 1.25;
            break;


        case ARMOR_MAGICAL:
            game.armorRatio = 2;
            break;
    }

    switch (game.sword) {

        case SWORD_WOOD:
            game.swordRatio = 0.5;
            break;


        case SWORD_STEEL:
            game.swordRatio = 1;
            break;


        case SWORD_EXCALIBUR:
            game.swordRatio = 2;
            break;
    }
}

function showGameState() {
    console.log(
        'Dragon : ' + game.hpDragon + ' PV, ' +
        'joueur : ' + game.hpPlayer + ' PV'
    );
}

function showGameWinner() {
    if (game.hpDragon <= 0) {
        showImage('images/knight.jpg');

        console.log("Vous avez gagné, vous êtes vraiment fort !");
        console.log("Il vous restait " + game.hpPlayer + " PV");
    } else {
        showImage('images/dragon.jpg');

        console.log("Le dragon a gagné, vous avez été carbonisé !");
        console.log("Il restait " + game.hpDragon + " PV au dragon");
    }
}

function startGame() {

    console.clear();
    initializeGame();


    console.log('Points de vie de départ :');
    showGameState();
    gameLoop();


    showGameWinner();
}

startGame();