import React from "react";
import { IGraphGrid } from "../graphGrid";
import "../style/graphGrid.css";
import { GraphBox } from "./graphBox";

interface IGraphGridProps {
  grid: IGraphGrid[][];
}

export const GraphGrid: React.FunctionComponent<IGraphGridProps> = React.memo(
  (props) => {
    const { grid } = props;

    return (
      <div className="graphGridContainer">
        {grid.flat().map((item, index) => (
          <GraphBox role={item.role} value={item.value} key={index} />
        ))}
      </div>
    );
  }
);
