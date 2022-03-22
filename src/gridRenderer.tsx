import React from "react";
import { Box } from "./box";
import "./style/grid.css";

interface IGripRendererProps {
  grid: string[][];
}

export const GridRenderer: React.FunctionComponent<IGripRendererProps> = (
  props
) => {
  const { grid } = props;

  return (
    <div className={"grid"}>
      {grid.flat().map((box, index) => (
        <Box className={box === "b" ? "box" : "snake"} id={index} key={index} />
      ))}
    </div>
  );
};
