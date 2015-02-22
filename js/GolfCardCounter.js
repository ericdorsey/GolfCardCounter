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

var allowedValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "ja", "q", "k", "a", "jo"];

function validateCard(cards, errorOutput) {
    "use strict";
    errorOutput.empty();
    var emptyWarnings = 0;
    var allowedWarnings = 0;
    var jWarnings = 0;
    for (var i = 0; i < cards.length; i++) {
        console.log("validating: " + cards[i] + ", typeof: " + typeof cards[i]);
        //Blank value or not enough cards entered
        if ((cards.length <= 3) || (cards[i] === "")) {
            if (emptyWarnings === 0) {
                errorOutput.append(document.createTextNode("Blank values not allowed. Enter a card in all four fields."));
                errorOutput.append(document.createElement("br"));
            }
            console.log("adding 1 to emptyWarnings");
            emptyWarnings += 1;
        }
        if (allowedValues.indexOf(cards[i]) === -1) {
            //Card not allowed
            if (allowedWarnings === 0) {
                errorOutput.append(document.createTextNode("Please enter only allowed card values: 2-10, Ja, Q, K, A, Jo"));
                errorOutput.append(document.createElement("br"));
            }
            console.log("adding 1 to allowedWarnings");
            allowedWarnings += 1;
        }
        if ((cards[i] === "j") || (cards[i] === "J")) {
            if (jWarnings === 0) {
                errorOutput.append(document.createTextNode("\"J\" is not a valid entry, did you mean \"Ja\" (Jack) or \"Jo\" (Joker)?"));
                errorOutput.append(document.createElement("br"));
            }
            console.log("adding 1 to jWarnings");
            jWarnings += 1;
        }
    }
    console.log("Empty warnings: " + emptyWarnings);
    console.log("Allowed warnings: " + allowedWarnings);
    console.log("j warnings: " + jWarnings);

    if ((emptyWarnings > 0) || (allowedWarnings > 0) || (jWarnings > 0)) {
        return false;
    } else {
        return true;
    }
}

function countEm(cards, scoreOutput) {
    "use strict";
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
            scoreOutput.append(document.createTextNode("Plain number card worth " + parseInt(found[j]) + " points."));
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
    var scoreOutput = $("#scoreOutput");
    var errorOutput = $("#errorOutput");

    $("#target").click(function(event) {
        event.preventDefault(); //Prevent card fields from being cleared on Get Score click

        scoreOutput.empty();

        var cards = [];
        var card1 = $("#card1").val().trim().toLowerCase();
        var card2 = $("#card2").val().trim().toLowerCase();
        var card3 = $("#card3").val().trim().toLowerCase();
        var card4 = $("#card4").val().trim().toLowerCase();
        cards.push(card1, card2, card3, card4);
        console.log(cards.length);
        console.log(cards);

        var valid = validateCard(cards, errorOutput);
        if (valid === true) {
            countEm(cards, scoreOutput);
        }
    });
});