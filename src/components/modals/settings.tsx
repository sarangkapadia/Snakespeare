import * as React from "react";
import Switch from "@mui/material/Switch";
import "../../style/settings.css";

const hintsLabel = { inputProps: { "aria-label": "Hints" } };
const colorModeLabel = { inputProps: { "aria-label": "Dark Mode" } };

export const settings = (
  <>
    <div className="settingsContainer">
      <div className="rowContainer">
        <div className="settingsTitleContainer">
          <div className="rowTitle">{"Show hints"}</div>
        </div>
        <Switch {...hintsLabel} defaultChecked />
      </div>
      <div className="rowContainer">
        <div className="settingsTitleContainer">
          <div className="rowTitle">{"Dark mode"}</div>
        </div>
        <Switch {...colorModeLabel} defaultChecked />
      </div>
    </div>
  </>
);
