let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = Array();
let symbols = ["&#9824;", "&#9830;", "&#9827;", "&#9829;"];
let state = 0;
let cardsFlipped;
let pileSpot;
let cardSource;
let sourcePile;
let cardAmount;
let sourceChildren;
let cardLocation;
let cardStack;
let cardCompare;
let cardDestination;
let winWord = ["Y", "O", "U", "", "W", "I", "N"]
let youWin = false;
let colorChange;
let media = window.matchMedia("(max-width: 800px)")



function getDeck() {
    for(let i=0; i<suits.length; i++) {
        for(let j=0; j<values.length; j++) {
            let card = {
                Value: values[j],
                Symbol: symbols[i],
                Suit: suits[i]
            };
            deck.push(card);
        }
    }
    return deck
}



function shuffle() {
    for (let i=0; i<1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let temp1 = deck[location1];
        deck[location1] = deck[location2]
        deck[location2] = temp1
    }
    return deck
}



function createCard(card, value, symbol, suit, position, background) {
    card.id = deck[position].Value + " of " + deck[position].Suit;
    background.className = "background";
    card.className = "card";
    value.className = "value";
    symbol.className = "symbol";
    background.innerHTML = deck[position].Symbol;
    suit.className = deck[position].Suit;
    value.innerHTML = deck[position].Value;
    symbol.innerHTML = deck[position].Symbol;
    card.appendChild(suit);
    suit.appendChild(value);
    suit.appendChild(symbol);
    suit.appendChild(background);
}



function editCard(card, j, cards) {
    console.log(media.matches)
    if (j !== cards-1) {
        faceDown(card)
        if (media.matches) {
            card.style.marginTop = "-80px";
        } else {
            card.style.marginTop = "-130px";
        }
    } else {
        faceUp(card)
        if (media.matches) {
            card.style.marginTop = "-80px";
        } else {
            card.style.marginTop = "-130px";
        }
    }
    if (j === 0) {
        card.style.marginTop = "0";
    }
}



function editDeckCard(value, symbol, card) {
    faceDown(card)
    card.style.marginTop = "0";
    card.style.position = "absolute";
}



function renderDeck() {
    let cards = 1
    let position = 0
    for(let i = 0; i < 7; i++, cards++) {
        for (let j = 0; j < cards; j++) {
            let card = document.createElement("div");
            let value = document.createElement("div");
            let symbol = document.createElement("div");
            let suit = document.createElement("div");
            let background = document.createElement("h1");
            createCard(card, value, symbol, suit, position, background);
            document.getElementById("cards" + cards.toString()).appendChild(card);
            editCard(card, j, cards);
            position++
        }
    }
    for (let i = 0; i < 24; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let symbol = document.createElement("div");
        let suit = document.createElement("div");
        let background = document.createElement("h1");
        createCard(card, value, symbol, suit, position, background);
        document.getElementById("bankCards").appendChild(card);
        editDeckCard(value, symbol, card, background);
        position++
    }
}



function flipThree() {
    if (cardSource) {
        removeBoxShadow(cardSource);
    }
    resetAll();
    let card = document.getElementById("bankCards").childNodes;
    let cardAmount = document.getElementById("bankCards").childElementCount;
    let flippedAmount = document.getElementById("showCards").childElementCount;
    let firstCard = card[cardAmount-1];
    let secondCard = card[cardAmount-2];
    let thirdCard = card[cardAmount-3];
    let showCardsSpot = document.getElementById("showCards");
    let bankCardsSpot = document.getElementById("bankCards");
    let showCards = document.getElementById("showCards").childNodes;
    for (let j=1; j<flippedAmount; j++) {
        removeBoxShadow(showCards[j]);
    }
    if (flippedAmount > 2) {
        showCards[flippedAmount-2].style.marginLeft = "0";
        showCards[flippedAmount-3].style.marginLeft = "0";
    } else if (flippedAmount === 2) {
        showCards[flippedAmount-2].style.marginLeft = "0";
    }
    if (cardAmount > 2) {
        showCardsSpot.appendChild(firstCard);
        faceUp(firstCard);
        if (media.matches) {
            firstCard.style.marginLeft = "-56px";
        } else {
            firstCard.style.marginLeft = "-70px";
        }
        firstCard.removeAttribute("onclick");
        showCardsSpot.appendChild(secondCard);
        faceUp(secondCard);
        if (media.matches) {
            secondCard.style.marginLeft = "-28px";
        } else {
            secondCard.style.marginLeft = "-35px";
        }
        secondCard.removeAttribute("onclick");
        showCardsSpot.appendChild(thirdCard);
        faceUp(thirdCard);
        cardsFlipped = 3;
    } else if (cardAmount === 2) {
        showCardsSpot.appendChild(firstCard);
        faceUp(firstCard);
        if (media.matches) {
            firstCard.style.marginLeft = "-28px";
        } else {
            firstCard.style.marginLeft = "-35px";
        }
        firstCard.removeAttribute("onclick");
        showCardsSpot.appendChild(secondCard);
        faceUp(secondCard);
        cardsFlipped = 2;
    } else if (cardAmount === 1) {
        showCardsSpot.appendChild(firstCard);
        faceUp(firstCard);
        cardsFlipped = 1;
    } else {
        for (let i=0; i<flippedAmount; i++) {
            let movingCard = document.getElementById("showCards").lastChild;
            bankCardsSpot.appendChild(movingCard);
            faceDown(movingCard);
            movingCard.style.marginLeft = "0";
        }
    }
}



