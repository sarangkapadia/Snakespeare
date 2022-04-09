import { IGridItem, Role, Direction } from "../grid";
import "../style/debug/debugBox.css";

const getStringRole = (role: Role): string => {
  switch (role) {
    case Role.Body:
      return "b ";
    case Role.Head:
      return "h ";
    case Role.Tail:
      return "t ";
    case Role.Canvas:
      return "c ";
    case Role.Byte:
      return "f ";
    default:
      throw new Error("invalid role");
  }
};

const getStringDirection = (direction: Direction): string => {
  switch (direction) {
    case Direction.Down:
      return "d ";
    case Direction.Up:
      return "u ";
    case Direction.Left:
      return "l ";
    case Direction.Right:
      return "r ";
    case Direction.None:
      return "n ";
    default:
      throw new Error("invalid direction");
  }
};

export const DebugBox: React.FunctionComponent<IGridItem> = (props) => {
  const { role, direction, pivot } = props;
  return (
    <div className={"debugBox"}>
      {role > 0 ? getStringRole(role) : null}
      {direction > 0 ? getStringDirection(direction) : null}
      {role > 0 ? getStringDirection(pivot).toUpperCase() : null}
    </div>
  );
};
