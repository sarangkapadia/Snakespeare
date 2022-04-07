import React from "react";
import { Title } from "./title";
import "./style/header.css";

export const Header: React.FunctionComponent = () => {
  return (
    <div className={"header"}>
      <div className={"menuleft"}>
        <button className="About" style={{ margin: "2px" }}>
          {"About"}
        </button>
        <button className="Instructions" style={{ margin: "2px" }}>
          {"How"}
        </button>
      </div>
      <Title />
      <div className={"menuright"}>
        <button className="Sett" style={{ margin: "2px" }}>
          {"Settings"}
        </button>
        <button className="Stat" style={{ margin: "2px" }}>
          {"Stats"}
        </button>
      </div>
    </div>
  );
};
