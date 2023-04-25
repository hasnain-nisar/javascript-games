const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 825
const boardHeight = 400
const userWidth = 150
const userHeight = 10
let timerId
let xDirection = 2
let yDirection = 2
let score = 0   

const ballStart = [270,40]
let ballCurrentPosition = ballStart

const userStart = [230,10]

let currentPosition = userStart

//create block

class Block {
    constructor (xAxis , yAxis){
        this.bottomLeft = [ xAxis , yAxis]
        this.bottomRight = [xAxis + blockWidth , yAxis ]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth , yAxis + blockHeight]       
    }
}


//All my blocks
const blocks = [
    new Block(5,375),
    new Block(107,375),
    new Block(209,375),
    new Block(311,375),
    new Block(413,375),
    new Block(515,375),
    new Block(617,375),
    new Block(719,375),
    new Block(5,353),
    new Block(107,353),
    new Block(209,353),
    new Block(311,353),
    new Block(413,353),
    new Block(515,353),
    new Block(617,353),
    new Block(719,353),
    new Block(5,331),
    new Block(107,331),
    new Block(209,331),
    new Block(311,331),
    new Block(413,331),
    new Block(515,331),
    new Block(617,331),
    new Block(719,331),
    new Block(5,309),
    new Block(107,309),
    new Block(209,309),
    new Block(311,309),
    new Block(413,309),
    new Block(515,309),
    new Block(617,309),
    new Block(719,309),
]



//draw my block
function addBlocks(){
    for (let i = 0; i < blocks.length ; i++){

    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
    }

 

}
addBlocks()

//add user

const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()


//function draw user

function drawUser (){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}


//draw ball
function drawBall (){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}


//move user
function moveUser(e) {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentPosition[0] > 0) {
          currentPosition[0] -= 10
          drawUser()   
        }
        break
    case 'ArrowRight':
        if (currentPosition[0] < (boardWidth - userWidth)) {
        currentPosition[0] += 10
        drawUser()   
        }
        break
    }
}
document.addEventListener('keydown', moveUser)

  //add ball

const ball = document.createElement('div')
ball  .classList.add('ball')
drawBall()
grid.appendChild(ball)

  //mave the ball

    function moveBall(){
        ballCurrentPosition[0] += xDirection
        ballCurrentPosition[1] += yDirection
        drawBall()
        checkForCollisions()

}

timerId = setInterval(moveBall,15)

//check for collisions

function checkForCollisions(){

    //check for block collision
    for ( let i = 0; i < blocks.length ; i++){
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
        }
        //check for win
        if (blocks.length === 0){
            scoreDisplay.innerHTML = 'YOU WIN'
            clearInterval(timerId)
            document.removeEventListener('keydown',moveUser)
        }
    }



    //check for wall collisions
    if (
        ballCurrentPosition[0]  >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight-ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ){
        changeDirection()
    }

    //check for user collision
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + userWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + userHeight)        
        ){
            changeDirection()
        }


    //check for game over
    if    (ballCurrentPosition[1] <= 0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown',moveUser)
    }
}

function changeDirection(){
    if (xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}