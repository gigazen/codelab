"use strict";
/**
 * Selecting elements
 */
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // faster alternative
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

/**
 * Initial condition function, all scores are 0s and dice is hidden
 */
let scores, currentScore, activePlayer, playing;

function init() {
  // scores are 0 initially
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Current score can be accumulated on each dice roll to later hold ie. add to the total score or can be lost if dice rolls 1
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // dice is hidden initially
  diceEl.classList.add("hidden");
  // Game starts from player 0, so activePlayer holds 0
  activePlayer = 0;
  // initially player 0 is active player and none of them are winners
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  // state variable to stop the game after we get a winner
  playing = true;
}

// Run the init function after script loads to maintain initial condition
init();

/**
 * Switch player function, make current score of currently active player as 0 and other player as active player
 */
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

/**
 * Rolling dice functionality
 */
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generate random dice roll between 1 and 6
    const ranDiceRoll = Math.trunc(Math.random() * 6) + 1;

    // Display dice by removing "hidden" class from diceEl and also access the dice image source, setting it acc. to the current random dice roll value
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${ranDiceRoll}.png`;

    // Check whether rolled value is 1, if yes then switch to next player otherwise add the rolled value to the active player's current score
    if (ranDiceRoll !== 1) {
      currentScore += ranDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

/**
 * Holding dice functionality
 */
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player's score, also empty the current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    // Check if current player's score is >= 50, if it is then finish the game and if not then switch player
    if (scores[activePlayer] >= 50) {
      // finish the game and hide the dice
      playing = false;
      diceEl.classList.add("hidden");

      // apply winner style to the winner player and remove active player style from it
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

/**
 * Reset the game
 */
btnNew.addEventListener("click", init);
