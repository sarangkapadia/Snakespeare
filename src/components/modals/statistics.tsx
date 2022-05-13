import React from "react";
import { Button } from "../../button";
import "../../style/statistics.css";
import { NumberTiles } from "../../wordtiles";
import { GraphGrid } from "../graphGrid";
import worldIcon from "../../globe-white-96.png";
import userIcon from "../../user-white-90.png";
import { Score } from "../../scores";

const nav: any = window.navigator;

export const Statistics: React.FunctionComponent = React.memo((props) => {
  const currentScore = Score.getInstance().getCurrentScore();
  const world = Score.getInstance().getWorldScoresGraph();
  const personal = Score.getInstance().getMyScoresGraph();

  const handleOnShareClick = async () => {
    const shareData = {
      title: "Snakespeare",
      text: `Current game score: ${currentScore} 

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

      <div className="footerContainer">
        <NumberTiles score={currentScore} />
        {nav.canShare ? (
          <Button label={"Share"} onClick={handleOnShareClick}></Button>
        ) : null}
      </div>
    </div>
  );
});
