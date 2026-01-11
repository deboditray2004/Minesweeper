import Cell from "../Cell/Cell";
/*<Grid board={board} won={isGameWon} leftClickHandler={handleLeftClick}  rightClickHandler={handleRightClick}/> */
export default function Grid({
  board,
  leftClickHandler,
  rightClickHandler,
  won,
  isGamePaused
}) {
    if (!board.length) return null;
  return (
    <div
      className="grid gap-0.5"
      style={{
        gridTemplateRows: `repeat(${board.length}, 1fr)`,
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`
      }}
    >
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell
            key={`${r}-${c}`}
            cell={cell}
            leftClickHandler={leftClickHandler}
            rightClickHandler={rightClickHandler}
            won={won}
            isGamePaused={isGamePaused}
          />
        ))
      )}
    </div>
  );
}
