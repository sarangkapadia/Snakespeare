import React from "react";
import { Box } from "./box";
import { Direction, Grid, Role } from "./grid";
import "./style/grid.css";

interface IGridRendererProps {
  gridObj: Grid;
}

export const GridRenderer: React.FunctionComponent<IGridRendererProps> = (
  props
) => {
  const { gridObj } = props;

  const currentHeadDirection: Direction = gridObj.getCurrentHeadDirection();
  const currentTailDirection: Direction = gridObj.getCurrentTailDirection();
  const currentTailPivot: Direction = gridObj.getPivotDirectionOnCurrentTail();
  const grid = gridObj.getGrid();

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