function faceUp(card) {
    let suit = card.childNodes[0];
    let value = suit.childNodes[0];
    let symbol = suit.childNodes[1];
    let background = suit.childNodes[2];
    card.style.background = "none";
    card.style.backgroundColor = "white";
    value.hidden = false;
    symbol.hidden = false;
    background.hidden = false;
    card.setAttribute("onclick", "cardClicked(this.id)");
}



function faceDown(card) {
    let suit = card.childNodes[0];
    let value = suit.childNodes[0];
    let symbol = suit.childNodes[1];
    let background = suit.childNodes[2];
    card.style.background = "";
    card.style.backgroundColor = "";
    value.hidden = true;
    symbol.hidden = true;
    background.hidden = true;
    card.removeAttribute("onclick");
}



function resetCardPosition(card) {
    card.style.marginRight = "0";
    card.style.marginLeft = "0";
    card.style.position = "relative";
}



function cardMovement(card, destination) {
    if (card === sourcePile.lastChild) {
        destination.appendChild(card);
        removeBoxShadow(card);
    } else {
        destination.appendChild(card);
        removeBoxShadow(card);
        for (let i=cardLocation; i<cardAmount-1; i++) {
            let temp = sourceChildren[cardLocation];
            destination.appendChild(sourceChildren[cardLocation]);
            removeBoxShadow(temp);
        }
    }
    pileSpot = destination.parentNode;
    removeOnclick(pileSpot);
    correctPile();
    resetCardPosition(card);
    flipTopCard(sourcePile);
    findEmptySpot();
    deleteEmptySpot();
}



function moveCard(card, destination) {
    cardMovement(card, destination);
    card.style.position = "relative";
    if (media.matches) {
        card.style.marginTop = "-70px";
    } else {
        card.style.marginTop = "-120px";
    }
}



function moveCardHome(card, destination) {
    cardMovement(card, destination);
    card.style.position = "absolute";
    card.style.marginTop = "0"
}



function moveCardPile(card, destination) {
    cardMovement(card, destination);
    card.style.position = "relative";
    card.style.marginTop = "0";
}



function moveCardHomePile(card, destination) {
    cardMovement(card, destination);
    card.style.position = "absolute";
    card.style.marginTop = "0";
}



function checkValidity(source, compare) {
    let sourceValue = getValue(source);
    let sourceSuit = getSuit(source);
    let compareValue = getValue(compare);
    let compareSuit = getSuit(compare);
    return valueCompatible(sourceValue, compareValue) && suitCompatible(sourceSuit, compareSuit);
}



function checkValidityHome(source, compare) {
    let sourceValue = getValue(source);
    let sourceSuit = getSuit(source);
    let compareSuit = getSuit(compare);
    return sourceValue === 1 && sourceSuit === compareSuit;
}



function checkValidityPile(source) {
    let sourceValue = getValue(source);
    return sourceValue === 13;
}



function checkValidityHomePile(source, compare) {
    let sourceValue = getValue(source);
    let sourceSuit = getSuit(source);
    let compareValue = getValue(compare);
    let compareSuit = getSuit(compare);
    return sourceValue === compareValue+1 && sourceSuit === compareSuit
}



function boxShadow(card) {
    card.style.boxShadow = "0 0 4px 6px lightblue";
}



function removeBoxShadow(card) {
    card.style.boxShadow = "";
}



function setSource(card) {
    if (document.getElementById(card).className === "card") {
        cardSource = document.getElementById(card);
        sourcePile = cardSource.parentNode;
        cardAmount = sourcePile.childElementCount;
        sourceChildren = sourcePile.childNodes;
        let cardPos = 0;
        while (sourceChildren[cardPos] !== cardSource) {
            cardPos++
        }
        cardLocation = cardPos;
        cardStack = cardAmount - cardPos;
        while (cardPos < cardAmount) {
            boxShadow(sourceChildren[cardPos])
            cardPos++
        }
        boxShadow(cardSource);
        state = 1;
    } else {
        state = 0;
    }
}



