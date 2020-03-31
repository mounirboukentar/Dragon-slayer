'use strict';

function getRandomInteger(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function requestInteger(message, min, max) {
    var integer;


    do {
        integer = parseInt(window.prompt(message));
    }
    while (isNaN(integer) == true || integer < min || integer > max);

    return integer;
}

function showImage(source) {
    document.write('<img src="' + source + '">');
}