import * as React from "react";
import Switch from "@mui/material/Switch";
import "../../style/settings.css";
import { styled } from "@mui/material";

const hintsLabel = { inputProps: { "aria-label": "Hints" } };
const colorModeLabel = { inputProps: { "aria-label": "Dark mode" } };

// move this to a useEffect
const root = document.querySelector(":root")!;
const rootStyle = getComputedStyle(root);

const switchColorMain = rootStyle.getPropertyValue("--foodColor");
const switchColorLight = rootStyle.getPropertyValue("--snakeColor");

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: switchColorMain.trim(),
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: switchColorMain.trim(),
  },
  "& .MuiSwitch-track": {
    backgroundColor: switchColorLight.trim(),
  },
}));

export const settings = (
  <div className="settingsContainer">
    <div className="rowContainer">
      <div className="settingsTitleContainer">
        <div className="rowTitle">{"Hints"}</div>
      </div>
      <GreenSwitch {...hintsLabel} defaultChecked />
    </div>
    <div className="rowContainer">
      <div className="settingsTitleContainer">
        <div className="rowTitle">{"Dark mode"}</div>
      </div>
      <GreenSwitch {...colorModeLabel} defaultChecked />
    </div>
  </div>
);
