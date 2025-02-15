const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
] ;

// LET'S CREATE A FUNCTION TO INITILIAZIE THE GAME
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // ui pr empty krna pdega boxes ko
    boxes.forEach((box, index) => {
          box.innerText = ""   ; 
          boxes[index].style.pointerEvents = "all";
          // one more thing is missing initialize box with  css properties again
       box.classList = `box box${index+1}`;

    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
     currentPlayer = "O";
    }
    else{
        currentPlayer ="X"
    }

    // ui update
    gameInfo.innerText = `Current Player - ${currentPlayer} ` ;
}

function checkGameOver(){
     let answer = "";
     winningPosition.forEach((position) => {
        if((gameGrid[position[0]]  !== "" || gameGrid[position[1]]  !== "" || gameGrid[position[2]]  !== "")
         && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
        
            // check winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

        // disabl;e pointer events
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        // now we kwon thw winner  
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
     });

     if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return ;
     }

     // let's check wheather there is a tie case

     let fillCount = 0;
     gameGrid.forEach((box) =>{
        if(box !== ""){
        fillCount++;
        }
     });


    // board is filled game is tie
     
        if(fillCount === 9){
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }
     
}



function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; // yeh line ui me chnage kregi
        gameGrid[index] = currentPlayer;  //yeh wali line hmare grid me(box me)
        boxes[index].style.pointerEvents = "none";
        // swap kro turn ko
           swapTurn();
        // check koi jeet toh nhi gya
          checkGameOver();
    }
}

boxes.forEach((box, index) => {
     box.addEventListener("click" , () => {
        handleClick(index)
     })
} );

newGameBtn.addEventListener("click" , initGame)




