import React, { useCallback, useState } from "react";
import { Button } from "./button";
import { useInterval } from "./useInterval";
import { GridRenderer } from "./gridRenderer";
import { useSwipeable } from "react-swipeable";
import { Grid, Direction, Role } from "./grid";
import { DebugGrid } from "./debug/debugGrid";
import "./style/gridContainer.css";
import { WordTiles } from "./wordtiles";

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

    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Left || currentHeadDir === Direction.Right)
      return;
    gridObj.setCurrentHeadDirection(Direction.Left);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Left);
  };

  const onSwipedRight = () => {
    if (!playing) return;
    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Left || currentHeadDir === Direction.Right)
      return;
    gridObj.setCurrentHeadDirection(Direction.Right);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Right);
  };

  const onSwipedUp = () => {
    if (!playing) return;
    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Down || currentHeadDir === Direction.Up)
      return;
    gridObj.setCurrentHeadDirection(Direction.Up);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Up);
  };

  const onSwipedDown = () => {
    if (!playing) return;
    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Down || currentHeadDir === Direction.Up)
      return;
    gridObj.setCurrentHeadDirection(Direction.Down);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Down);
  };

  const calculateNewHead = (ends: typeof snakeEnds) => {
    /* ========================= HEAD ==============================*/
    const currentHeadRow = snakeEnds.head.row;
    const currentHeadCol = snakeEnds.head.col;
    const currentHeadDir = gridObj.getCurrentHeadDirection();

    grid[currentHeadRow][currentHeadCol].role = Role.Body; // make current head -> snake body
    grid[currentHeadRow][currentHeadCol].direction = Direction.None; // make current head's dir none

    // now calculate the new position (row, col) for head based on the current head direction.
    let newHeadRow = currentHeadRow;
    let newHeadCol = currentHeadCol;

    switch (currentHeadDir) {
      case Direction.Up: {
        newHeadRow =
          snakeEnds.head.row - 1 < 0 ? gridSize - 1 : snakeEnds.head.row - 1;
        break;
      }
      case Direction.Down: {
        newHeadRow =
          snakeEnds.head.row + 1 >= gridSize ? 0 : snakeEnds.head.row + 1;
        break;
      }
      case Direction.Right: {
        newHeadCol =
          snakeEnds.head.col + 1 >= gridSize ? 0 : snakeEnds.head.col + 1;
        break;
      }
      case Direction.Left: {
        newHeadCol =
          snakeEnds.head.col - 1 < 0 ? gridSize - 1 : snakeEnds.head.col - 1;
        break;
      }
      default: {
        setPlaying(false);
        throw new Error("Invalid head direction!");
      }
    }
    ends.head.row = newHeadRow;
    ends.head.col = newHeadCol;

    // check if new Head is a valid role
    switch (grid[newHeadRow][newHeadCol].role) {
      case Role.Canvas: {
        grid[newHeadRow][newHeadCol].role = Role.Head; // canvas -> head'
        break;
      }
      case Role.Byte: {
        console.log("Byte found!");
        break;
      }
      default:
        setPlaying(false);
        throw new Error("Head collision with invalid role");
    }

    grid[newHeadRow][newHeadCol].direction = currentHeadDir; // retain previous head's dir in the new head
  };

  const calculateNewTail = (ends: typeof snakeEnds) => {
    /* ========================= TAIL ==============================*/
    const currentTailRow = snakeEnds.tail.row;
    const currentTailCol = snakeEnds.tail.col;
    const pivotDir = grid[currentTailRow][currentTailCol].pivot;
    // override current tail direction if there is a pivot direction left behind by the head at some point.
    const currentTailDir =
      pivotDir !== Direction.None
        ? pivotDir
        : gridObj.getCurrentTailDirection();

    grid[currentTailRow][currentTailCol].role = Role.Canvas; // tail -> canvas
    grid[currentTailRow][currentTailCol].direction = Direction.None; // tail -> canvas dir

    if (pivotDir !== Direction.None)
      grid[currentTailRow][currentTailCol].pivot = Direction.None; // clear pivots as the tail arrives

    let newTailRow = currentTailRow;
    let newTailCol = currentTailCol;

    // now calculate the new position (row, col) for tail based on the current tail direction.
    switch (currentTailDir) {
      case Direction.Up: {
        newTailRow =
          snakeEnds.tail.row - 1 < 0 ? gridSize - 1 : snakeEnds.tail.row - 1;
        break;
      }
      case Direction.Down: {
        newTailRow =
          snakeEnds.tail.row + 1 >= gridSize ? 0 : snakeEnds.tail.row + 1;
        break;
      }
      case Direction.Right: {
        newTailCol =
          snakeEnds.tail.col + 1 >= gridSize ? 0 : snakeEnds.tail.col + 1;
        break;
      }
      case Direction.Left: {
        newTailCol =
          snakeEnds.tail.col - 1 < 0 ? gridSize - 1 : snakeEnds.tail.col - 1;
        break;
      }
      default: {
        setPlaying(false);
        throw new Error("Invalid tail direction!");
      }
    }

    ends.tail.row = newTailRow;
    ends.tail.col = newTailCol;
    grid[newTailRow][newTailCol].role = Role.Tail; // body -> tail
    grid[newTailRow][newTailCol].direction = currentTailDir;
  };

  // calcualte the new snake ends, and assign new roles as necessary
  const getNewEnds = (ends: typeof snakeEnds) => {
    calculateNewTail(ends);
    calculateNewHead(ends);
    return ends;
  };

  const onTick = () => {
    let ends = { ...snakeEnds };
    // set new roles on the new ends
    const newEnds = getNewEnds(ends);
    setSnakeEnds(newEnds);
    // set new ends
    gridObj.getSnake().setSnakeEnds(ends);
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

  const handlers = useSwipeable({
    onSwipedLeft: onSwipedLeft,
    onSwipedRight: onSwipedRight,
    onSwipedDown: onSwipedDown,
    onSwipedUp: onSwipedUp,
    // onTap: onTick,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const currentTailPivot = gridObj.getPivotDirectionOnCurrentTail();

  return (
    <div {...handlers} className={"game"}>
      <div className={"gridContainer"}>
        {debug ? (
          <DebugGrid grid={grid} />
        ) : (
          <GridRenderer
            grid={grid}
            currentHeadDirection={gridObj.getCurrentHeadDirection()}
            currentTailDirection={gridObj.getCurrentTailDirection()}
            currentTailPivot={currentTailPivot}
          />
        )}
      </div>
      <div className={"appUtils"}>
        {
          <Button
            onClick={handleOnPlayPauseGame}
            label={playing ? "Pause" : "Play"}
          />
        }
        {isDebugMode() ? (
          <Button
            onClick={handleOnDebug}
            label={debug ? "Debug Off" : "Debug On"}
          />
        ) : null}
      </div>
      <WordTiles />
    </div>
  );
};