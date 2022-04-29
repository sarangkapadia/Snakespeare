import React, { useCallback, useEffect, useRef, useState } from "react";
//import { Button } from "./button";
import { useInterval } from "./useInterval";
import { GridRenderer } from "./gridRenderer";
import { useSwipeable } from "react-swipeable";
import { Grid, Direction, Role } from "./grid";
import { DebugGrid } from "./debug/debugGrid";
import "./style/gridContainer.css";
import { WordTiles } from "./wordtiles";

// move this to a useEffect
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

const pointsPerWord = 10;
let score = 0;
let currentLetter = "";
const hintTimeoutMs = 14 * 1000;

interface IGridContainer {
  modalTitle: string;
}
export const GridContainer: React.FunctionComponent<IGridContainer> = (
  props
) => {
  const { modalTitle } = props;
  const [snakeEnds, setSnakeEnds] = useState(gridObj.getSnake().getSnakeEnds());
  const [playing, setPlaying] = useState(false);
  const [debug, setDebug] = useState(false);

  let movePending = false;
  const hints = localStorage.getItem("hints");
  const hintsOn = hints ? JSON.parse(hints) : "true";
  let hintsTimeOutId: any = useRef(null);
  let startDate: any = useRef(null);
  // add logic in these to detect game end
  const onSwipedLeft = () => {
    if (movePending) return;

    if (!playing) {
      handleOnPlayPauseGame();
      return;
    }

    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Left || currentHeadDir === Direction.Right)
      return;
    gridObj.setCurrentHeadDirection(Direction.Left);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Left);
    movePending = true;
  };

  const onSwipedRight = () => {
    if (movePending) return;
    if (!playing) {
      handleOnPlayPauseGame();
      return;
    }
    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Left || currentHeadDir === Direction.Right)
      return;
    gridObj.setCurrentHeadDirection(Direction.Right);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Right);
    movePending = true;
  };

  const onSwipedUp = () => {
    if (movePending) return;
    if (!playing) {
      handleOnPlayPauseGame();
      return;
    }
    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Down || currentHeadDir === Direction.Up)
      return;
    gridObj.setCurrentHeadDirection(Direction.Up);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Up);
    movePending = true;
  };

  const onSwipedDown = () => {
    if (movePending) return;
    if (!playing) {
      handleOnPlayPauseGame();
      return;
    }
    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Down || currentHeadDir === Direction.Up)
      return;
    gridObj.setCurrentHeadDirection(Direction.Down);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Down);
    movePending = true;
  };

  const resetGameToStart = (ends: typeof snakeEnds) => {
    currentLetter = gridObj.getCurrentBytes().toUpperCase();

    setPlaying(false);
    gridObj.getSnake().resetSnakeEnds();
    gridObj.resetGrid();
    gridObj.initGridData();

    clearTimeout(hintsTimeOutId);
    startDate.current = null;

    const newEnds = gridObj.getSnake().getSnakeEnds();
    ends.head.row = newEnds.head.row;
    ends.head.col = newEnds.head.col;

    ends.tail.row = newEnds.tail.row;
    ends.tail.col = newEnds.tail.col;
  };

  const calculateScore = () => {
    const endDate = new Date();
    const seconds = Math.abs(
      (endDate.getTime() - startDate.current.getTime()) / 1000
    );
    const bonus = Math.floor(100 / seconds);
    score += pointsPerWord;
    score += bonus >= 2 ? bonus : 0; //min bonus of 2 is needed.
    // refresh the new start date
    startDate.current = new Date();
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
        const error = "Invalid head direction!";
        alert(error);
        resetGameToStart(ends);
        return;
      }
    }
    ends.head.row = newHeadRow;
    ends.head.col = newHeadCol;

    // check if new Head is a valid role
    switch (grid[newHeadRow][newHeadCol].role) {
      case Role.Tail:
      case Role.Canvas: {
        grid[newHeadRow][newHeadCol].role = Role.Head; // canvas -> head'
        break;
      }
      case Role.HintedByte:
      case Role.Byte: {
        const expected = gridObj.getExpectedLetter().toUpperCase();
        const landed = grid[newHeadRow][newHeadCol].letter;

        if (landed !== expected) {
          resetGameToStart(ends);
          return;
        }

        currentLetter =
          gridObj.getLetterIndex() > 0 ? currentLetter + landed : landed;
        gridObj.incrementLetterIndex();

        // new word
        const letterIndex = gridObj.getLetterIndex();
        if (letterIndex === 0) {
          gridObj.setRandomBytePositions();

          calculateScore();
          resetHintTimer();
        } else if (letterIndex <= gridObj.getHintsPerWord()) {
          resetHintTimer();
        }
        break;
      }
      default:
        const error = `Head collision with, ${grid[newHeadRow][newHeadCol].role}`;
        alert(error);
        resetGameToStart(ends);
    }

    grid[newHeadRow][newHeadCol].direction = currentHeadDir; // retain previous head's dir in the new head
  };

  const isHeadOnByte = (ends: typeof snakeEnds): boolean => {
    const currentHeadRow = snakeEnds.head.row;
    const currentHeadCol = snakeEnds.head.col;
    return grid[currentHeadRow][currentHeadCol].role === Role.Byte;
  };

  const calculateNewTail = (ends: typeof snakeEnds) => {
    // no-op if the head is on a byte
    if (isHeadOnByte(snakeEnds)) {
      return;
    }

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
        const error = "Invalid tail direction!";
        alert(error);
        resetGameToStart(ends);
        return;
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
    movePending = false;
  };

  useInterval(
    onTick,
    // Delay in milliseconds or null to stop it
    playing ? tickCountMs : null
  );

  const resetHintTimer = useCallback(() => {
    clearTimeout(hintsTimeOutId.current);
    gridObj.resetHint();
    const letterIndex = gridObj.getLetterIndex();
    if (hintsOn && letterIndex < gridObj.getHintsPerWord()) {
      hintsTimeOutId.current = setTimeout(onHintTimer, hintTimeoutMs);
    }
  }, [hintsOn]);

  useEffect(() => {
    if (modalTitle !== "") {
      clearTimeout(hintsTimeOutId.current);
      setPlaying(false);
    }
    if (!hintsOn) {
      resetHintTimer();
    }
  }, [modalTitle, hintsOn, resetHintTimer]);

  const onHintTimer = () => {
    gridObj.setHint();
  };

  const handleOnPlayPauseGame = useCallback(() => {
    if (modalTitle !== "") {
      // pause and return
      setPlaying(false);
      return;
    }

    if (!playing) {
      const currentTailDir = gridObj.getCurrentTailDirection();
      const currentHeadDir = gridObj.getCurrentHeadDirection();
      // on play first time
      if (
        currentHeadDir === Direction.None &&
        currentTailDir === Direction.None
      ) {
        gridObj.setCurrentTailDirection(Direction.Right);
        gridObj.setCurrentHeadDirection(Direction.Right);
      }
      if (!startDate.current) startDate.current = new Date();
      resetHintTimer();
      score = 0;
      currentLetter = "";
    }
    setPlaying((playing) => !playing);
  }, [playing, modalTitle, resetHintTimer]);

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
    // onTap: () => {
    //   console.log("swallow tap");
    // },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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
            currentTailPivot={gridObj.getPivotDirectionOnCurrentTail()}
          />
        )}
        <WordTiles bytes={currentLetter} score={score} />
      </div>

      {/* {
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
      }  */}
    </div>
  );
};
