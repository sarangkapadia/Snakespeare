import React from "react";
import { Byte } from "./byte";
import { Direction, Role } from "./grid";
import "./style/box.css";

interface IBoxProps {
  id: number;
  role: Role;
  letter: string;
  letterIndex?: number;
  currentHeadDirection?: Direction;
  currentTailDirection?: Direction;
  currentTailPivot?: Direction;
}

export const Box: React.FunctionComponent<IBoxProps> = React.memo((props) => {
  const {
    role,
    letter,
    letterIndex,
    currentHeadDirection,
    currentTailDirection,
    currentTailPivot,
  } = props;

  const getClassNameFromDirection = (dir: Direction | undefined) => {
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
        console.log("this should never hit");
        return "none";
      default:
        console.log("invalid dir");
        return "none";
    }
  };

  const getClassName = (): string => {
    switch (role) {
      case Role.FirstTail:
      case Role.Canvas:
        return "box";
      case Role.Head:
        return `head_${getClassNameFromDirection(currentHeadDirection)}`;
      case Role.FirstHead:
        return "head_none";
      case Role.Body:
        return "snake";
      case Role.WrongBody:
        return "wrongBody";
      case Role.Tail:
        return `tail_${getClassNameFromDirection(
          currentTailPivot !== Direction.None
            ? currentTailPivot
            : currentTailDirection
        )}`;
      case Role.Byte:
        return "byte";
      case Role.HintedByte:
        return "hintedByte";
      case Role.WrongByte:
        return "wrongByte";
      case Role.CorrectByte:
        return "correctByte";
      default:
        console.log("invalid role");
        return "box";
    }
  };

  let className = getClassName();

  if (className.startsWith("byte")) {
    className = `byte byte${
      letterIndex !== undefined && letterIndex >= 0
        ? letterIndex.toString()
        : ""
    }`;
  }

  return className.startsWith("byte") ||
    className === "hintedByte" ||
    className === "correctByte" ||
    className === "wrongByte" ? (
    <div className={className}>
      <Byte letter={letter} />
    </div>
  ) : (
    <div className={className}></div>
  );
});
