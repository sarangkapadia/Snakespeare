import React from "react";
import "./style/App.css";

import { Title } from "./title";
import { GridContainer } from "./gridContainer";

export const App: React.FunctionComponent = () => {
  return (
    <div className={"appContainer"}>
      <Title />
      <GridContainer />
    </div>
  );
};
