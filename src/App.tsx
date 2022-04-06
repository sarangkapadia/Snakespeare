import React from "react";
import "./style/App.css";

import { GridContainer } from "./gridContainer";
import { Header } from "./header";

export const App: React.FunctionComponent = () => {
  return (
    <div className={"appContainer"}>
      <Header />
      <GridContainer />
    </div>
  );
};
