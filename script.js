'use strict';

(function(){

	var winningCases = [
		[0, 1, 2], 
		[3, 4, 5], 
		[6, 7, 8], 
		[0, 3, 6], 
		[1, 4, 7], 
		[2, 5, 8], 
		[0, 4, 8], 
		[2, 4, 6]
	];

	var gameboard = new Game();

	function Game() {
		this.steps = [];
		this.gameover = false;
		this.gamewon = false;
	}

	function checkWinning(cellId) {

		var userId = gameboard.steps.length % 2; // user0 and user1

		for (var i = userId; i < winningCases.length; i += 2) {
			var index = winningCases[i].indexOf(cellId);
			if (index !== -1) {
				winningCases[i].splice(index, 1);
				console.log(winningCases[i]);
			}
			if (winningCases[i].length === 0) gameboard.gamewon = true;
		}

	}

	document.querySelector('.gameboard').addEventListener('click', function(e) {
		if (gameboard.gamewon) {
			e.stopPropagation();
			return;
		}

		var cellId = +e.target.id;

		// for cell not clicked yet
		if (gameboard.steps.indexOf(cellId) === -1) {

			// log cell to steps
			gameboard.steps.push(cellId);

			// mark cell as clicked
			var classToAdd = (gameboard.steps.length % 2 === 0) ? 'gameboard__cell--o' : 'gameboard__cell--x';
			e.target.classList.add(classToAdd);

			checkWinning(cellId);

			if (gameboard.gamewon || gameboard.steps.length === 9) {
				gameboard.gameover = true;
				document.querySelector('.header__gameStatus').classList.add('header__gameStatus--gameOver');
			}

		}


	});
})();