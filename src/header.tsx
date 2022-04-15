import React from "react";
import { Title } from "./title";
import "./style/header.css";
import { IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import { Menu, HelpOutline, Leaderboard, Settings } from "@mui/icons-material";

export const Header: React.FunctionComponent = () => {
  return (
    <div className={"header"}>
      <div className={"menuleft"}>
        <IconButton aria-label="Menu" color="primary" size="large">
          <Menu />
        </IconButton>
        <IconButton aria-label="Instruction" color="primary" size="large">
          <HelpOutline />
        </IconButton>
      </div>
      <Title />
      <div className={"menuright"}>
        <IconButton aria-label="Stats" color="primary" size="large">
          <Leaderboard />
        </IconButton>
        <IconButton aria-label="Settings" color="primary" size="large">
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};
