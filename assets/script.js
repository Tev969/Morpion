let playerOneTurn = true;
let playAgainstIa = false;
let enemy = "";
const players = document.querySelector(".players");
const cells = document.querySelectorAll("#game button");
const playerVsIa = document.querySelector("#butTwo");
const playerVsPlayer = document.querySelector("#butOne");
let count = 0;

playerVsPlayer.addEventListener("click", () => {
  enemy = "Joueur 2";
  showGrid();
  changeSymbol(play);
});

playerVsIa.addEventListener("click", () => {
  playAgainstIa = true;
  enemy = "Ia";
  showGrid();
  changeSymbol(play);
});

function showGrid() {
  document.querySelector("#game").classList.remove("hidden");
  document.querySelector("#gameChoice").classList.add("hidden");
  players.classList.remove("morpion");
  players.textContent = `Joueur vs ${enemy}`;
}

// function showIaGrid() {
//   document.querySelector("#game").classList.remove("hidden");
//   document.querySelector("#gameChoice").classList.add("hidden");
//   players.classList.remove("morpion");
//   players.textContent = "Joueur vs IA";
// }

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let optionCase = ["", "", "", "", "", "", "", "", ""];

function changeSymbol(game) {
  cells.forEach((element) => {
    element.addEventListener(
      "click",
      () => {
          count ++
          console.log(count);
          if (count >= 9) {
               players.textContent = "Egalité"
          }
        game(element);
      },
      { once: true }
    );
  });
}

function play(element) {
  element.textContent = playerOneTurn ? "X" : "0";
  players.textContent = !playerOneTurn ? "Joueur 1" : enemy;
  let index = parseInt(element.getAttribute("cellIndex"));
  optionCase[index] = element.textContent;
  winnerCondition();
  if (count >= 9) {
     players.textContent = "Egalité !"
  }
  playerOneTurn = !playerOneTurn;
  if (playAgainstIa) {
    playWithIa();
  }
}

function playWithIa(el) {
  if (playerOneTurn == false) {
    let cells = document.querySelectorAll(".index");
    let cpuChoice = randomize(0, cells.length - 1);
    while (cells[cpuChoice].textContent != "") {
     console.log('test');
     cpuChoice = randomize(0, cells.length - 1);
     if (count >= 9) {
          players.textContent = "égalité"
          return
     }
    }
    cells[cpuChoice].click()
    winnerCondition();
  }
}

function winnerCondition() {
  let winningRound = false;
  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const cellA = optionCase[condition[0]];
    const cellB = optionCase[condition[1]];
    const cellC = optionCase[condition[2]];
    if (cellA != "" && cellA === cellB && cellB === cellC) {
      players.textContent =
        cellA === "X" ? "Joueur 1 a Gagner !!!" : `${enemy} a Gagner !!!`;
      winningRound = true;
      document.querySelector("#game").classList.add("hidden");

      break;
    }
  }
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
