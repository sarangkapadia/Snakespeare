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

  const getClassName = (box: string): string => {
    switch (box) {
      case "b":
        return "box";
      case "h":
        return "head";
      case "s":
        return "snake";
      case "t":
        return "tail";
      case "f":
        return "food";
    }
    return "invalid";
  };

  return (
    <div className={"grid"}>
      {grid.flat().map((box, index) => (
        <Box className={getClassName(box)} id={index} key={index} />
      ))}
    </div>
  );
};
