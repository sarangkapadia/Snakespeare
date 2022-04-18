import React from "react";
import "../../style/instructionsModal.css";
import snakeSmile from "../../snakeSmile.gif";

interface IInstructionsModal {
  action: boolean;
  onCloseInstructions: () => void;
}

export const InstructionsModal: React.FunctionComponent<IInstructionsModal> =
  React.memo((props) => {
    const { action, onCloseInstructions } = props;
    return (
      <div
        className={
          action
            ? "instructionsModalContainerIn"
            : "instructionsModalContainerOut"
        }
      >
        <h2 className="textInstructions">{"How to play"}</h2>
        <h4 className="textInstructions">
          {"Swipe up, down, left, right to move the snake"}
        </h4>
        <h4 className="textInstructions">
          {"Consume the letters to form a five letter word"}
        </h4>
        <img src={snakeSmile} alt={"funny snake GIF"} />
        <button className={"playButton"} onClick={onCloseInstructions}>
          Play
        </button>
      </div>
    );
  });
