import React, { useCallback, useRef, useState,useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Grid from '../Grid/Grid';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
export default function Game(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const rows = Number(searchParams.get("rows"));
    const cols = Number(searchParams.get("cols"));
    const minesCount = Number(searchParams.get("mines"));

    if (!rows || !cols || !minesCount)
    return <div><Footer msg="Invalid Game Config"></Footer></div>;

    const [gameOverMessage,setGameOverMessage]=useState("");
    const [board,setBoard]=useState([]);
    const [time, setTime] = useState(0);
    const [flagLeft,setFlagLeft]=useState(minesCount);
    const [isGamePaused,setIsGamePaused]=useState(false);

    const timerRef = useRef(null);
    const blocksClicked = useRef([]);
    const clickLockRef = useRef(false);
    const blocksClickedCount= useRef(0);
    const isGameOver= useRef(false);
    const isGameWon= useRef(false);
    const isFirstClick= useRef(true);
    

    useEffect(()=>
    {
        let brd=[]
        for(let i=0;i<rows;i++)
        {
            let row=[]
            for(let j=0;j<cols;j++)
            {
                let cell={
                    row:i,
                    col:j,
                    key:i+" "+j,
                    isMine:false,
                    isFlagged:false,
                    adjMines:0,
                    isClicked:false,
                };
                row.push(cell);
            }
            brd.push(row);
        }

        setBoard(brd);
    },[rows,cols]);

    const generateBoard=useCallback(
        (minesLocation,i,j)=>{
            setBoard((prevBoard)=>
            {
                const newBoard = prevBoard.map(row =>
                row.map(c => ({ ...c })));
                for(let r=0;r<rows;r++)
                {
                    for(let c=0;c<cols;c++)
                    {
                        let count = 0;
                        for (let dr = -1; dr <= 1; dr++) {
                            for (let dc = -1; dc <= 1; dc++) {
                                if (dr === 0 && dc === 0) continue;
                                const nr = r + dr, nc = c + dc;
                                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                                    if (minesLocation.has(nr+" "+nc)) count++;
                                }
                            }
                        }
                            
                        newBoard[r][c].adjMines=count;
                        newBoard[r][c].isMine=minesLocation.has(r+" "+c);
                    }
                }

                let count=0;
                let q=[]
                q.push([i,j]);
                while(q.length!=0)
                {
                    const [cr,cc]=q.shift();
                    const ctarget=newBoard[cr][cc];
                    if(ctarget.isClicked)
                        continue;
                    count++;
                    ctarget.isClicked=true;
                    if(ctarget.adjMines>0)
                    continue;
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
                blocksClickedCount.current+=count;

                return newBoard;
            });
        }
    ,[rows,cols]);

    const startTimer=useCallback(
        ()=>
        {
            if(timerRef.current!==null) return;
            timerRef.current=setInterval(()=>{
                setTime(prev=>prev+1);
            },1000)
        }
    ,[]);

    const stopTimer=useCallback(
        ()=>
        {
            if(timerRef.current!==null)
            {
                clearInterval(timerRef.current);
                timerRef.current=null;
            }
        }
    ,[]);

    const generateMines = useCallback(
        (cr, cc) => {

            const forbidden = new Set();
            for (let dr = -1; dr <= 1; dr++)
            {
                for (let dc = -1; dc <= 1; dc++)
                {
                    const nr = cr + dr, nc = cc + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols)
                    {
                        forbidden.add(`${nr} ${nc}`);
                    } 
                }
            }
            let minesLocation=new Set();
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
            generateBoard(minesLocation,cr,cc);
        }
    ,[rows,cols,minesCount,generateBoard]);

    const gameOver=useCallback(
        ()=>
        {
            isGameOver.current=true;
            stopTimer();
            setGameOverMessage( isGameWon.current ? "YOU WIN !" : "YOU LOST !");
        }
    ,[stopTimer]);

    const revealAllBombs=useCallback(
        ()=>{
            setBoard(prevBoard => {
                const newBoard = prevBoard.map(row =>
                row.map(c => ({ ...c }))
                );
                for(let i=0;i<rows;i++)
                {
                    for(let j=0;j<cols;j++ )
                    {
                        const target = newBoard[i][j];
                        if(target.isMine)
                        {
                            target.isClicked=true;
                        }
                    }
                }
                return newBoard; 
            });
            gameOver();
        }
    ,[rows,cols,gameOver]);

    const revealBlock=useCallback(
        (cell)=>{
            let count=0;
            setBoard(prevBoard => {
                const newBoard = prevBoard.map(row =>
                row.map(c => ({ ...c })));
                const target = newBoard[cell.row][cell.col];
                if(target.adjMines==0)
                {
                    let q=[]
                    let r=target.row;
                    let c=target.col;
                    q.push([r,c]);
                    while(q.length!=0)
                    {
                        const [cr,cc]=q.shift();
                        const ctarget=newBoard[cr][cc];
                        if(ctarget.isFlagged || ctarget.isClicked)
                            continue;
                        ctarget.isClicked = true;
                        count++;
                        if(ctarget.adjMines>0)
                            continue;
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
                    if (!target.isClicked) {
                        target.isClicked = true;
                        count++;
                    }
                }
                return newBoard;
            });
            blocksClickedCount.current+=count;
            if (blocksClickedCount.current === rows * cols - minesCount) {
                isGameWon.current=true;
                revealAllBombs();
            }
        }
    ,[rows,cols,revealAllBombs,minesCount]);

    const handleLeftClick=useCallback(
    (cell)=>
    {
        if (clickLockRef.current) return;
        clickLockRef.current = true;

        if (!isGamePaused && isFirstClick.current) 
        {
            generateMines(cell.row, cell.col); // exclude first cell + neighbors
            isFirstClick.current=false;
            startTimer();
            return;
        }
        if(isGameOver.current || isGamePaused || cell.isClicked || cell.isFlagged) 
        {
            clickLockRef.current = false;
            return ;
        } 
        if(cell.isMine)
        {
            revealAllBombs();
            return ;
        }
        else
        {
            revealBlock(cell);
            return ;
        }

    },[isGamePaused,revealAllBombs,revealBlock,generateMines,startTimer]);

    useEffect(() => {
        clickLockRef.current = false;
    }, [board]);

    const handleRightClick=useCallback(
    (cell)=>
    {
    
        //cases where clicking on a tile has no effect
        if(isGameOver.current || isGamePaused || cell.isClicked) return;
        let c=0;
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row =>
            row.map(c => ({ ...c }))
            );

            const target = newBoard[cell.row][cell.col];
            if(target.isFlagged)
            {
                target.isFlagged=false;
                c=1;
                return newBoard;
            }
            //placing a flag
            if( flagLeft>0)
            {
                target.isFlagged=true;
                c=-1;
                return newBoard;
            }

            return newBoard;
        });

        setFlagLeft(prev=>prev+c);

    },[isGamePaused,flagLeft]);
  
    const pauseTimer=useCallback(
        ()=>{
                if(isGameOver.current)
                return ;
                if(isGamePaused)//game is paused
                {
                    setIsGamePaused(false);
                    startTimer();
                }
                else //game is running
                {
                    setIsGamePaused(true);
                    stopTimer();
                }
            
        }
    ,[stopTimer,startTimer,isGamePaused]);

    const restart=useCallback(()=>
    {
        /*
        const [gameOverMessage,setGameOverMessage]=useState("");
        const [board,setBoard]=useState();
        const [flagLeft,setFlagleft]=useState(mines);
        const [isGameOver,setIsGameOver]= useState(false);
        const [isGameWon,setIsGameWon]= useState(false);
        const [isGamePaused,setIsGamePaused]= useState(false);
        const [isFirstClick, setIsFirstClick] = useState(true);
        const [time, setTime] = useState(0);
        const timerRef = useRef(null);
        const blocksClicked = useRef([]);
        const clickLockRef = useRef(false);
        const blocksClickedCount= useRef(0);
        */
        let brd=[]
        for(let i=0;i<rows;i++)
        {
            let row=[]
            for(let j=0;j<cols;j++)
            {
                let cell={
                    row:i,
                    col:j,
                    key:i+" "+j,
                    isMine:false,
                    isFlagged:false,
                    adjMines:0,
                    isClicked:false,
                };
                row.push(cell);
            }
            brd.push(row);
        }
        setGameOverMessage("");
        setBoard(brd);
        stopTimer();
        setTime(0);
        setFlagLeft(minesCount);
        setIsGamePaused(false);
        timerRef.current=null;
        blocksClicked.current=[];
        clickLockRef.current=false;
        blocksClickedCount.current=0;
        isGameOver.current=false;
        isGameWon.current=false;
        isFirstClick.current=true;

    },[stopTimer]);

    return (
        <div className="flex flex-col items-center">
            <Header m={minesCount} f={flagLeft} t={time} restartHandler={restart} pauseHandler={pauseTimer} isGamePaused={isGamePaused}/>
            <Grid board={board} won={isGameWon.current} leftClickHandler={handleLeftClick}  rightClickHandler={handleRightClick} isGamePaused={isGamePaused}/>
            <Footer msg={gameOverMessage}/>
        </div>
    );
}

/*
The URLSearchParams interface defines utility methods to work with the query string of a URL.

URLSearchParams objects are iterable, so they can directly be used in a for...of
structure to iterate over key/value pairs in the same order as they appear in the query string, 
example the following two lines are equivalent:


for (const [key, value] of searchParams)
{
}
for (const [key, value] of searchParams.entries())
{
}

https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
*/


/*
useRef is like a box where you can store something for later use. 
A number, an object, anything you want.

What is useRef for? When should I use it?
The thing you save in this box is preserved between renders, similar to useState. 
In other words, the box is not destroyed when your component is updated.

And when you change the box content, nothing happens to the component.
The box content changes, but the component remains the same.

Observations:
Unlike component state variables (useState), updating a ref value doesn’t trigger a new render.
*/