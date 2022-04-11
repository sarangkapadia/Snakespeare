import React from "react";
import { Box } from "./box";
import { Direction, IGridItem } from "./grid";
import "./style/grid.css";

interface IGridRendererProps {
  grid: IGridItem[][];
  currentHeadDirection: Direction;
  currentTailDirection: Direction;
  currentTailPivot: Direction;
}

export const GridRenderer: React.FunctionComponent<IGridRendererProps> = (
  props
) => {
  const { grid, currentHeadDirection, currentTailDirection, currentTailPivot } =
    props;

  return (
    <div className={"grid"}>
      {grid.flat().map((item, index) => (
        <Box
          role={item.role}
          letter={item.letter}
          id={index}
          key={index}
          currentHeadDirection={currentHeadDirection}
          currentTailDirection={currentTailDirection}
          currentTailPivot={currentTailPivot}
        />
      ))}
    </div>
  );
};
