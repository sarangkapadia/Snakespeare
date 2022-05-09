import React, { useState } from "react";
import "./style/App.css";

import { GridContainer } from "./gridContainer";
import { Header } from "./header";
import { ModalPage } from "./components/modals/modalPage";
import { instructions } from "./components/modals/instructions";
import { Settings } from "./components/modals/settings";
import { initLaunchSettings } from "./launchSettings";
import { Statistics } from "./components/modals/statistics";
import { GraphData } from "./graphGrid";

// temp code
const worldGraph = new GraphData();
worldGraph.setSilverData({ score: 50, country: "UK" });
worldGraph.setGoldData({ score: 80, country: "IN" });
worldGraph.setBronzeData({ score: 30, country: "FR" });

const personalGraph = new GraphData();
personalGraph.setSilverData({ score: 35, country: "JP" });
personalGraph.setGoldData({ score: 75, country: "CH" });
personalGraph.setBronzeData({ score: 25, country: "CA" });
// temp code

const ModalObj = {
  None: { title: "", children: null },
  About: { title: "About", children: null },
  Instructions: { title: "How to play", children: instructions },
  Statistics: {
    title: "High Scores",
    children: <Statistics world={worldGraph} personal={personalGraph} />,
  },
  Setting: { title: "Settings", children: <Settings /> },
};

const isFirstVisit = initLaunchSettings();

export const App: React.FunctionComponent = () => {
  const [modalType, setModalType] = useState<{
    title: string;
    children: JSX.Element | null;
  }>(isFirstVisit ? ModalObj.Instructions : ModalObj.None);

  const onClickInstructions = () => {
    setModalType(ModalObj.Instructions);
  };
  const onClickSettings = () => {
    setModalType(ModalObj.Setting);
  };
  const onClickStatistics = () => {
    setModalType(ModalObj.Statistics);
  };

  const onCloseModal = () => {
    setModalType(ModalObj.None);
  };

  const isWindow =
    modalType.title === ModalObj.Instructions.title ||
    modalType.title === ModalObj.Statistics.title;

  return (
    <div className={"appContainer"}>
      <Header
        onClickInstructions={onClickInstructions}
        onClickSettings={onClickSettings}
        onClickStatistics={onClickStatistics}
      />
      <ModalPage
        onClose={onCloseModal}
        title={modalType.title}
        isWindow={isWindow}
      >
        {modalType.children}
      </ModalPage>
      <GridContainer
        modalTitle={modalType.title}
        onGameEnd={onClickStatistics}
      />
    </div>
  );
};
