import React from "react";
import "../style/splashScreen.css";

export const Splash: React.FunctionComponent = React.memo(() => {
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
      <div className="splashTitle">Snakespeare</div>
    </div>
  );
});
