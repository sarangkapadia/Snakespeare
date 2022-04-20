import React, { useEffect, useState } from "react";
import "../../style/instructionsModal.css";
import snakeSmile from "../../snakeSmile.gif";
import { ModalHeader } from "./modalHeader";

interface IInstructionsModal {
  action: boolean;
  onCloseInstructions: () => void;
}

export const InstructionsModal: React.FunctionComponent<IInstructionsModal> =
  React.memo((props) => {
    const { action, onCloseInstructions } = props;
    const [className, setClassName] = useState("closed");

    useEffect(() => {
      setClassName(action ? "instructionsOverlayIn" : "instructionsOverlayOut");
      if (!action) {
        setTimeout(() => setClassName("closed"), 400);
      }
    }, [action]);

    useEffect(() => {
      setClassName("closed");
    }, []);

    return (
      <div className={className}>
        <div className={"modalContainer"}>
          <ModalHeader onClick={onCloseInstructions} title={"How to play"} />
          <p>Swipe anywhere on the screen to start the game.</p>
          <p>
            Navigate your snake by swiping left, right, up or down. This will
            change the direction of the snake's head.
          </p>
          <p>
            Steer the snake to capture the letters in the correct order and
            create a 5 letter word using the randomly placed letters. Score 100
            points per word + bonus for speed.
          </p>
          <p>Avoid colliding the snake's head with it's own body.</p>

          <img src={snakeSmile} alt={"funny snake GIF"} />
        </div>
      </div>
    );
  });
