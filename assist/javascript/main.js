// public variables
const boxArea = document.querySelectorAll(".box-area");
const box = document.querySelector(".box");
const playAgain = document.querySelector(".playAgain");

const lowestPlay = 4;
let gamePlayNum = 0;

let randomNumber = Math.random();
let player = randomNumber < 0.5 ? 0 : 1;

const game = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

/*
[
    0 0 , 0 1 , 0 2
    1 0 , 1 1 , 1 2
    2 0 , 2 1 , 2 2
]

*/

boxArea.forEach((el) => {
  el.onclick = function () {
      handleClick(el);
      checkIfEqual();
        checkWin();
  };
});

function handleClick(el) {
  //check if the box active already
  if (el.classList.contains("active")) return;
  gamePlayNum++;
  game[el.dataset.index1][el.dataset.index2] = player;
  el.classList.add("active");
  el.innerHTML = player == 0 ? "O" : "X";
  player = player == 0 ? 1 : 0;
}

function checkIfEqual() {
    console.log(gamePlayNum);
  if (gamePlayNum == 9) {
    showAlert(`we got draw`);
    handleEnd();
  }
}

function checkWin() {
  if (gamePlayNum < lowestPlay) return;
  let num = -1;
  let playerX = player == 0 ? 1 : 0;

  // check if the any row match
  for (let i = 0; i < game.length; i++) {
    num = -1;
    for (let j = 0; j < game[0].length; j++) {
      if (j == 0) {
        num = game[i][j];
        continue;
      }
      num = num == game[i][j] ? game[i][j] : -1;
    }

    if (num == 0 || num == 1) {
      showAlert(`Player ${playerX == 0 ? "O" : "X"} Win`);
      handleEnd();
    }
  }

  // check if the any column match
  for (let i = 0; i < game.length; i++) {
    num = -1;
    for (let j = 0; j < game[0].length; j++) {
      if (j == 0) {
        num = game[j][i];
        continue;
      }
      num = num == game[j][i] ? game[j][i] : -1;
    }

    if (num == 0 || num == 1) {
      showAlert(`Player ${playerX == 0 ? "O" : "X"} Win`);
      handleEnd();
    }
  }
  //check the match in mid
  if (
    (game[0][0] == game[1][1] && game[0][0] == game[2][2]) ||
    (game[0][2] == game[1][1] && game[0][2] == game[2][0])
  ) {
    showAlert(`Player ${playerX == 0 ? "O" : "X"} Win`);
    handleEnd();
  }
}

function handleEnd() {
  box.style.display = "none";
  playAgain.style.display = "block";
}

playAgain.onclick = function () {
  box.style.display = "grid";
  playAgain.style.display = "none";
  clear();
};

function clear() {
  boxArea.forEach((el) => {
    el.innerHTML = "";
    el.classList.remove("active");
  });
  gamePlayNum = 1;
  //reset game array
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game[0].length; j++) {
      game[i][j] = -1;
    }
  }
}

// sweet alert
function showAlert(msg) {
  Swal.fire({
    title: `${msg}`,
    confirmButtonColor: "#65451f",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}
