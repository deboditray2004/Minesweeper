//board var
let minesCount,flagLeft,rows,cols;
let minesLocation=new Set(),board=[];
let blocksClicked=[];
//time var
let timer=null;
let time=0;
//game state
let isGamePaused=false;
let isGameOver=false;
let won=false;
let firstClick=true;

window.addEventListener('load',readSettings);

function readSettings()
{
    const gameCont=document.querySelector(".game-container");
    minesCount=parseInt(gameCont.getAttribute("data-mines"));
    flagLeft=minesCount;

    rows=parseInt(gameCont.getAttribute("data-rows"));
    cols=parseInt(gameCont.getAttribute("data-columns"));
    const restartBtn=document.querySelector("#restart-button");
    restartBtn.addEventListener('click',restart);
    const pauseBtn=document.querySelector("#pause-button");
    pauseBtn.addEventListener('click',pauseTimer);


    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flags-left").innerText = flagLeft;
    document.getElementById("timer").innerText = "0";

    setupBoard();

}
function minesLoc(id)
{
    const [r,c]= id.split(" ").map(Number);
    const forbidden = new Set();
    for (let dr = -1; dr <= 1; dr++)
    {
        for (let dc = -1; dc <= 1; dc++)
        {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols)
            {
                forbidden.add(`${nr} ${nc}`);
            } 
        }
    }
    let count=0;
    while(count<minesCount)
    {
        let i=Math.floor(Math.random() * (rows));//Math.floor(Math.random() * (max - min + 1)) + min; here max is row-1,min is  0
        let j=Math.floor(Math.random() * (cols));
        let coordinates=i+" "+j;
        if (!minesLocation.has(coordinates) && !forbidden.has(coordinates))
        {
            count++;
            minesLocation.add(coordinates);
        }
    }
}
function setupBoard()
{
    
    const gameBoard=document.querySelector(".board");
    gameBoard.style.gridTemplateColumns=`repeat(${cols},32px)`;
    gameBoard.innerHTML = "";
    board=[]
    for(let i=0;i<rows;i++)
    {
        let row=[]
        for(let j=0;j<cols;j++)
        {
            const block=document.createElement("button");
            block.setAttribute("id",i+" "+j);
            block.setAttribute("isClicked","false");
            block.addEventListener('click',handleLeftClick);
            block.addEventListener('contextmenu',handleRightClick);
            gameBoard.appendChild(block);
            row.push(block);
        }
        board.push(row);
    }
}

function startTimer()
{
    getTimer=document.querySelector("#timer");

    timer=setInterval(()=>{
        time++;
        getTimer.innerText=time;
    },1000)
}

function stopTimer()
{
    clearInterval(timer);
    timer=null;
}


function pauseTimer()
{
    if(isGameOver)
        return;
    if(isGamePaused)//game is paused
    {
        isGamePaused=false;
        startTimer();
        document.querySelector("#pause-button").innerText="❚❚";
        for(const block of blocksClicked)
        {
            block.setAttribute("isClicked","true");
            block.innerText=block.getAttribute("val");
        }
    }
    else //game is running
    {
        isGamePaused=true;
        stopTimer();
        document.querySelector("#pause-button").innerText="▶";
        for(const block of blocksClicked)
        {
            block.setAttribute("isClicked","false");
            block.setAttribute("val",block.innerText);
            block.innerText="";
        }
    }
}


function handleLeftClick()
{
    const block=this;
    const id=block.getAttribute("id");
    if(isGameOver || isGamePaused || block.getAttribute("isClicked")=="true") return; //cases where clicking on a tile has no effect
    if(firstClick)
    {
        firstClick=false;
        minesLoc(id);
        revealBlock(id);
        startTimer();
        return;
    }
    //tile has a flag
    if(block.innerText==="🚩")
    {
        block.innerText="";
        flagLeft++;
        document.querySelector("#flags-left").innerText=flagLeft;
        return;
    }
    
    if(minesLocation.has(id))
    {
        revealAllBombs();
    }
    else
    {
        revealBlock(id);
    }
}

function handleRightClick(event)
{
    event.preventDefault();
    const block=this;
    if(isGameOver || isGamePaused || block.getAttribute("isClicked")=="true") return; //cases where clicking on a tile has no effect
    //tile has a flag
    if(block.innerText==="🚩")
    {
        block.innerText="";
        flagLeft++;
        document.querySelector("#flags-left").innerText=flagLeft;
        return;
    }
    //placing a flag
    if(block.innerText==="" && flagLeft>0)
    {
        block.innerText="🚩";
        flagLeft--;
        document.querySelector("#flags-left").innerText=flagLeft;
        return;
    }
}


function revealAllBombs()
{
    for(const id of minesLocation)
    {
        const bombBlock=document.getElementById(id);
        bombBlock.innerText = "💣";
        bombBlock.style.backgroundColor = won ? "green" : "red";
    }
    gameOverMessage();
}

function gameOverMessage()
{
    isGameOver=true;
    stopTimer();
    const footer=document.querySelector(".footer");
    footer.innerText= won ? "YOU WIN !" : "YOU LOST !";
    footer.style.textAlign="center";
    footer.style.fontSize="100px";
}



function revealBlock(id)
{
    const [r,c]= id.split(" ").map(Number);
    const block=board[r][c];
    let adjMines=countAdjacentMines(r,c);
    if(adjMines==0)
    {
        let q=[]
        q.push([r,c]);
        while(q.length!=0)
        {
            const [cr,cc]=q.shift();
            const block=board[cr][cc];
            if(block.innerText==="🚩" || block.getAttribute("isClicked")=="true")
                continue;
            if(countAdjacentMines(cr,cc)>0)
            {
                block.innerText=countAdjacentMines(cr,cc);
                block.setAttribute("isClicked","true");
                blocksClicked.push(block);
                continue;
            }
            block.setAttribute("isClicked","true");
            blocksClicked.push(block);
            for (let dr = -1; dr <= 1; dr++) 
            {
                for (let dc = -1; dc <= 1; dc++) 
                {
                    const nr = cr + dr, nc = cc + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols)
                    {
                        q.push([nr,nc]);
                    }
                }
            }
        }
    }
    else
    {
        block.innerText=adjMines;
        block.setAttribute("isClicked","true");
        blocksClicked.push(block);
    }
    if (blocksClicked.length === rows * cols - minesCount)
    {
        won=true;
        revealAllBombs();
    }
}
function countAdjacentMines(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (minesLocation.has(nr+" "+nc)) count++;
            }
        }
    }
    return count;
}


function restart() {
    stopTimer();
    const footer=document.querySelector(".footer");
    footer.innerText= "";
    document.querySelector("#pause-button").innerText="❚❚";
    //board var
    minesCount=0,flagLeft=0,rows=0,cols=0;
    minesLocation=new Set(),board=[];
    blocksClicked=[];
    //time var
    timer=null;
    time=0;
    //game state
    isGamePaused=false;
    isGameOver=false;
    won=false;
    firstClick=true;

    // Re-read settings
    readSettings();

}