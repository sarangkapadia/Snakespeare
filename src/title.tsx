import React from "react";
import "./style/title.css";

interface ITitleProps {
  title: string;
}
export const Title: React.FunctionComponent<ITitleProps> = React.memo(
  (props) => {
    return <div className="title">{props.title}</div>;
  }
);
