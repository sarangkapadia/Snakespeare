import snakeSmile from "../../snakeSmile.gif";
import "../../style/instructions.css";

export const instructions = (
  <>
    <p>Swipe anywhere on the screen to start the game.</p>
    <p>
      Navigate your snake by swiping left, right, up or down. This will change
      the direction of the snake's head.
    </p>
    <p>
      Steer the snake to capture the letters in the correct order and create a 5
      letter word using the randomly placed letters. Score 100 points per word
      solved + bonus points for speedy solutions.
    </p>
    <p>Avoid colliding the snake's head with it's own body.</p>

    <img src={snakeSmile} alt={"funny snake GIF"} />
  </>
);
