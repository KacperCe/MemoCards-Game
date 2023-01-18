document.addEventListener("DOMContentLoaded", function() {
let cardsArray = []
for (let i = 1; i < 47; i++) {
    cardsArray.push({
        id: `${i}`,
        img: `/assets/cards/Image-${i}.png`
    })
}

let gameCards = []
let cardsChoosen = []
let cardsMatched = []
let choosenLevel = 8
let moves = 0
let freezeTime = false
let gameStarted = true
let grid = document.querySelector(".grid")

function getRandomCards(count, arr){
    let answer = []; 
    counter = 0;
   
    while(counter < count){
      let rand = arr[Math.floor(Math.random() * arr.length)];
      if(!answer.some(an => an === rand)){
        answer.push(rand);
        counter++;
      }
    }
    counter = 0;

    // doubling cards for pairs and Schwartzian Transform Method for shuffling the array 
    let shuffled = answer
    .flatMap(i => [i, i])
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    return shuffled;
  }
  
function checkForMatch (){
    moves += 1
    updateScore()
    let cardsForCheck = document.querySelectorAll(".flip-left")
    
    if (cardsChoosen[0] === cardsChoosen[1]) {
        cardsMatched.push(cardsChoosen)
        
        for (let i = 0; i < cardsForCheck.length; i++) {
            cardsForCheck[i].classList.remove("flip-left");
            cardsForCheck[i].classList.add("pair");
            cardsForCheck[i].removeEventListener("click", flipCard)
        }
    } else {
        setTimeout(() => {
            for (let i = 0; i < cardsForCheck.length; i++) {
                cardsForCheck[i].classList.remove("flip-left");
            }
        }, 500)

    }
    if (cardsMatched.length === choosenLevel) {
        alert("YOU WON!")
    }
    cardsChoosen = []
}

function freezeTimeOff() {
    freezeTime = false;
}

function flipCard() {
    let cardId = this.getAttribute("data-id")
    if (!freezeTime){
        if (!this.classList.contains("flip-left") ) {
            this.classList.add("flip-left")
            cardsChoosen.push(cardId)
            if (cardsChoosen.length === 2) {
                checkForMatch()
                freezeTime = true
                setTimeout(freezeTimeOff, 500)
            }
    }
    } 
}

function createBoard() {
    gameCards = getRandomCards(choosenLevel, cardsArray)
    
    for (let i = 0; i < gameCards.length; i++) {
        let card = document.createElement("div")
        card.setAttribute("class", "card");
        card.setAttribute("data-id", gameCards[i].id);
        card.innerHTML = `
        <div class="card-back"><img src="${gameCards[i].img}" draggable ="false"></div>
        <div class="card-front"></div>
        `;
        grid.appendChild(card)
        card.addEventListener('click', flipCard)
    }
}

function resetBoard() {
    let flippedCards = document.querySelectorAll(".flip-left, .pair")
    
    for (let i = 0; i < flippedCards.length; i++) {
        flippedCards[i].classList.remove("flip-left", "pair")
    }

    setTimeout(() => {
        grid.innerHTML = ''
        cardsChoosen = []
        cardsMatched = []
        moves = 0
        createBoard()
        updateScore()
    }, 400)

}

function updateScore() {
    document.getElementById("moves").innerHTML = moves
}

document.querySelector(".reset").addEventListener("click", resetBoard)
createBoard()


})
