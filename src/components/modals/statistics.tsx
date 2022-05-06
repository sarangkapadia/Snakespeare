import React from "react";
import { Button } from "../../button";
import "../../style/statistics.css";
import { NumberTiles } from "../../wordtiles";

export const Statistics: React.FunctionComponent = () => {
  return (
    <div className="statsContainer">
      <div className="worldContainer"></div>
      <div className="personalContainer"></div>
      <div className="footerContainer">
        <NumberTiles score={45} />
        <Button label={"Share"} onClick={() => console.log("share!")}></Button>
      </div>
    </div>
  );
};
