import React from "react";
import { Title } from "./title";
import "./style/header.css";
import { IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  SettingsRounded,
  MenuRounded,
  HelpRounded,
  LeaderboardRounded,
} from "@mui/icons-material";

// move this to a useEffect
const root = document.querySelector(":root")!;
const rootStyle = getComputedStyle(root);

interface IHeader {
  onClickInstructions: () => void;
  onClickSettings: () => void;
  onClickStatistics: () => void;
  onClickAbout: () => void;
}

export const Header: React.FunctionComponent<IHeader> = (props) => {
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: rootStyle.getPropertyValue("--fontColor").trim(), // hex versions of --var(fontColor)
      },
    },
  });

  return (
    <ThemeProvider theme={outerTheme}>
      <div className={"header"}>
        <div className={"menuleft"}>
          <IconButton
            aria-label="menu"
            color="primary"
            size="small"
            onClick={props.onClickAbout}
          >
            <MenuRounded />
          </IconButton>
          <IconButton
            aria-label="Instruction"
            color="primary"
            size="small"
            onClick={props.onClickInstructions}
          >
            <HelpRounded />
          </IconButton>
        </div>
        <Title title={"Snakespeare"} />
        <div className={"menuright"}>
          <IconButton
            aria-label="Stats"
            color="primary"
            size="small"
            onClick={props.onClickStatistics}
          >
            <LeaderboardRounded />
          </IconButton>
          <IconButton
            aria-label="Settings"
            color="primary"
            size="small"
            onClick={props.onClickSettings}
          >
            <SettingsRounded />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
};
