import React from 'react'

function Cell(props) {
    return (
        <button 
        onClick={()=>props.leftClickHandler(props.cell)} 
        onContextMenu={
            (e)=>{
                e.preventDefault();
                props.rightClickHandler(props.cell);
            }}
        className={`font-[Monocraft] w-8 h-8 text-[18px] border-2 border-[#333] flex items-center justify-center select-none transition-colors duration-200 ${props.isGamePaused? "bg-[#444] cursor-not-allowed":props.cell.isClicked ? props.cell.isMine ? props.won !== null ? props.won ? "bg-green-500 cursor-default" : "bg-red-500 cursor-default" : "bg-[#aaa] cursor-default": "bg-[#aaa] cursor-default": "bg-[#444] cursor-pointer hover:bg-[#555]"}`}>

            {props.isGamePaused? "" : props.cell.isClicked ? props.cell.isMine ? "💣" : props.cell.adjMines || "" : props.cell.isFlagged ? "🚩" : "" }
        </button>
    );
}
export default React.memo(Cell);


/*
        isClicked?
          /    \
        yes     no
        |        |
    isMine?   isFlagged?
      /   \      /   \
    💣  number  🚩   ""


*/

/*
${
  props.cell.isClicked
    ? props.cell.isMine
      ? props.won !== null
        ? props.won
          ? "bg-green-500 cursor-default"  // game won, mine shows green
          : "bg-red-500 cursor-default"    // game lost, mine shows red
        : "bg-[#aaa] cursor-default"        // normal clicked non-mine
      : "bg-[#aaa] cursor-default"        // clicked number cell
    : "bg-[#444] cursor-pointer hover:bg-[#555]" // unclicked
}`}

*/

