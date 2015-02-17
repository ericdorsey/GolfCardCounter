/*
TODO Form validation using allowedValues
 */

var cardValues = {
    "jo" : -5,
    "a" : 1,
    "ja" : 10,
    "q" : 10,
    "k" : 0
};

var cardNames = {
    "jo" : "Joker",
    "a" : "Ace",
    "ja" : "Jack",
    "q" : "Queen",
    "k" : "King"
};

var allowedValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, "ja", "q", "k", "a", "jo"];

function countEm(cards, cardValues) {
    "use strict";
    var scoreOutput = $("#scoreOutput");
    scoreOutput.empty();
    var found = [];
    var pairs = {};
    for (var i = 0; i < cards.length; i++) {
        var currCard = cards[i];
        if (found.length === 0) {
            console.log("found is Empty" + found);
        } else {
            console.log("found is " + found);
        }
        if (found.indexOf(currCard) === -1) {
            found.push(currCard);
            console.log("unique value " + currCard + " found");
        } else if (found.indexOf(cards[i]) !== -1) {
            //Found a duplicate
            var indexOfFoundCard = found.indexOf(currCard);
            //First key in pairs
            if (!(pairs.hasOwnProperty(currCard))) {
                pairs[currCard] = 1;
                found.splice(indexOfFoundCard, 1);
                console.log("new entry " + currCard + " added to pairs");
            //Next key in pairs
            } else if (pairs.hasOwnProperty(currCard)) {
                pairs[currCard] += 1;
                found.splice(indexOfFoundCard, 1);
                console.log("duplicate value " + found[i] + " removed");
            }
        }
    }
    console.log("***** End *****");
    console.log("found is " + found);
    console.log("pairs is " + JSON.stringify(pairs));

    var score = 0;
    for (var j = 0; j < found.length; j++) {
        console.log("current found array card is: " + found[j]);
        if (cardValues.hasOwnProperty(found[j])) {
            console.log("Found face card: " + found[j]);
            score += parseInt(cardValues[found[j]]);
            scoreOutput.append(document.createTextNode("Face card " + cardNames[found[j]] + " worth " + parseInt(cardValues[found[j]]) + " points."));
            scoreOutput.append(document.createElement("br"));
        } else {
            console.log("Found number card: " + found[j]);
            score += parseInt(found[j]);
            scoreOutput.append(document.createTextNode("Plain number card " + found[j] + " worth " + parseInt(found[j]) + " points."));
            scoreOutput.append(document.createElement("br"));
        }
        console.log("score is " + score);
    }
    $.each(pairs, function(key, value) {
        console.log("current pairs object card is: " + key);
        if (key === 'jo') {
            console.log("found " + pairs[key] + " pair(s) of jokers");
            score += ((cardValues[key] * pairs[key]) * 2);
            scoreOutput.append(document.createTextNode("Pair of Jokers worth " + ((cardValues[key] * pairs[key]) * 2) + " points."));
            scoreOutput.append(document.createElement("br"));
//        } else if (key === 'a') {
//            console.log("found " + pairs[key] + " pair(s) of aces");
//            score += ((cardValues[key] * pairs[key]) * 2);
        } else {
            score += 0;
            if (cardNames.hasOwnProperty(key)) {
                console.log("pair of " + cardNames[key] + "'s counts as zero");
                scoreOutput.append(document.createTextNode("Pair of " + cardNames[key] + "'s cancels out to zero points."));
            } else if (!(cardNames.hasOwnProperty(key))) {
                console.log("pair of " + key + "'s counts as zero");
                scoreOutput.append(document.createTextNode("Pair of " + key + "'s cancels out to zero points."));
            }
            scoreOutput.append(document.createElement("br"));
        }
        console.log("score is " + score);
    });
    console.log("Final score is " + score);
    scoreOutput.append(document.createElement("br"));
    scoreOutput.append(document.createTextNode("Total Score: " + score));
}

$(document).ready(function() {
    "use strict";
    $("#target").click(function(event) {
        event.preventDefault(); //prevent card fields from being cleard
        var cards = [];
        var card1 = $("#card1").val().trim().toLowerCase();
        var card2 = $("#card2").val().trim().toLowerCase();
        var card3 = $("#card3").val().trim().toLowerCase();
        var card4 = $("#card4").val().trim().toLowerCase();
//        console.log(card1, card2, card3, card4);
        cards.push(card1, card2, card3, card4);
        console.log(cards);
        countEm(cards, cardValues);
    });
});