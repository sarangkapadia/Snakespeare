import React, { useCallback, useState } from "react";
import { Score } from "./score";
import { Button } from "./button";
import { useInterval } from "./useInterval";
import { GridRenderer } from "./gridRenderer";
import { useSwipeable } from "react-swipeable";
import { Grid, Direction, Role } from "./grid";
import { DebugGrid } from "./debug/debugGrid";

const url: URL = new URL(window.location.href);
const urlSearchParams = new URLSearchParams(url.search);

const gridObj = new Grid();
gridObj.initGridData();

const gridSize = gridObj.getGridSize();
const grid = gridObj.getGrid();

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
  const [debug, setDebug] = useState(false);

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
    grid[newRow][newCol].role = Role.Body; // make current head -> snake

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

    grid[newRow][newCol].role = Role.Head; // b -> h
    grid[snakeEnds.tail.row][snakeEnds.tail.col].role = Role.Canvas; // t -> b

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
    grid[newRow][newCol].role = Role.Tail; // s -> t

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

  const handleOnDebug = useCallback(() => {
    setDebug((debug) => !debug);
  }, []);

  const isDebugMode = () => {
    return urlSearchParams.get("debug") === "true";
  };

  return (
    <div {...handlers}>
      {debug ? (
        <DebugGrid grid={grid} />
      ) : (
        <GridRenderer grid={grid} currentHeadDirection={currentHeadDir} />
      )}
      <div className={"appUtils"}>
        <Score currentScore={0}></Score>
        <Button
          onClick={handleOnNewGame}
          label={playing ? "Stop Game" : "New Game"}
        />
        {isDebugMode() ? (
          <Button
            onClick={handleOnDebug}
            label={debug ? "Debug Off" : "Debug On"}
          />
        ) : null}
      </div>
    </div>
  );
};
