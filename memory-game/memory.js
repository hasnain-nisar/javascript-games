const cardArray = [
    {
        name: 'fries',
        img :'images/fries.png'
    },
    {
        name : 'cheeseburger',
        img : 'images/cheeseburger.png'
    },
    {
        name : 'hotdog',
        img : 'images/hotdog.png'
    },
    {
        name : 'milkshake',
        img :   'images/milkshake.png'
    },
    {
        name : 'pizza',
        img : 'images/pizza.png'
    },
    {
        name : 'icecream',
        img : 'images/ice-cream.png'
    },
    {
        name : 'soda',
        img : 'images/soda.png'
    },
    {
        name : 'egg',
        img : 'images/egg.png'
    },
    {
        name: 'fries',
        img :'images/fries.png'
    },
    {
        name : 'cheeseburger',
        img : 'images/cheeseburger.png'
    },
    {
        name : 'hotdog',
        img : 'images/hotdog.png'
    },
    {
        name : 'milkshake',
        img :   'images/milkshake.png'
    },
    {
        name : 'pizza',
        img : 'images/pizza.png'
    },
    {
        name : 'icecream',
        img : 'images/ice-cream.png'
    },
    {
        name : 'soda',
        img : 'images/soda.png'
    },
    {
        name : 'egg',
        img : 'images/egg.png'
    }
]
cardArray.sort(() => 0.5-Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay =  document.querySelector('#result')
let cardChosen = []
let cardsChosenIds = []
const cardWon = []

function createBoard(){
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src' , 'images/blank.png')
        card.setAttribute('data-id',i)
        gridDisplay.appendChild(card)
        card.addEventListener('click',flipCard)
        
}
}
function checkMatch(){


    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    console.log(cards)
    console.log('check for match!')

    if (optionOneId == optionTwoId){
        cards[optionOneId].setAttribute('src','images/blank.png')
        cards[optionOneId].setAttribute('src','images/blank.png')
        alert('You have clicked the same image')
    }

    
    if (cardChosen[0] == cardChosen[1]){
        alert('You found a match!')
        cards[optionOneId].setAttribute('src','images/white.png')
        cards[optionTwoId].setAttribute('src','images/white.png')
        cards[optionOneId].removeEventListener('click',flipCard)
        cards[optionTwoId].removeEventListener('click',flipCard)
        cardWon.push(cardChosen)
    }
    else {
        cards[optionOneId].setAttribute('src','images/blank.png')
        cards[optionTwoId].setAttribute('src','images/blank.png')
        alert('sorry try again!')
    }
    resultDisplay.innerHTML = cardWon.length
    cardChosen = []
    cardsChosenIds = []

    if (cardWon.length == cardArray.length/2){
            alert('Congratulation you found them all!')
    }

}
createBoard()

function flipCard(){
    
    const cardId = this.getAttribute('data-id')
    
    cardChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    console.log(cardChosen)
    console.log(cardsChosenIds)
    
    this.setAttribute('src',cardArray[cardId].img)

    if (cardChosen.length === 2){
        setTimeout(checkMatch,500)
    }
}