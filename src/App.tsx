import React, { useState } from "react";
import "./style/App.css";

import { GridContainer } from "./gridContainer";
import { Header } from "./header";

export const App: React.FunctionComponent = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const onClickInstructions = () => {
    setShowInstructions(true);
  };

  const onCloseInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <div className={"appContainer"}>
      <Header onClickInstructions={onClickInstructions} />
      <GridContainer
        showInstructions={showInstructions}
        onCloseInstructions={onCloseInstructions}
      />
    </div>
  );
};
