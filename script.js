document.addEventListener("DOMContentLoaded", function() {

const cardsArray = [
        {
            id: '1',
            img: '/assets/cards/Image-1.png'
        },
        {
            id: '2',
            img: '/assets/cards/Image-2.png'
        },
        {
            id: '3',
            img: '/assets/cards/Image-3.png'
        },
        {
            id: '4',
            img: '/assets/cards/Image-4.png'
        },
        {
            id: '5',
            img: '/assets/cards/Image-5.png'
        },
        {
            id: '6',
            img: '/assets/cards/Image-6.png'
        },
        {
            id: '7',
            img: '/assets/cards/Image-7.png'
        },
        {
            id: '8',
            img: '/assets/cards/Image-8.png'
        },
        {
            id: '9',
            img: '/assets/cards/Image-9.png'
        },
        {
            id: '10',
            img: '/assets/cards/Image-10.png'
        },
        {
            id: '11',
            img: '/assets/cards/Image-11.png'
        },
        {
            id: '12',
            img: '/assets/cards/Image-12.png'
        },
        {
            id: '13',
            img: '/assets/cards/Image-13.png'
        },
        {
            id: '14',
            img: '/assets/cards/Image-14.png'
        },
        {
            id: '15',
            img: '/assets/cards/Image-15.png'
        },
        {
            id: '16',
            img: '/assets/cards/Image-16.png'
        },
        {
            id: '17',
            img: '/assets/cards/Image-17.png'
        },
        {
            id: '18',
            img: '/assets/cards/Image-18.png'
        },
        {
            id: '19',
            img: '/assets/cards/Image-19.png'
        },
        {
            id: '20',
            img: '/assets/cards/Image-20.png'
        },
        {
            id: '21',
            img: '/assets/cards/Image-21.png'
        },
        {
            id: '22',
            img: '/assets/cards/Image-22.png'
        },
        {
            id: '23',
            img: '/assets/cards/Image-23.png'
        },
        {
            id: '24',
            img: '/assets/cards/Image-24.png'
        },
        {
            id: '25',
            img: '/assets/cards/Image-25.png'
        },
        {
            id: '26',
            img: '/assets/cards/Image-26.png'
        },
        {
            id: '27',
            img: '/assets/cards/Image-27.png'
        },
    
    ]

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
