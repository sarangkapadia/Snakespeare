import React from "react";
import { Button } from "../../button";
import "../../style/statistics.css";
import { NumberTiles } from "../../wordtiles";
import { GraphGrid } from "../graphGrid";
import worldIconLight from "../../globe-white-96.png";
import userIconLight from "../../user-white-90.png";
import worldIconDark from "../../globe-64-dark.png";
import userIconDark from "../../user-90-dark.png";
import { Score } from "../../scores";

const nav: any = window.navigator;

export const Statistics: React.FunctionComponent = React.memo((props) => {
  const currentScore = Score.getInstance().getCurrentScore();
  const world = Score.getInstance().getWorldScoresGraph();
  const personal = Score.getInstance().getMyScoresGraph();

  const darkMode = localStorage.getItem("darkMode");
  const darkModeChecked = darkMode ? JSON.parse(darkMode) : false;

  let worldIcon = worldIconDark;
  let userIcon = userIconDark;

  if (darkModeChecked) {
    worldIcon = worldIconLight;
    userIcon = userIconLight;
  }
  /*
  const gameBalance = localStorage.getItem("gameBalance");
  const balance = gameBalance ? JSON.parse(gameBalance).balance : 3;
*/ // gameBalanceCheck

  const handleOnShareClick = async () => {
    const shareData = {
      title: "Snakespeare",
      text: `Current game score: ${currentScore} 
My top scores:
🟪 🟪 🟪 ${personal.getGoldData().score}
🟪 🟪 ${personal.getSilverData().score}
🟪 ${personal.getBronzeData().score}

`,
      url: "https://snakespeare.netlify.app",
    };
    try {
      await navigator.share(shareData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="statsContainer">
      <div className="worldContainer">
        <div className="overlayContainer">
          <GraphGrid grid={world.getGrid()} />
          <div className="iconContainer">
            <img
              className="statsIcon"
              src={worldIcon}
              alt={"world scores icon"}
            />
            <div className="iconLabel">World</div>
          </div>
        </div>
      </div>
      <div className="personalContainer">
        <div className="overlayContainer">
          <GraphGrid grid={personal.getGrid()} />
          <div className="iconContainer">
            <img
              className="statsIcon"
              src={userIcon}
              alt={"user scores icon"}
            />
            <div className="iconLabel">Me</div>
          </div>
        </div>
      </div>

      {/* <div className="dailyContainer">
        <div className="overlayContainer">
          Today's Game Balance:
          <div className="gamesRemContainer">
            {balance < 3 ? (
              <div className="gamesRem gameOver">x</div>
            ) : (
              <div className="gamesRem" />
            )}
            {balance < 2 ? (
              <div className="gamesRem gameOver">x</div>
            ) : (
              <div className="gamesRem" />
            )}
            {balance < 1 ? (
              <div className="gamesRem gameOver">x</div>
            ) : (
              <div className="gamesRem" />
            )}
          </div>
        </div>
      </div> */}

      <div className="footerContainer">
        <NumberTiles score={currentScore} />
        {nav.canShare ? (
          <Button label={"Share"} onClick={handleOnShareClick}></Button>
        ) : null}
      </div>
    </div>
  );
});
