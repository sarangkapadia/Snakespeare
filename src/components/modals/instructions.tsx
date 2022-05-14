import "../../style/instructions.css";

export const Instructions: React.FunctionComponent = () => {
  const darkMode = localStorage.getItem("darkMode");
  const darkModeChecked = darkMode ? JSON.parse(darkMode) : true; // default turn on dark mode

  return (
    <div className="instructionsContainer">
      <p>
        <b>START:</b> Swipe anywhere on the screen to start the game. Swipe up,
        down, left or right to steer the snake in the desired direction.
      </p>

      <p>
        <b>GOAL:</b> Capture the randomly placed letters in the correct order to
        form a 5 letter word.
      </p>

      <p>
        <b>SCORE:</b> 10 points for every word solved + a time bonus for faster
        solutions.
      </p>

      <p>
        <b>END:</b> The game ends when the snake's head collides into itself, OR
        if it captures a letter in the incorrect order.
      </p>

      <video className="demoVideo" loop muted autoPlay>
        <source
          src={darkModeChecked ? "snake_dark.mp4" : "snake_light.mp4"}
          type={"video/mp4"}
        />
      </video>
    </div>
  );
};
