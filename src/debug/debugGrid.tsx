import React from "react";
import { DebugBox } from "./debugBox";
import { IGridItem } from "../grid";

import "../style/debug/debugGrid.css";

interface IDebugGridProps {
  grid: IGridItem[][];
}

export const DebugGrid: React.FunctionComponent<IDebugGridProps> = (props) => {
  const { grid } = props;
  return (
    <div className={"debugGrid"}>
      {grid.flat().map((item, index) => (
        <DebugBox key={index} role={item.role} direction={item.direction} />
      ))}
    </div>
  );
};
