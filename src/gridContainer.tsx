import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInterval } from "./useInterval";
import { GridRenderer } from "./gridRenderer";
import { useSwipeable } from "react-swipeable";
import { Grid, Direction, Role } from "./grid";
import "./style/gridContainer.css";
import { WordTiles } from "./wordtiles";
import { Banner } from "./banner";
import { Score } from "./scores";
import { MessageBubble } from "./messageBubble";
// import { IGameBalance } from "./launchSettings"; //gameBalanceCheck

const nav: any = window.navigator;
const showBannerAfterMs = 1000;
const hideBannerAfterMs = 4000; // if you change this , also change the banner.css animation to Xs
// move this to a useEffect
const root = document.querySelector(":root")!;
const rootStyle = getComputedStyle(root);

const tickCount = rootStyle.getPropertyValue("--tick");
let tickCountMs = parseFloat(tickCount.substr(0, tickCount.length - 1)) * 1000;
let newWordCycle = false;
let movePending = false;

const gridObj = new Grid();
gridObj.initGridData();

const gridSize = gridObj.getGridSize();
const grid = gridObj.getGrid();

const pointsPerWord = 10;
const pointsPerWord7 = 30;
export const threshold7 = 100;

let score = 0;
let currentLetter = "";
const hintTimeoutMs = 14 * 1000;

interface IGridContainer {
  modalTitle: string;
  onGameEnd: () => void;
}
const left = new Audio("left.mp3");
const right = new Audio("right.mp3");
const up = new Audio("up.mp3");
const down = new Audio("down.mp3");
const letter = new Audio("letter.mp3");
const error = new Audio("error.mp3");

left.volume = right.volume = up.volume = down.volume = letter.volume = 0.1;
error.volume = 0.2;

