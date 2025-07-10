let board = [];
let rows, columns, minesCount, flagsLeft;
let minesLocation = [];
let tilesClicked = 0;
let gameOver = false;
let gamePause=false;
let timer = 0;
let timerInterval;

window.onload = () => {
    const container = document.querySelector(".game-container");
    rows = parseInt(container.dataset.rows);
    columns = parseInt(container.dataset.columns);
    minesCount = parseInt(container.dataset.mines);
    flagsLeft = minesCount;

    document.getElementById("mines-count").innerText = flagsLeft;
    document.getElementById("flags-left").innerText = flagsLeft;
    document.getElementById("restart-button").addEventListener("click", restartGame);
    document.getElementById("pause-button").addEventListener("click", pauseTimer);
    setMines();
    setupBoard();
    startTimer();
};

function setMines() {
    while (minesLocation.length < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let rc = r+"-"+c;
        if (!minesLocation.includes(rc)) {
            minesLocation.push(rc);
        }
    }
}

function setupBoard() {
    const boardElem = document.getElementById("board");
    boardElem.style.gridTemplateColumns = `repeat(${columns}, 32px)`;
    boardElem.innerHTML = "";
    board = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("button");
            tile.id = r+"-"+c;
            tile.addEventListener("click", handleLeftClick);
            tile.addEventListener("contextmenu", handleRightClick);
            boardElem.appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function startTimer() {
    if (timerInterval) return;
    document.getElementById("timer").innerText = timer;

    timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timer").innerText = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);

}

function pauseTimer() {
    const pauseBtn=this;
    
    if(pauseBtn.classList.contains("btn-clicked"))
    {
        startTimer();
        gamePause=false;
        pauseBtn.classList.remove("btn-clicked");
    }
    else
    {
        clearInterval(timerInterval);
        timerInterval = null;
        pauseBtn.classList.add("btn-clicked");
        gamePause = true;
    }

}

function handleLeftClick() {
    if (gamePause || gameOver || this.classList.contains("tile-clicked")) return;

    const tile = this;

    // 🟥 If flagged, remove flag on left-click
    if (tile.innerText === "🚩") {
        tile.innerText = "";
        flagsLeft++;
        document.getElementById("mines-count").innerText = flagsLeft;
        document.getElementById("flags-left").innerText = flagsLeft
        return;
    }

    const id = tile.id;

    if (minesLocation.includes(id)) {
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
        endGame(false);
    } else {
        const [r, c] = id.split("-").map(Number);
        revealTile(r, c);
    }
}


function handleRightClick(e) {
    e.preventDefault();
    if (gamePause || gameOver || this.classList.contains("tile-clicked")) return;

    const tile = this;

    if (tile.innerText === "🚩") {
        tile.innerText = "";
        flagsLeft++;
    } else if (tile.innerText === "" && flagsLeft > 0) {
        tile.innerText = "🚩";
        flagsLeft--;
    }

    document.getElementById("flags-left").innerText = flagsLeft;
}



function revealTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return;

    const tile = board[r][c];
    if (tile.classList.contains("tile-clicked") || tile.innerText === "🚩") return;

    tile.classList.add("tile-clicked");
    tilesClicked++;

    const count = countAdjacentMines(r, c);
    if (count > 0) {
        tile.innerText = count;
        tile.classList.add(`x${count}`);
    } else {
        tile.innerText = "";
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr !== 0 || dc !== 0) revealTile(r + dr, c + dc);
            }
        }
    }

    if (tilesClicked === rows * columns - minesCount) endGame(true);
}

function countAdjacentMines(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < columns) {
                if (minesLocation.includes(nr+"-"+nc)) count++;
            }
        }
    }
    return count;
}

function endGame(won) {
    gameOver = true;
    stopTimer();
    document.getElementById("mines-count").innerText = won ? "Cleared" : "Game Over";

    for (const id of minesLocation) {
        const tile = document.getElementById(id);
        if (!tile.classList.contains("tile-clicked")) {
            tile.innerText = "💣";
            tile.style.backgroundColor = won ? "green" : "red";
        }
    }
}


function restartGame() {
    stopTimer();

    // Reset all game state
    board = [];
    minesLocation = [];
    tilesClicked = 0;
    gameOver = false;
    flagEnabled = false;
    timer = 0;
    timerInterval = null;

    // Re-read settings
    const container = document.querySelector(".game-container");
    rows = parseInt(container.dataset.rows);
    columns = parseInt(container.dataset.columns);
    minesCount = parseInt(container.dataset.mines);
    flagsLeft = minesCount;

    // Update UI
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flags-left").innerText = flagsLeft;
    document.getElementById("timer").innerText = "0";
    timer=0;
    // Reinitialize game
    setMines();
    setupBoard();
    startTimer();
}
