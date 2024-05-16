let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")



let turnO = true; //playerX, playerO
let count = 0; //To Track Draw



const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];




boxes.forEach((box) => {
  box.addEventListener("click", () => {
    music.play();
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      audioTurn.play();
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      audioTurn.play();
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});




const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        gameover.play();
        showWinner(pos1Val);
        music.pause();
        return true;
      }
    }
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};




const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};



const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};



const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};




const resetGame = () => {
  gameover.pause();
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  
};





newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
