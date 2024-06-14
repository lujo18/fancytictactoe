const boxes = document.querySelectorAll(".box");
let boxValues = [0, 0, 0, 0, 0, 0, 0, 0, 0]
const icons = document.querySelectorAll(".icon")
let boxIds = [];
icons.forEach(
  function(elem) {
    boxIds.push(elem.id);
  }
)
let player = 1;

let winCond = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]



const winnerBox = document.querySelector("#winner-box");
const winnerText = document.querySelector("#winner-text");

const playerNum = document.querySelector("#player-num");

let gameBox = document.querySelector(".game-box");

function switchPlayer(currentP) {
  if (currentP === 1) {
    player = 2
  } else if (currentP === 2) {
    player = 1
  }
  playerNum.innerHTML = player;
}

let numCorrect = 0;
let won = false;
function checkScore(currentP) {
  let inRow = 0;
  winCond.forEach(function(set) {
    numCorrect = 0;
    set.forEach(function(value) {
      if (boxValues[value] === player) {
        numCorrect++
      }
      if (numCorrect === 3) {
        won = true;
        let winningRow = set;
        winningRow.forEach(function(value) {
          console.log(boxIds[value])
          //let index = boxIds.indexOf(icon.id)
          let thisIcon = document.getElementById(boxIds[value]);
          thisIcon.classList.add("winning-icon");
        })
        winnerBox.classList.add("show");
        winnerText.innerHTML = "Player " + player + " : WINSSS";
        console.log("Player " + player + " : WINSSS");
        return;
      }
    })
  })
  if (!boxValues.includes(0) && !won) {
    console.log(numCorrect)
    console.log("doesnt include 0")
    console.log("WITH")
    winnerBox.classList.add("show");
    winnerText.innerHTML = "No One Wins :("

  }



  switchPlayer(player);
}

function animateBoard() {
  gameBox.classList.add("box-jump")
  console.log(gameBox.classList)
  setTimeout(function() { gameBox.classList.remove("box-jump") }, 500);
}

boxes.forEach(function(elem) {
  elem.addEventListener("click", function() {
    let icon = elem.firstElementChild;
    let index = boxIds.indexOf(icon.id);

    animateBoard();
    if(elem.classList.contains("highlighted-one")){
      elem.classList.remove("highlighted-one");
    }
    if(elem.classList.contains("highlighted-two")){
      elem.classList.remove("highlighted-two");
    }


    console.log(index)
    if(boxValues[index]===0){
      if (player === 1) {
        boxValues[index] = 1;
      } else if (player === 2) {
        boxValues[index] = 2;
      }
      console.log(boxValues)


      if (boxValues[index] === 1) {
        icon.classList.add("fa-solid", "fa-xmark")
      } else if (boxValues[index] === 2) {
        icon.classList.add("fa-regular", "fa-circle")
      } else if (boxValues[index] === 0) {
        if (icon.classList.contains("fa-solid")) {
          icon.classList.remove("fa-solid")
        } else if (icon.classList.contains("fa-regular")) {
          icon.classList.remove("fa-regular")
        } else if (icon.classList.contains("fa-circle")) {
          icon.classList.remove("fa-circle")
        } else if (icon.classList.contains("fa-xmark")) {
          icon.classList.remove("fa-xmark")
        }
      }

      checkScore(player);
    }
    
  })
  elem.addEventListener("mouseover", function() {
    let icon = elem.firstElementChild;
    let index = boxIds.indexOf(icon.id);
    if(boxValues[index] === 0) {
      if (player===1) {
        elem.classList.add("highlighted-one");
      } else if (player===2) {
        elem.classList.add("highlighted-two");
      }
    }
  })
  elem.addEventListener("mouseleave", function() {
    if(elem.classList.contains("highlighted-one")){
      elem.classList.remove("highlighted-one");
    }
    if(elem.classList.contains("highlighted-two")){
      elem.classList.remove("highlighted-two");
    }
    
  })



})


const titleText = document.getElementById("title-text");

titleText.addEventListener("mouseover", function(e) {
  titleText.classList.add("wobble-anim");
})

titleText.addEventListener("animationend", function(e) {
  titleText.classList.remove("wobble-anim");
})

