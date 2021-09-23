'use strict';

const diceImage = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let scorePlayer0 = document.getElementById('score--0');
let scorePlayer1 = document.getElementById('score--1');
let currentScorePlayer0 = document.getElementById('current--0');
let currentScorePlayer1 = document.getElementById('current--1');

let currentScore = 0;
let scores = new Array(0, 0);
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent =
		currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0.classList.toggle('player--active');
	player1.classList.toggle('player--active');
};

// reset function
const newGame = function () {
	// make the dice image hidden at first
	diceImage.style.display = 'none';

	// make all the scores 0
	currentScore = 0;
	scores = [0, 0];

	// make the score visible
	scorePlayer0.textContent = currentScore;
	scorePlayer1.textContent = currentScore;
	currentScorePlayer0.textContent = scores[0];
	currentScorePlayer1.textContent = scores[1];

	player0.style.backgroundColor = '';
	player1.style.backgroundColor = '';

	document
		.querySelector(`.player--${activePlayer}`)
		.classList.remove('player--winner');

	activePlayer = 0;
	playing = true;

	// switch active player to player 0
	player0.classList.add('player--active');
	player1.classList.remove('player--active');
};

const rollDice = function () {
	if (!playing) return;

	let diceNumber = Math.trunc(Math.random() * 6) + 1;
	// console.log(diceNumber);
	diceImage.src = `dice-${diceNumber}.png`;
	diceImage.style.display = '';

	if (diceNumber === 1) {
		switchPlayer();
	} else {
		currentScore += diceNumber;
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
	}
};

const holdGame = function () {
	if (!playing) return;

	scores[activePlayer] += currentScore;
	document.getElementById(`score--${activePlayer}`).textContent =
		scores[activePlayer];

	if (scores[activePlayer] >= 100) {
		playing = false;
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add('player--winner');

		currentScore = 0;
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;

		document
			.querySelector(`.player--${activePlayer}`)
			.classList.remove('acitve--player');
	} else switchPlayer();
};

// after reloading the page
newGame();

// after pressing the new game button
btnNew.addEventListener('click', newGame);

// after rolling a dice
btnRoll.addEventListener('click', rollDice);

// after holding the game
btnHold.addEventListener('click', holdGame);
