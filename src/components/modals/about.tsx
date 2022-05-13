import "../../style/about.css";

export const About: React.FunctionComponent = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutTileContainer">
        <div className="aboutTitle">Snakespeare</div>
        <div className="aboutSubtitle">A snake who is good with words!</div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock aboutBlockPink" />
        <div className="aboutChunkText">
          A fun twist on the popular game of snake. Solve a world puzzle while
          keeping your snake alive and <i>slithering.</i>
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock aboutBlockPurple" />
        <div className="aboutChunkText">
          In <i>settings</i>, hints are ON to help you if you are stuck, and
          progressive speeds so you can start slow before transitioning to
          higher speeds.
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock aboutBlockGreen" />
        <div className="aboutChunkText">
          The <i>high scores</i> dialog, shows you not only your own top scores,
          but also top world wide scores. Feel free to <i>share</i> your results
          with friends and family!
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock aboutBlockPink" />
        <div className="aboutChunkText">
          {`I hope you will enjoy playing the game, as much as I did creating it,
          and would love to hear your feedback over `}
          <a
            className="aboutLink"
            href="mailto:snakespeare.game@gmail.com?subject=Snakespeare%20Feedback&amp;body= :-) What I liked :%0A%0A:-( What could improve :"
            title="snakespeare.game@gmail.com"
          >
            email.
          </a>
        </div>
      </div>
    </div>
  );
};
