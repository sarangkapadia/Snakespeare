import React from "react";
import { Direction } from "./gridContainer";
import "./style/box.css";

interface IBoxProps {
  id: number;
  className: string;
  currentDirection: { head: Direction; tail: Direction };
}

export const Box: React.FunctionComponent<IBoxProps> = React.memo((props) => {
  return <div className={props.className}></div>;
});
