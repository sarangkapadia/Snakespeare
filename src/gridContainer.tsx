import React, { useCallback, useState } from "react";
import { Score } from "./score";
import { Button } from "./button";
import { useInterval } from "./useInterval";
import { GridRenderer } from "./gridRenderer";
import { useSwipeable } from "react-swipeable";
import { Grid, Direction } from "./grid";

const gridObj = new Grid();
gridObj.initGridData();
let gridSize = gridObj.getGridSize();

// init the grid
let grid: string[][] = Array.from(Array(gridSize), () =>
  new Array(gridSize).fill("b")
);
grid[5][5] = "t";
grid[6][5] = grid[7][5] = "s";
grid[8][5] = "h";

let currentHeadDir = gridObj.getCurrentHeadDirection();
let currentTailDir = gridObj.getCurrentTailDirection();

// add logic in these to detect game end
const onSwipedLeft = () => {
  currentHeadDir = Direction.Left;
};
const onSwipedRight = () => {
  currentHeadDir = Direction.Right;
};
const onSwipedUp = () => {
  currentHeadDir = Direction.Up;
};
const onSwipedDown = () => {
  currentHeadDir = Direction.Down;
};

export const GridContainer: React.FunctionComponent = () => {
  const [snakeEnds, setSnakeEnds] = useState(gridObj.getSnake().getSnakeEnds());
  const [playing, setPlaying] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: onSwipedLeft,
    onSwipedRight: onSwipedRight,
    onSwipedDown: onSwipedDown,
    onSwipedUp: onSwipedUp,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const getNewEnds = (ends: typeof snakeEnds) => {
    let newCol = snakeEnds.head.col;
    let newRow = snakeEnds.head.row;
    grid[newRow][newCol] = "s"; // make current head -> snake

    switch (currentHeadDir) {
      case Direction.Up: {
        newRow =
          snakeEnds.head.row - 1 < 0 ? gridSize - 1 : snakeEnds.head.row - 1;
        break;
      }
      case Direction.Down: {
        newRow =
          snakeEnds.head.row + 1 >= gridSize ? 0 : snakeEnds.head.row + 1;
        break;
      }
      case Direction.Right: {
        newCol =
          snakeEnds.head.col + 1 >= gridSize ? 0 : snakeEnds.head.col + 1;
        break;
      }
      case Direction.Left: {
        newCol =
          snakeEnds.head.col - 1 < 0 ? gridSize - 1 : snakeEnds.head.col - 1;
        break;
      }
      default:
        throw new Error("Invalid head direction!");
    }
    ends.head.row = newRow;
    ends.head.col = newCol;

    grid[newRow][newCol] = "h"; // b -> h
    grid[snakeEnds.tail.row][snakeEnds.tail.col] = "b"; // t -> b

    newCol = snakeEnds.tail.col;
    newRow = snakeEnds.tail.row;

    switch (currentTailDir) {
      case Direction.Up: {
        newRow =
          snakeEnds.tail.row - 1 < 0 ? gridSize - 1 : snakeEnds.tail.row - 1;
        break;
      }
      case Direction.Down: {
        newRow =
          snakeEnds.tail.row + 1 >= gridSize ? 0 : snakeEnds.tail.row + 1;
        break;
      }
      case Direction.Right: {
        newCol =
          snakeEnds.tail.col + 1 >= gridSize ? 0 : snakeEnds.tail.col + 1;
        break;
      }
      case Direction.Left: {
        newCol =
          snakeEnds.tail.col - 1 < 0 ? gridSize - 1 : snakeEnds.tail.col - 1;
        break;
      }
      default:
        throw new Error("Invalid tail direction!");
    }

    ends.tail.row = newRow;
    ends.tail.col = newCol;
    grid[newRow][newCol] = "t"; // s -> t

    return ends;
  };

  const onTick = () => {
    let ends = { ...snakeEnds };
    setSnakeEnds(getNewEnds(ends));
  };

  useInterval(
    onTick,
    // Delay in milliseconds or null to stop it
    playing ? 600 : null
  );

  const handleOnNewGame = useCallback(() => {
    setPlaying((playing) => !playing);
  }, []);

  return (
    <div {...handlers}>
      <GridRenderer grid={grid} currentHeadDirection={currentHeadDir} />
      <div className={"appUtils"}>
        <Score currentScore={0}></Score>
        <Button
          onClick={handleOnNewGame}
          label={playing ? "Stop Game" : "New Game"}
        />
      </div>
    </div>
  );
};
