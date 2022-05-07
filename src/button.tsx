import React from "react";
import "./style/button.css";
import { ReactComponent as Share } from "./share.svg";

interface IButtonProps {
  onClick: () => void;
  label: string;
}

export const Button: React.FunctionComponent<IButtonProps> = React.memo(
  (props) => {
    return (
      <button className={"button"} onClick={props.onClick}>
        <div className="buttonContainer">
          {props.label}
          <Share className={"shareLogo"} />
        </div>
      </button>
    );
  }
);
