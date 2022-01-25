const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const emoji = document.getElementById("emoji");
const emoji2 = document.getElementById("emoji2");








startGame();

function startGame() {
    initalizeCards(game.createCardsFromTechs());

}
function initalizeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        cardElement.classList.add('flip')
        setTimeout(() => {
            cardElement.classList.remove('flip')
        }, 2000);
        createCardContent(card, cardElement)
        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
    })
}
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement)

}
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);

    }
    else {
        cardElementFace.innerHTML = "?";
        cardElementFace.style.fontSize = "60px";
    }

    element.appendChild(cardElementFace);
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMarch()) {
                game.clearCards();
                if (game.CheckGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            }
            else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();

                }, 1000);
            };


        }
    }
}
function restart() {
    game.techs = ['bootstrap',
        'css',
        'electron',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react',
        'firebase',
    ]
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    let edit = document.getElementById("gameBoard")
    edit.style.gridTemplate = '1fr 1fr 1fr 1fr  / 1fr 1fr 1fr 1fr 1fr '
    gameOverLayer.style.display = 'none';

}
function lvlup() {

    game.uplvl();
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    let edit = document.getElementById("gameBoard");
    let up = document.getElementById("lvl");
    gameOverLayer.style.display = 'none';

    if (game.techs.length == 12) {

        up.innerHTML = "Nível 3"
        edit.style.gridTemplate = '1fr 1fr 1fr  / 1fr 1fr 1fr 1fr 1fr 1fr ';
        
    }
    else {
        let final = document.getElementById("lvl");
        let title = document.getElementById("title");

        title.innerHTML = "parabéns, você completou o jogo!";
        final.style.display = "none";
        edit.style.gridTemplate = '1fr 1fr 1fr  / 1fr 1fr 1fr 1fr 1fr 1fr 1fr ';
    }
}
function emojicon() {

    if (emoji2.style.display=="block") {

        emoji.style.display = "block";
        emoji2.style.display = "none";
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme","dark");

    }
    else {

        emoji.style.display = "none";
        emoji2.style.display = "block"
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme","light");

    }
}
window.onload = checkTheme();
function checkTheme(){
    let localStorageTheme = localStorage.getItem("theme");
    if(localStorageTheme != null && localStorageTheme === "dark"){

        document.body.className = localStorageTheme;
        emoji.style.display = "block";
        emoji2.style.display = "none";

    }
    else{

        document.body.className = localStorageTheme;
        emoji2.style.display = "block";
        emoji.style.display = "none";

    }
}