function removeShadowPile() {
    for (let i=cardLocation; i<cardAmount; i++) {
        let temp = sourceChildren[i];
        removeBoxShadow(temp)
    }
}



function cardClicked(card) {
    if (state === 0) {
        setSource(card)
    } else if (state === 1) {
        cardCompare = document.getElementById(card);
        if (cardCompare.className === "card") {
            cardDestination = document.getElementById(card).parentNode;
            if (cardDestination.className === "cardHome") {
                if (checkValidityHomePile(cardSource, cardCompare)) {
                    moveCardHomePile(cardSource, cardDestination);
                    resetAll();
                    checkForWin();
                } else {
                    removeBoxShadow(cardSource);
                    removeShadowPile();
                    resetAll();
                }
            } else if (cardDestination.className === "flipCards") {
                removeBoxShadow(cardSource);
                resetAll();
            } else {
                if (checkValidity(cardSource, cardCompare)) {
                    moveCard(cardSource, cardDestination);
                    resetAll()
                } else {
                    removeBoxShadow(cardSource);
                    removeShadowPile();
                    resetAll();
                }
            }
        } else if (cardCompare.className === "cardHome") {
            cardDestination = document.getElementById(card);
            if (checkValidityHome(cardSource, cardCompare)) {
                moveCardHome(cardSource, cardDestination);
                resetAll()
            } else {
                removeBoxShadow(cardSource);
                removeShadowPile();
                resetAll();
            }
        } else if (cardCompare.className === "cardPile") {
            cardDestination = document.getElementById(card);
            if (checkValidityPile(cardSource)) {
                moveCardPile(cardSource, cardDestination);
                resetAll()
            } else {
                removeBoxShadow(cardSource);
                removeShadowPile();
                resetAll();
            }
        } else {
            resetAll();
        }
    } else {
        console.log("there is no state " + state + " in cardClicked");
    }
}



function correctPile() {
    if (sourcePile === document.getElementById("showCards")) {
        let c = sourcePile.childNodes;
        let cAmount = sourcePile.childElementCount;
        if (cAmount === 0) {
            console.log("nothing to see here.")
        } else {
            if (cardsFlipped === 3) {
                let firstCard = c[cAmount - 1];
                let secondCard = c[cAmount - 2];
                firstCard.style.marginLeft = "0";
                if (media.matches) {
                    secondCard.style.marginLeft = "-28px";
                } else {
                    secondCard.style.marginLeft = "-35px";
                }
                cardsFlipped = 2
            } else if (cardsFlipped === 2) {
                let firstCard = c[cAmount - 1];
                firstCard.style.marginLeft = "0";
            } else {
                console.log("nothing to change here.")
            }
        }
    }
}


function removeOnclick(targetNode) {
    targetNode.removeAttribute("onclick");
}



function findEmptySpot() {
    if (sourcePile.hasChildNodes() === false) {
        if (sourcePile.className !== "flipCards") {
            sourcePile.setAttribute("onclick", "cardClicked(this.id)");
        }
    }
}



function deleteEmptySpot() {
    if (cardDestination.hasChildNodes() === true) {
        cardDestination.removeAttribute("onclick");
    }
}



function flipTopCard(cardPile) {
    let c = cardPile.childNodes;
    let cardAmount = cardPile.childElementCount;
    if (cardAmount > 0) {
        faceUp(c[cardAmount - 1]);
    }
}



function suitCompatible(suit1, suit2) {
    if (suit2 === "ignore") {
        return true;
    } else {
        if (suit1 === suit2) {
            return false;
        } else if (suit1 === "spades") {
            return suit2 !== "clubs";
        } else if (suit1 === "clubs") {
            return suit2 !== "spades";
        } else if (suit1 === "diamonds") {
            return suit2 !== "hearts";
        } else {
            return suit2 !== "diamonds";
        }
    }
}



function valueCompatible(value1, value2) {
    if (value1+1 === value2) {
        return true
    }
}



function getValue(card) {
    let cardValue
    let suit = card.childNodes[0];
    cardValue = suit.childNodes[0].innerHTML;
    if (cardValue === "A") {
        cardValue = "1";
    } else if (cardValue === "J") {
        cardValue = "11";
    } else if (cardValue === "Q") {
        cardValue = "12";
    } else if (cardValue === "K") {
        cardValue = "13";
    } else {
        return Number(cardValue);
    }
    return Number(cardValue);
}



