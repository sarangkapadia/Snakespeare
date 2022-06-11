import "./style/messageBubble.css";
import plusIconLight from "./iOSplusWhite.png";
import shareIconLight from "./iOSshareWhite.png";

import React from "react";

export const MessageBubble: React.FunctionComponent = React.memo(() => {
  return (
    <div className="bubbleContainer">
      <div className="messageContainer">
        <div>Tap </div>{" "}
        <img className="bubbleIcon" src={shareIconLight} alt={"share icon"} />
        <div> then Add to Home Screen</div>
        <img
          className="bubbleIcon"
          src={plusIconLight}
          alt={"plus icon"}
        />{" "}
      </div>
      <div className="messageArrowDown"></div>
    </div>
  );
});