export const GridContainer: React.FunctionComponent<IGridContainer> = (
  props
) => {
  /* gameBalanceCheck
  const gameBalance = localStorage.getItem("gameBalance");
  let balanceObj: IGameBalance;
  if (gameBalance) {
    balanceObj = JSON.parse(gameBalance);
  } else {
    // default balance, to prevent bugs
    balanceObj = { date: new Date(), balance: 3 };
  }
*/
  const { modalTitle, onGameEnd } = props;
  const [snakeEnds, setSnakeEnds] = useState(gridObj.getSnake().getSnakeEnds());
  const [playing, setPlaying] = useState(false);

  const [bannerText, setBannerText] = useState("Text");
  const [showBubble, setShowBubble] = useState(false);

  const hints = localStorage.getItem("hints");
  const progressiveSpeed = localStorage.getItem("progressiveSpeed");
  const sounds = localStorage.getItem("sounds");
  const hintsOn = hints ? JSON.parse(hints) : "true";
  const progressiveSpeedOn = progressiveSpeed
    ? JSON.parse(progressiveSpeed)
    : "true";
  const soundsOn = sounds ? JSON.parse(sounds) : true;

  let hintsTimeOutId: any = useRef(null);
  let bannerTimeOutId: any = useRef(null);
  let startDate: any = useRef(null);
  let playingRef = useRef(playing);

  // add logic in these to detect game end
  const onSwipedLeft = () => {
    if (!playing) {
      handleOnPlayPauseGame(Direction.Left);
      return;
    }

    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Left || currentHeadDir === Direction.Right)
      return;

    movePending = true;
    if (soundsOn) left.play().catch((e) => {});
    gridObj.setCurrentHeadDirection(Direction.Left);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Left);
  };

  const onSwipedRight = () => {
    if (!playing) {
      handleOnPlayPauseGame(Direction.Right);
      return;
    }

    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Left || currentHeadDir === Direction.Right)
      return;

    movePending = true;
    if (soundsOn) right.play().catch((e) => {});
    gridObj.setCurrentHeadDirection(Direction.Right);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Right);
  };

  const onSwipedUp = () => {
    if (!playing) {
      handleOnPlayPauseGame(Direction.Up);
      return;
    }

    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Down || currentHeadDir === Direction.Up)
      return;

    movePending = true;
    if (soundsOn) up.play().catch((e) => {});
    gridObj.setCurrentHeadDirection(Direction.Up);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Up);
  };

  const onSwipedDown = () => {
    if (!playing) {
      handleOnPlayPauseGame(Direction.Down);
      return;
    }

    const currentHeadDir = gridObj.getCurrentHeadDirection();
    if (currentHeadDir === Direction.Down || currentHeadDir === Direction.Up)
      return;

    movePending = true;
    if (soundsOn) down.play().catch((e) => {});
    gridObj.setCurrentHeadDirection(Direction.Down);
    gridObj.setPivotOnCurrentHeadDirection(Direction.Down);
  };

  const resetGame = () => {
    setTimeout(() => {
      gridObj.getSnake().resetSnakeEnds();
      gridObj.resetGrid();
      gridObj.initGridData();
      setSnakeEnds(gridObj.getSnake().getSnakeEnds());

      clearTimeout(hintsTimeOutId);
      startDate.current = null;
      score = 0;
      currentLetter = "";
      tickCountMs =
        parseFloat(tickCount.substr(0, tickCount.length - 1)) * 1000;
      const root = document.querySelector<HTMLElement>(":root")!;
      root.style.setProperty("--tick", "0.6s");
    }, 500);
  };

  const showStats = useCallback(
    (resetBoard: boolean) => {
      const delayMs = 3000;

      if (!resetBoard) {
        setBannerText("Daily limit of 3 games reached");
        setTimeout(() => setBannerText("Text"), 5000);
      }
      // wait delay ms, then show the stats dialog, then wait 500ms and clear the game state.
      setTimeout(() => {
        onGameEnd(); //this shows the stats
        // wait 500ms and clear the board
        if (resetBoard) resetGame();
      }, delayMs);
    },
    [onGameEnd]
  );

  const resetGameToStart = () => {
    currentLetter = gridObj.getCurrentBytes().toUpperCase();
    setPlaying(false);
    playingRef.current = false;
    Score.getInstance().setCurrentScore(score, false);

    if (soundsOn) error.play().catch((e) => console.log(e));

    try {
      window.navigator.vibrate(350);
    } catch (e) {
      console.log("resetGameToStart - Exception on Vibrate ", e);
    }
    /*
    balanceObj.balance -= 1;
    console.log(balanceObj);
    localStorage.setItem("gameBalance", JSON.stringify(balanceObj));
    if (balanceObj.balance === 0) showStats(false);
    else showStats(true);*/
    showStats(true);
  };

  const calculateScore = () => {
    const endDate = new Date();
    const seconds = Math.abs(
      (endDate.getTime() - startDate.current.getTime()) / 1000
    );
    const bonus = Math.floor(100 / seconds);
    score += score > threshold7 ? pointsPerWord7 : pointsPerWord; // points based on score.
    score += bonus >= 2 ? bonus : 0; //min bonus of 2 is needed.

    Score.getInstance().setCurrentScore(score);

    switch (bonus) {
      case 3:
        setBannerText("Brisk +3 !");
        setTimeout(() => setBannerText("Text"), hideBannerAfterMs);
        break;
      case 4:
        setBannerText("Speedy +4 !");
        setTimeout(() => setBannerText("Text"), hideBannerAfterMs);
        break;
      case 5:
        setBannerText("Electric +5 !!");
        setTimeout(() => setBannerText("Text"), hideBannerAfterMs);
        break;
      case 6:
        setBannerText("Supersonic +6 !!");
        setTimeout(() => setBannerText("Text"), hideBannerAfterMs);
        break;
      default: {
        if (bonus > 6) {
          setBannerText(`Hypersonic +${bonus.toString()} !!!`);
          setTimeout(() => setBannerText("Text"), hideBannerAfterMs);
          break;
        }
      }
    }

    // refresh the new start date
    startDate.current = new Date();
  };

  const increaseSpeed = () => {
    if (progressiveSpeedOn) {
      const root = document.querySelector<HTMLElement>(":root")!;

      if (score <= 40) return;

      if (score > 40 && score <= 70 && tickCountMs === 600) {
        root.style.setProperty("--tick", "0.5s");
        tickCountMs = 500;
      } else if (score > 70 && tickCountMs === 500) {
        root.style.setProperty("--tick", "0.4s");
        tickCountMs = 400;
      } else if (score > threshold7 && tickCountMs === 400) {
        root.style.setProperty("--tick", "0.35s");
        tickCountMs = 350;
      }
      // else if (score > 120 && tickCountMs === 350) {
      //   root.style.setProperty("--tick", "0.3s");
      //   tickCountMs = 300;
      // }
      // else if (score > 120 && tickCountMs === 300) {
      //   root.style.setProperty("--tick", "0.25s");
      //   tickCountMs = 250;
      // }
    }
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
        grid[newHeadRow][newHeadCol].role = Role.WrongBody;
        resetGameToStart();
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

        // Landed on incorrect byte
        if (landed !== expected) {
          grid[newHeadRow][newHeadCol].role = Role.WrongByte;
          resetGameToStart();
          return;
        }

        grid[newHeadRow][newHeadCol].role = Role.CorrectByte;
        if (soundsOn) letter.play().catch((e) => {});

        currentLetter =
          gridObj.getLetterIndex() > 0 ? currentLetter + landed : landed;
        gridObj.incrementLetterIndex();

        // new word
        const letterIndex = gridObj.getLetterIndex();
        if (letterIndex === 0) {
          calculateScore();
          const aboveThreshold = score > threshold7;
          gridObj.setRandomBytePositions(currentHeadDir, aboveThreshold);
          if (aboveThreshold && score < threshold7 + pointsPerWord7) {
            setBannerText(
              `7 letter words, ${pointsPerWord7.toString()} points each!`
            );
            setTimeout(() => setBannerText("Text"), 2 * hideBannerAfterMs);
          }

          resetHintTimer();
          increaseSpeed();
          newWordCycle = true;
        } else if (letterIndex <= gridObj.getHintsPerWord()) {
          resetHintTimer();
        }
        break;
      }
      default:
        grid[newHeadRow][newHeadCol].role = Role.WrongBody;
        resetGameToStart();
        return;
    }

    grid[newHeadRow][newHeadCol].direction = currentHeadDir; // retain previous head's dir in the new head
  };

  const isHeadOnByte = (ends: typeof snakeEnds): boolean => {
    const currentHeadRow = snakeEnds.head.row;
    const currentHeadCol = snakeEnds.head.col;

    switch (grid[currentHeadRow][currentHeadCol].role) {
      case Role.Byte:
      case Role.HintedByte:
      case Role.CorrectByte:
        return true;
    }

    return false;
  };

  const calculateNewTail = (ends: typeof snakeEnds) => {
    // no-op if the head is on a byte
    if (isHeadOnByte(snakeEnds) && score < threshold7) {
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
        console.log(error);
        resetGameToStart();
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
    if (newWordCycle) {
      newWordCycle = false;
      return;
    }

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

  // Detects if device is on iOS
  const isIos = () => {
    const userAgent = nav.userAgent.toLowerCase();
    return /iphone/.test(userAgent);
  };

  // Detects if device is in standalone mode
  const isInStandaloneMode = () => "standalone" in nav && nav.standalone;
  const showBubbleOnIos = useCallback(() => {
    return isIos() && !isInStandaloneMode();
  }, []);

  useEffect(() => {
    if (modalTitle !== "") {
      clearTimeout(hintsTimeOutId.current);
      movePending = false;
      setPlaying(false);
      playingRef.current = false;
    }
    if (!hintsOn) {
      resetHintTimer();
    }
  }, [modalTitle, hintsOn, resetHintTimer]);

  useEffect(() => {
    if (!playing && modalTitle === "") {
      /*
      if (balanceObj.balance <= 0) {
        setBannerText("Daily limit of 3 games reached");
        setTimeout(() => setBannerText("Text"), hideBannerAfterMs);
      }*/ //gameBalanceCheck

      clearTimeout(bannerTimeOutId.current);
      bannerTimeOutId.current = setTimeout(() => {
        if (
          !playingRef.current &&
          modalTitle === "" &&
          currentLetter.length === 0 /*&&
          balanceObj.balance > 0 */ //gameBalanceCheck
        ) {
          setBannerText("Swipe ANYWHERE to start");
          setTimeout(() => setBannerText("Text"), hideBannerAfterMs);
          if (showBubbleOnIos()) {
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 2 * hideBannerAfterMs);
          }
        }
      }, showBannerAfterMs);
    }
  }, [
    playing,
    modalTitle,
    showBubbleOnIos /*, showStats, balanceObj.balance*/,
  ]); //gameBalanceCheck

  const onHintTimer = () => {
    gridObj.setHint();
  };

  const handleOnPlayPauseGame = useCallback(
    (initialDir: Direction) => {
      if (modalTitle !== "") {
        // pause and return
        setPlaying(false);
        playingRef.current = false;
        return;
      }

      if (!playing) {
        /*
        if (balanceObj.balance <= 0) {
          window.navigator.vibrate(350);
          showStats(false);
          return;
        }*/ //gameBalanceCheck

        const currentTailDir = gridObj.getCurrentTailDirection();
        const currentHeadDir = gridObj.getCurrentHeadDirection();
        // on play first time
        if (
          currentHeadDir === Direction.None &&
          currentTailDir === Direction.None
        ) {
          gridObj.setCurrentTailDirection(Direction.Right);
          gridObj.setCurrentHeadDirection(
            initialDir === Direction.Left ? Direction.Right : initialDir
          );
          if (initialDir === Direction.Up || initialDir === Direction.Down)
            gridObj.setPivotOnCurrentHeadDirection(initialDir);
        }

        if (!startDate.current) startDate.current = new Date();
        resetHintTimer();
      }

      // here is where we set playing to true
      playingRef.current = !playing;
      setPlaying((playing) => !playing);
    },
    [playing, modalTitle, resetHintTimer /*, showStats ,balanceObj.balance*/] //gameBalanceCheck
  );

  const onSwipeStart = (swipeEventData: any) => {
    if (movePending || newWordCycle) return;
    if (showBubble) setShowBubble(false);

    switch (swipeEventData.dir) {
      case "Up":
        onSwipedUp();
        break;
      case "Down":
        onSwipedDown();
        break;
      case "Right":
        onSwipedRight();
        break;
      case "Left":
        onSwipedLeft();
        break;
    }
  };

  const handlers = useSwipeable({
    onSwipeStart: (swipeEventData) => onSwipeStart(swipeEventData),
    onSwipedDown: () => {},
    onSwipedUp: () => {},
    onSwipedRight: () => {},
    onSwipedLeft: () => {},
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className={"game"}>
      <div className={"gridContainer"}>
        <Banner text={bannerText} />
        <GridRenderer gridObj={gridObj} />
        <WordTiles bytes={currentLetter} score={score} />
      </div>
      {showBubble ? <MessageBubble /> : null}
    </div>
  );
};
