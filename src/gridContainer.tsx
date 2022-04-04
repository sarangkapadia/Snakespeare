import React, { useCallback, useState } from "react";
import { Score } from "./score";
import { Button } from "./button";
import { useInterval } from "./useInterval";
import { GridRenderer } from "./gridRenderer";
import { useSwipeable } from "react-swipeable";
import { Grid, Direction, Role } from "./grid";
import { DebugGrid } from "./debug/debugGrid";

const root = document.querySelector(":root")!;
const rootStyle = getComputedStyle(root);

const tickCount = rootStyle.getPropertyValue("--tick");
const tickCountMs =
  parseFloat(tickCount.substr(0, tickCount.length - 1)) * 1000;

const url: URL = new URL(window.location.href);
const urlSearchParams = new URLSearchParams(url.search);

const gridObj = new Grid();
gridObj.initGridData();

const gridSize = gridObj.getGridSize();
const grid = gridObj.getGrid();

export const GridContainer: React.FunctionComponent = () => {
  const [snakeEnds, setSnakeEnds] = useState(gridObj.getSnake().getSnakeEnds());
  const [playing, setPlaying] = useState(false);
  const [debug, setDebug] = useState(false);

  // add logic in these to detect game end
  const onSwipedLeft = () => {
    if (!playing) return;
    gridObj.setCurrentHeadDirection(Direction.Left);
  };
  const onSwipedRight = () => {
    if (!playing) return;
    gridObj.setCurrentHeadDirection(Direction.Right);
  };
  const onSwipedUp = () => {
    if (!playing) return;
    gridObj.setCurrentHeadDirection(Direction.Up);
  };
  const onSwipedDown = () => {
    if (!playing) return;
    gridObj.setCurrentHeadDirection(Direction.Down);
  };

  const handlers = useSwipeable({
    onSwipedLeft: onSwipedLeft,
    onSwipedRight: onSwipedRight,
    onSwipedDown: onSwipedDown,
    onSwipedUp: onSwipedUp,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // calcualte the new snake ends, and assign new roles as necessary
  const getNewEnds = (ends: typeof snakeEnds) => {
    let newCol = snakeEnds.head.col;
    let newRow = snakeEnds.head.row;
    const currentHeadDir = gridObj.getCurrentHeadDirection();

    grid[newRow][newCol].role = Role.Body; // make current head -> snake body
    grid[newRow][newCol].direction = Direction.None; // make current head's dir none

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
      default: {
        setPlaying(false);
        throw new Error("Invalid head direction!");
      }
    }
    ends.head.row = newRow;
    ends.head.col = newCol;

    grid[newRow][newCol].role = Role.Head; // canvas -> head
    grid[newRow][newCol].direction = currentHeadDir; // retain previous head's dir in the new head

    const currentTailDir = gridObj.getCurrentTailDirection();
    grid[snakeEnds.tail.row][snakeEnds.tail.col].role = Role.Canvas; // tail -> canvas
    grid[snakeEnds.tail.row][snakeEnds.tail.col].direction = Direction.None; // tail -> canvas dir

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
      default: {
        setPlaying(false);
        throw new Error("Invalid tail direction!");
      }
    }

    ends.tail.row = newRow;
    ends.tail.col = newCol;
    grid[newRow][newCol].role = Role.Tail; // body -> tail
    grid[newRow][newCol].direction = currentTailDir;

    return ends;
  };

  const onTick = () => {
    let ends = { ...snakeEnds };
    // set new roles on the new ends
    const newEnds = getNewEnds(ends);
    setSnakeEnds(newEnds);
    // set new ends
    gridObj.getSnake().setSnakeEnds(newEnds);
  };

  useInterval(
    onTick,
    // Delay in milliseconds or null to stop it
    playing ? tickCountMs : null
  );

  const handleOnPlayPauseGame = useCallback(() => {
    if (!playing) {
      const currentTailDir = gridObj.getCurrentTailDirection();
      const currentHeadDir = gridObj.getCurrentHeadDirection();
      // on hitting play
      if (
        currentHeadDir === Direction.None &&
        currentTailDir === Direction.None
      ) {
        gridObj.setCurrentTailDirection(Direction.Down);
        gridObj.setCurrentHeadDirection(Direction.Down);
      }
    }

    setPlaying((playing) => !playing);
  }, [playing]);

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
        <GridRenderer
          grid={grid}
          currentHeadDirection={gridObj.getCurrentHeadDirection()}
        />
      )}
      <div className={"appUtils"}>
        <Score currentScore={0}></Score>
        <Button
          onClick={handleOnPlayPauseGame}
          label={playing ? "Pause" : "Play"}
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
