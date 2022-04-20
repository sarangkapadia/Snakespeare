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

const fontColor = rootStyle.getPropertyValue("--fontColor");

const outerTheme = createTheme({
  palette: {
    primary: {
      main: fontColor.trim(), // hex versions of --var(fontColor)
    },
  },
});

interface IHeader {
  onClickInstructions: () => void;
}

export const Header: React.FunctionComponent<IHeader> = (props) => {
  return (
    <ThemeProvider theme={outerTheme}>
      <div className={"header"}>
        <div className={"menuleft"}>
          <IconButton aria-label="Menu" color="primary" size="small">
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
        <Title title={"Snake Bytes"} />
        <div className={"menuright"}>
          <IconButton aria-label="Stats" color="primary" size="small">
            <LeaderboardRounded />
          </IconButton>
          <IconButton aria-label="Settings" color="primary" size="small">
            <SettingsRounded />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
};
