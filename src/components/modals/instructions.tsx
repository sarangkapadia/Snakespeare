import "../../style/instructions.css";

const nav: any = window.navigator;

// Detects if device is on iOS
const isIos = () => {
  const userAgent = nav.userAgent.toLowerCase();
  return /iphone/.test(userAgent);
};

export const Instructions: React.FunctionComponent = () => {
  const darkMode = localStorage.getItem("darkMode");
  const darkModeChecked = darkMode ? JSON.parse(darkMode) : false; // default turn off dark mode

  return (
    <div className="instructionsContainer">
      <p>
        <b>Start:</b> Swipe anywhere on the screen to start the game. Swipe up,
        down, left or right to steer the snake in the desired direction.
      </p>

      <p>
        <b>Goal:</b> Capture the randomly placed letters in the correct order to
        form a 5 letter word.
      </p>

      <p>
        <b>Score:</b> 10 points for every word solved + bonus points for solving
        speed.
      </p>

      <p>
        <b>End:</b> The game ends when the snake's head collides into itself, OR
        if it captures a letter in the incorrect order.
      </p>

      <video
        className="demoVideo"
        loop
        muted
        autoPlay
        preload={"auto"}
        disableRemotePlayback={true}
        controls={isIos() ? true : false}
      >
        <source
          src={darkModeChecked ? "snake_dark.mp4" : "snake_light.mp4"}
          type={"video/mp4"}
        />
      </video>
    </div>
  );
};
