/**
 * Snake Game – klasyczny Snake z obsługą wielu instancji i tłumaczeniami.
 * Author: by Eskim
 * Version: 1.2
 */

document.addEventListener('DOMContentLoaded', () => {
    // Znajdź wszystkie kontenery gier na stronie
    const containers = document.querySelectorAll('.snake-game-container');

    containers.forEach(container => {
		
		const instanceId = container.dataset.instance || 'default';
		const highScoreKey = `snakeHighScore_${instanceId}`;
		let highScore = parseInt(localStorage.getItem(highScoreKey)) || 0;
		let directionChanged = false;
		
        const canvas = container.querySelector('.snake-game-canvas');
        const startButton = container.querySelector('.start-snake-game');
        const scoreDisplay = container.querySelector('.snake-score');

        // Jeśli brakuje któregokolwiek elementu – przerywamy dla tej instancji
        if (!canvas || !startButton || !scoreDisplay) return;

        // Pobranie prędkości, kolorów i wymiarów z atrybutów
        let speedValue = Math.min(100, Math.max(1, parseInt(container.dataset.speed) || 65));
        const speed = Math.round(mapRange(speedValue, 1, 100, 200, 10));
        const backgroundColor = container.dataset.bgColor || '#000';
		const strokeColor = getContrastColor(backgroundColor);
        const borderColor = container.dataset.borderColor || '#333';
        const snakeColor = container.dataset.snakeColor || 'lime';
        const foodColor = container.dataset.foodColor || 'red';

        canvas.style.borderColor = borderColor;
        const ctx = canvas.getContext('2d');
        const gridSize = 10;

        // Wstępne tło canvasu — przed startem gry
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Zmienne stanu gry (izolowane per instancja)
        let snake = [];
        let dx = 0, dy = 0;
        let food = null;
        let gameInterval = null;
        let score = 0;
        let isPaused = false;

        // Tłumaczenia lub fallback
        const t = {
            startText: (typeof SnakeGameL10n?.startText === 'string') ? SnakeGameL10n.startText : 'Start Game',
            scoreText: (typeof SnakeGameL10n?.scoreText === 'string') ? SnakeGameL10n.scoreText : 'Score',
            pausedText: (typeof SnakeGameL10n?.pausedText === 'string') ? SnakeGameL10n.pausedText : 'PAUSED'
        };

        // Przypisanie etykiety przycisku startowego
        startButton.textContent = t.startText;

        // Obsługa przycisku start
        startButton.addEventListener('click', startGame);

        // Obsługa globalnych strzałek – tylko najnowsza gra reaguje
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key === ' ' || key === 'Spacebar' || e.code === 'Space') {
                e.preventDefault();
                togglePause();
                return;
            }
            if (!isPaused) changeDirection(e);
        });

        /**
         * Rozpoczyna nową grę lub restartuje obecną.
         */
		function startGame() {
			isPaused = false;
			startButton.style.display = 'none';

			snake = [{ x: 150, y: 150 }];
			dx = gridSize;
			dy = 0;
			food = spawnFood();
			score = 0;
			updateScore();

			const countdownSteps = ['3','2','1','START'];
			let step = 0;

			const countdownInterval = setInterval(() => {
				ctx.fillStyle = backgroundColor;
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				ctx.fillStyle = strokeColor;
				ctx.font = 'bold 48px monospace';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(countdownSteps[step], canvas.width / 2, canvas.height / 2);

				step++;

				if (step >= countdownSteps.length) {
					clearInterval(countdownInterval);

					// START zostaje na ekranie przez 1 sekundę
					setTimeout(() => {
						gameInterval = setInterval(gameLoop, speed);
					}, 1000);
				}
			}, 1000);
		}



        /**
         * Główna pętla gry – porusza węża, sprawdza kolizje i rysuje planszę.
         */
        function gameLoop() {
			
			directionChanged = false;
            const head = {
                x: snake[0].x + dx,
                y: snake[0].y + dy
            };

            if (checkCollision(head)) {
                endGame();
                return;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                food = spawnFood();
                score++;
                updateScore();
            } else {
                snake.pop();
            }

            draw();
        }

        /**
         * Zatrzymuje grę i pokazuje przycisk startowy ponownie.
         */
        function endGame() {
            clearInterval(gameInterval);
            startButton.style.display = 'block';
        }

        /**
         * Pauzuje/wznawia grę.
         */
        function togglePause() {
            if (!snake || snake.length === 0) return;

            isPaused = !isPaused;

            if (isPaused) {
                clearInterval(gameInterval);
                gameInterval = null;
            } else {
                gameInterval = setInterval(gameLoop, speed);
            }

            draw();
        }

        /**
         * Aktualizuje widoczny wynik gry.
         */
		function updateScore() {
			if (score > highScore) {
				highScore = score;
				localStorage.setItem(highScoreKey, highScore);
			}
			scoreDisplay.textContent = `${t.scoreText}: ${score} / ${highScore}`;
		}

        /**
         * Sprawdza, czy wąż uderzył w ścianę lub w siebie.
         */
        function checkCollision(pos) {
            return (
                pos.x < 0 || pos.y < 0 ||
                pos.x >= canvas.width || pos.y >= canvas.height ||
                snake.some(segment => segment.x === pos.x && segment.y === pos.y)
            );
        }

        /**
         * Losuje nową pozycję jedzenia.
         */
        function spawnFood() {
            return {
                x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
                y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
            };
        }

        /**
         * Zmienia kierunek poruszania się węża.
         */
        function changeDirection(e) {
			if (directionChanged) return;
            const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

            if (allowedKeys.includes(e.key)) {
                e.preventDefault();
            }

            if (isPaused) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (dy === 0) { dx = 0; dy = -gridSize; }
					directionChanged = true;
                    break;
                case 'ArrowDown':
                    if (dy === 0) { dx = 0; dy = gridSize; }
					directionChanged = true;
                    break;
                case 'ArrowLeft':
                    if (dx === 0) { dx = -gridSize; dy = 0; }
					directionChanged = true;
                    break;
                case 'ArrowRight':
                    if (dx === 0) { dx = gridSize; dy = 0; }
					directionChanged = true;
                    break;
            }
        }

        /**
         * Rysuje tło, węża i jedzenie.
         */
        function draw() {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = snakeColor;
            for (let segment of snake) {
                ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
            }

            ctx.fillStyle = foodColor;
            ctx.fillRect(food.x, food.y, gridSize, gridSize);

            if (isPaused) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = 'bold 32px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(t.pausedText, canvas.width / 2, canvas.height / 2);
            }
        }

        /**
         * Zamienia wartość z jednego zakresu na inny.
         */
        function mapRange(value, inMin, inMax, outMin, outMax) {
            return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        }
		
		function getContrastColor(hex) {
			const c = hex.replace('#', '');
			const r = parseInt(c.substr(0, 2), 16);
			const g = parseInt(c.substr(2, 2), 16);
			const b = parseInt(c.substr(4, 2), 16);
			const brightness = (r * 299 + g * 587 + b * 114) / 1000;
			return brightness > 128 ? '#000' : '#FFF';
		}
    });
});
