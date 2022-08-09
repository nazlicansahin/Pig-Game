'use strict';
//.classname ifadesini aynı dizindeki tüm htmllerde mi arar yoksa tanımlanmadığında varsayılan olarak indez ayarlı ve diğer html dosyalarını tanımlamak gerekiyor mu
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //"#" id selectordur  "." class selectordur. ID ile çağırmanın başka yolu da var
const score1El = document.getElementById('score--1'); //getelementbyid daha hızlı çalışır ama binlerce id çağırdığında sadece.
const current1El = document.getElementById('current--1'); //getelementbyid daha hızlı çalışır ama binlerce id çağırdığında sadece.
const current0El = document.getElementById('current--0'); //getelementbyid daha hızlı çalışır ama binlerce id çağırdığında sadece.

const diceEl = document.querySelector('.dice'); //For hide dice at begining
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores = [0, 0];
let playing = true;
let currentScore = 0;
let activePlayer = 0;

const init = function () {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner'); //htmldeki classını kontrol eder istenen ifade  varsa kaldırır
  player1El.classList.remove('player--winner');
};
init();
const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //htmldeki classını kontrol eder istenen ifade  varsa kaldırır
  player1El.classList.toggle('player--active');
  currentScore = 0;
};
// Rolling dice funcionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1 : if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch other player
      // if (activePlayer === 0) activePlayer === 1;
      // else activePlayer === 0;
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1] = score[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 30) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchplayer();
    }
    //Finish the game
    //Switch next player
  }
});
btnNew.addEventListener('click', init);
