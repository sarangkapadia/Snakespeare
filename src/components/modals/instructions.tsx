import snakeSmile from "../../snakeSmile.gif";
import "../../style/instructions.css";

export const instructions = (
  <>
    <p>Swipe anywhere on the screen to start the game.</p>
    <p>Make turns by swiping anywhere: up, down, left or right</p>
    <p>
      Steer the snake to capture the letters in the correct order and create a 5
      letter word using the randomly placed letters.
    </p>
    <p>Score 10 points per word solved + bonus points for faster solutions.</p>

    <p>Avoid colliding the snake's head with it's own body.</p>

    <img src={snakeSmile} alt={"funny snake GIF"} />
  </>
);
