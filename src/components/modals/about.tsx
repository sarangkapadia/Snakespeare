import "../../style/about.css";
import { Splash } from "../splashScreen";
import {
  SettingsRounded,
  GamesRounded,
  EmailRounded,
  LeaderboardRounded,
} from "@mui/icons-material";

export const About: React.FunctionComponent = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutTileContainer">
        <div className="aboutTitle">Snakespeare</div>
        <div className="aboutSubtitle">A snake who is good with words!</div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock">
          <GamesRounded color={"inherit"} fontSize={"large"} />
        </div>
        <div className="aboutChunkText">
          A fun twist on the popular game of snake. The goal is to solve as many
          word puzzles while carefully navigating your snake.
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock">
          <SettingsRounded color={"inherit"} fontSize={"large"} />
        </div>
        <div className="aboutChunkText">
          Hints are ON by default. Progressive speeds are also ON by default, so
          that your snake starts slow at first, and quickens as you improve.
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock">
          <LeaderboardRounded color={"inherit"} fontSize={"large"} />
        </div>
        <div className="aboutChunkText">
          Shows the top 3 scores around the world as well as your personal
          bests. Don't forget to share them with your friends!
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock">
          <EmailRounded color={"inherit"} fontSize={"large"} />
        </div>
        <div className="aboutChunkText">
          {` I hope you enjoy playing the game, as much as I did creating it. 
          I'd love to hear your feedback via `}
          <a
            className="aboutLink"
            href="mailto:snakespeare.game@gmail.com?subject=Snakespeare%20Feedback&amp;body= :-) What I liked :%0A%0A:-( What could improve :"
            title="snakespeare.game@gmail.com"
          >
            email.
          </a>
        </div>
      </div>
      <Splash noTitle={true} />
    </div>
  );
};
