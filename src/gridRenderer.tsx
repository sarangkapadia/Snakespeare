import React from "react";
import { Box } from "./box";
import { Direction } from "./grid";
import "./style/grid.css";

interface IGridRendererProps {
  grid: string[][];
  currentHeadDirection: Direction;
}

export const GridRenderer: React.FunctionComponent<IGridRendererProps> = (
  props
) => {
  const { grid, currentHeadDirection } = props;

  return (
    <div className={"grid"}>
      {grid.flat().map((role, index) => (
        <Box
          role={role}
          id={index}
          key={index}
          currentHeadDirection={currentHeadDirection}
        />
      ))}
    </div>
  );
};