function getSuit(card) {
    if (card.className === "card") {
        let suit = card.childNodes[0];
        return suit.className.toString();
    } else {
         if (card.id === "spadesCards") {
             return "spades";
         } else if (card.id === "diamondsCards") {
             return "diamonds";
         } else if (card.id === "clubsCards") {
             return "clubs";
         } else {
             return "hearts";
         }
    }
}



function resetAll() {
    state = 0;
    cardSource = null;
    cardCompare = null;
    sourcePile = null;
    cardDestination = null;
}



function checkForWin() {
    let b1 = document.getElementById("bankCards").childElementCount;
    let s1 = document.getElementById("showCards").childElementCount;
    let c1 = document.getElementById("cards1").childElementCount;
    let c2 = document.getElementById("cards2").childElementCount;
    let c3 = document.getElementById("cards3").childElementCount;
    let c4 = document.getElementById("cards4").childElementCount;
    let c5 = document.getElementById("cards5").childElementCount;
    let c6 = document.getElementById("cards6").childElementCount;
    let c7 = document.getElementById("cards7").childElementCount;
    let spades1 = document.getElementById("spadesCards").childElementCount;
    let diamonds1 = document.getElementById("diamondsCards").childElementCount;
    let clubs1 = document.getElementById("clubsCards").childElementCount;
    let hearts1 = document.getElementById("heartsCards").childElementCount;
    if (b1+s1+c1+c2+c3+c4+c5+c6+c7 === 0 && spades1 + diamonds1 + clubs1 + hearts1 === 52) {
        winSequence()
    } else
        console.log("you do not win yet")
}



function winSequence() {
    youWin = true;
    for (let i = 1; i < 8; i++) {
        let winBg = document.createElement("div");
        let winLetter = document.createElement("h1");
        let spot = "build" + i.toString();
        winBg.className = "winBG";
        winLetter.className = "letter";
        winLetter.innerHTML = winWord[i - 1];
        let newSpot = document.getElementById(spot);
        newSpot.appendChild(winBg);
        winBg.appendChild(winLetter);
    }
    changeColor();
    centerButton()
    colorChange = window.setInterval(changeColor, 200);
}



function changeColor() {
    for (let i=1; i<8; i++) {
        document.getElementById("build" + i.toString()).style.backgroundColor = randomColor();
    }
}



function randomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function moveButton() {
    let newField = document.getElementById("newField");
    newField.style.justifyContent = "flex-start";
    newField.style.alignItems = "flex-end";
    if (media.matches) {
        newField.style.marginLeft = "1.2em";
    } else {
        newField.style.marginLeft = "5em";
    }

}



function centerButton() {
    let newField = document.getElementById("newField");
    newField.style.justifyContent = "center";
    newField.style.alignItems = "flex-start";
    newField.style.marginLeft = "0";
}



function restartGame() {
    refreshPage()
}



function refreshPage(){
    window.location.reload();
}



function dealCards() {
    moveButton()
    let deck = getDeck()
    shuffle(deck)
    renderDeck(deck)
}



window.onload = dealCards;



function removeColor() {
    for (let i=1; i<8; i++) {
        document.getElementById("build" + i.toString()).style.background = "none";
    }
}



function clearWinSequence() {
    youWin = false;
    window.clearInterval(colorChange);
    removeColor();
    moveButton();
    for (let i = 1; i < 8; i++) {
        let spot = "build" + i.toString();
        let spotId = document.getElementById(spot)
        let spotChildren = spotId.childNodes;
        let winBg = spotChildren[3];
        let winId = winBg.childNodes;
        let letter = winId[0];
        winBg.removeChild(letter);
        spotId.removeChild(winBg);
    }
}



function clearGame() {
    let pos = 1
    for (let i=0; i<7; i++) {
        let cards1 = document.getElementById("cards" + pos);
        while (cards1.hasChildNodes()) {
            let removeMe = cards1.firstChild;
            removeMe.remove();
        }
        pos++;
    }
    let cards2 = document.getElementById("bankCards");
    while (cards2.hasChildNodes()) {
        let removeMe = cards2.firstChild;
        removeMe.remove();
    }
    let cards3 = document.getElementById("showCards");
    while (cards3.hasChildNodes()) {
        let removeMe = cards3.firstChild;
        removeMe.remove();
    }
    for (let j=0; j<4; j++) {
        let cards4 = document.getElementById(suits[j] + "Cards");
        while (cards4.hasChildNodes()) {
            let removeMe = cards4.firstChild;
            removeMe.remove();
        }
    }
}