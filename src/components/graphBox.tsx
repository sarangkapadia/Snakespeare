import React from "react";
import { GraphRole, IGraphGrid } from "../graphGrid";
import "../style/graphBox.css";

const getClassName = (role: GraphRole): string => {
  switch (role) {
    case GraphRole.Empty:
      return "basicBox empty";
    case GraphRole.Podium:
      return "basicBox podium";
    case GraphRole.Country:
      return "basicBox country";
    case GraphRole.Score:
      return "basicBox score";
    default:
      alert("Invalid GraphRole");
      return "basicBox empty";
  }
};

export const GraphBox: React.FunctionComponent<IGraphGrid> = React.memo(
  (props) => {
    const { role, value } = props;
    const className = getClassName(role);
    return <div className={className}>{value}</div>;
  }
);
