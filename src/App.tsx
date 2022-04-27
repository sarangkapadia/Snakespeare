import React, { useState } from "react";
import "./style/App.css";

import { GridContainer } from "./gridContainer";
import { Header } from "./header";
import { ModalPage } from "./components/modals/modalPage";
import { instructions } from "./components/modals/instructions";
import { Settings } from "./components/modals/settings";
import { initLaunchSettings } from "./launchSettings";

const ModalObj = {
  None: { title: "", children: <></> },
  About: { title: "About", children: null },
  Instructions: { title: "How to play", children: instructions },
  Stats: { title: "Statistics", children: null },
  Setting: { title: "Settings", children: <Settings /> },
};

const isFirstVisit = initLaunchSettings();

export const App: React.FunctionComponent = () => {
  const [modalType, setModalType] = useState<{
    title: string;
    children: JSX.Element;
  }>(isFirstVisit ? ModalObj.Instructions : ModalObj.None);

  const onClickInstructions = () => {
    setModalType(ModalObj.Instructions);
  };
  const onClickSettings = () => {
    setModalType(ModalObj.Setting);
  };

  const onCloseModal = () => {
    setModalType(ModalObj.None);
  };

  return (
    <div className={"appContainer"}>
      <Header
        onClickInstructions={onClickInstructions}
        onClickSettings={onClickSettings}
      />
      <ModalPage onClose={onCloseModal} title={modalType.title}>
        {modalType.children}
      </ModalPage>
      <GridContainer modalTitle={modalType.title} />
    </div>
  );
};
