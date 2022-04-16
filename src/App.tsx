import React, { useState } from "react";
import "./style/App.css";

import { GridContainer } from "./gridContainer";
import { Header } from "./header";

export const App: React.FunctionComponent = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const onClickInstructions = () => {
    console.log("In onInstructionsClick");
    setShowInstructions(true);
  };

  const onCloseInstructions = () => {
    console.log("In onInstructionsClose");
    setShowInstructions(false);
  };

  console.log("showInstructions = ", showInstructions);

  return (
    <div className={"appContainer"}>
      <Header onClickInstructions={onClickInstructions} />
      <GridContainer
        showInstructions={showInstructions}
        onCloseInstructions={onCloseInstructions}
      />
      {/* <InstructionsModal show={true} /> */}
    </div>
  );
};
