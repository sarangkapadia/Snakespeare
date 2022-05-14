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
          A fun twist on the popular game of snake. The goal is to solve word
          puzzles while keeping your snake alive and slithering.
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock aboutBlockPurple" />
        <div className="aboutChunkText">
          <b>SETTINGS:</b> Hints are default ON to help you if you are stuck,
          and progressive speed ensures your snake starts slow before
          transitioning to higher speeds.
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock aboutBlockGreen" />
        <div className="aboutChunkText">
          <b>HIGH SCORES:</b> Shows you your top scores, and also top world wide
          scores. It also allows you to share your results with friends and
          family!
        </div>
      </div>
      <div className="aboutChunkContainer">
        <div className="aboutBlock aboutBlockPink" />
        <div className="aboutChunkText">
          <b>FEEDBACK:</b>
          {` I hope you will enjoy playing the game, as much as I did creating it,
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
