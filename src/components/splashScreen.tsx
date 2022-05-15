import React from "react";
import "../style/splashScreen.css";

export const Splash: React.FunctionComponent<{ noTitle: boolean }> = React.memo(
  (props) => {
    return (
      <div className="splashContainer">
        <div className="splashGridContainer">
          <div className="splashBox splashPurple" />
          <div className="splashBox splashPink" />
          <div className="splashBox splashPink" />
          <div className="splashBox splashGreen" />
          <div className="splashBox splashPink" />
          <div className="splashBox splashPurple" />

          <div className="splashBox splashPink" />
          <div className="splashBox splashPink" />
          <div className="splashBox splashGreen" />
        </div>
        {props.noTitle ? null : <div className="splashTitle">Snakespeare</div>}
      </div>
    );
  }
);
