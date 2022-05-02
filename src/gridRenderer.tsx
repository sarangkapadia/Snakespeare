import React from "react";
import { Box } from "./box";
import { Direction, IGridItem, Role } from "./grid";
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
          letterIndex={
            item.letter !== "" && item.letterIndex !== -1
              ? item.letterIndex
              : undefined
          }
          currentHeadDirection={
            item.role === Role.Head ? currentHeadDirection : undefined
          }
          currentTailDirection={
            item.role === Role.Tail ? currentTailDirection : undefined
          }
          currentTailPivot={
            item.role === Role.Tail ? currentTailPivot : undefined
          }
        />
      ))}
    </div>
  );
};
