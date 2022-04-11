import React from "react";
import { Byte } from "./byte";
import { Direction, Role } from "./grid";
import "./style/box.css";

interface IBoxProps {
  id: number;
  role: Role;
  letter: string;
  currentHeadDirection: Direction;
  currentTailDirection: Direction;
  currentTailPivot: Direction;
}

export const Box: React.FunctionComponent<IBoxProps> = React.memo((props) => {
  const {
    role,
    letter,
    currentHeadDirection,
    currentTailDirection,
    currentTailPivot,
  } = props;

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
      case Direction.None:
        return "none";
      default:
        throw new Error("invalid dir");
    }
  };

  const getClassName = (): string => {
    switch (role) {
      case Role.Canvas:
        return "box";
      case Role.Head:
        return `head_${getClassNameFromDirection(currentHeadDirection)}`;
      case Role.Body:
        return "snake";
      case Role.Tail:
        return `tail_${getClassNameFromDirection(
          currentTailPivot !== Direction.None
            ? currentTailPivot
            : currentTailDirection
        )}`;
      case Role.Byte:
        return "food";
      default:
        throw new Error("invalid role");
    }
  };

  let className = getClassName();

  return className === "food" ? (
    <div className={className}>
      <Byte letter={letter} />
    </div>
  ) : (
    <div className={className}></div>
  );
});
