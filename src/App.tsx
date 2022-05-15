import React, { useEffect, useState } from "react";
import "./style/App.css";

import { GridContainer } from "./gridContainer";
import { Header } from "./header";
import { ModalPage } from "./components/modals/modalPage";
import { Instructions } from "./components/modals/instructions";
import { Settings } from "./components/modals/settings";
import {
  getWorldScores,
  initCountry,
  initLaunchSettings,
} from "./launchSettings";
import { Statistics } from "./components/modals/statistics";
import { About } from "./components/modals/about";
import { Splash } from "./components/splashScreen";

const ModalObj = {
  None: { title: "", children: null },
  About: { title: "About", children: <About /> },
  Instructions: { title: "How to play", children: <Instructions /> },
  Statistics: {
    title: "High Scores",
    children: <Statistics />,
  },
  Setting: { title: "Settings", children: <Settings /> },
};

const isFirstVisit = initLaunchSettings();
if (isFirstVisit) initCountry();

export const App: React.FunctionComponent = () => {
  const [modalType, setModalType] = useState<{
    title: string;
    children: JSX.Element | null;
  }>(isFirstVisit ? ModalObj.Instructions : ModalObj.None);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const onClickAbout = () => {
    setModalType(ModalObj.About);
  };
  const onClickInstructions = () => {
    setModalType(ModalObj.Instructions);
  };
  const onClickSettings = () => {
    setModalType(ModalObj.Setting);
  };
  const onClickStatistics = async () => {
    await getWorldScores();
    setModalType(ModalObj.Statistics);
  };

  const onCloseModal = () => {
    setModalType(ModalObj.None);
  };

  const isWindow =
    modalType.title === ModalObj.Instructions.title ||
    modalType.title === ModalObj.Statistics.title;

  return loading ? (
    <Splash noTitle={false} />
  ) : (
    <div className={"appContainer"}>
      <Header
        onClickInstructions={onClickInstructions}
        onClickSettings={onClickSettings}
        onClickStatistics={onClickStatistics}
        onClickAbout={onClickAbout}
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
