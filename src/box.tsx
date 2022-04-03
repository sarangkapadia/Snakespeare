import React from "react";
import { Direction } from "./grid";
import "./style/box.css";

interface IBoxProps {
  id: number;
  role: string;
  currentHeadDirection: Direction;
}

export const Box: React.FunctionComponent<IBoxProps> = React.memo((props) => {
  const { role, currentHeadDirection } = props;

  const getClassNameFromDirection = (dir: Direction) => {
    switch (dir) {
      case Direction.Down:
        return "t2b";
      case Direction.Up:
        return "b2t";
      case Direction.Left:
        return "r2l";
      case Direction.Right:
        return "l2r";
      default:
        throw new Error("invalid dir");
    }
  };

  const getClassName = (): string => {
    switch (role) {
      case "b":
        return "box";
      case "h":
        return `head_${getClassNameFromDirection(currentHeadDirection)}`;
      case "s":
        return "snake";
      case "t":
        return `tail_${getClassNameFromDirection(currentHeadDirection)}`; // fix this to tail
      case "f":
        return "food";
      default:
        throw new Error("invalid role");
    }
  };

  let className = getClassName();

  return <div className={className}></div>;
});
