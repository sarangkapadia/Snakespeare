import React from "react";
import { Box } from "./box";
import { Direction } from "./gridContainer";
import "./style/grid.css";

interface IGridRendererProps {
  grid: string[][];
  currentDirection: { head: Direction; tail: Direction };
}

export const GridRenderer: React.FunctionComponent<IGridRendererProps> = (
  props
) => {
  const { grid, currentDirection } = props;

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
        <Box
          className={getClassName(box)}
          id={index}
          key={index}
          currentDirection={currentDirection}
        />
      ))}
    </div>
  );
};
