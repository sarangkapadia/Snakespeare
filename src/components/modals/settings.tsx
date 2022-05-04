import * as React from "react";
import Switch from "@mui/material/Switch";
import "../../style/settings.css";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";

const hintsLabel = { inputProps: { "aria-label": "Hints" } };
const colorModeLabel = { inputProps: { "aria-label": "Dark mode" } };

// move this to a useEffect
const root = document.querySelector<HTMLElement>(":root")!;
const rootStyle = getComputedStyle(root);

const switchColorMain = rootStyle.getPropertyValue("--byteColor");
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

export const Settings: React.FunctionComponent = () => {
  const darkMode = localStorage.getItem("darkMode");
  const hints = localStorage.getItem("hints");

  const [hintsChecked, setHintsChecked] = useState(
    hints ? JSON.parse(hints) : true
  );
  const [darkModeChecked, setDarkModeChecked] = useState(
    darkMode ? JSON.parse(darkMode) : true
  );

  useEffect(() => {
    if (darkModeChecked) {
      root.style.setProperty(
        "--modalOverlayColor",
        rootStyle.getPropertyValue("--darkModalOverlay").trim()
      );
      root.style.setProperty(
        "--appBackgroundColor",
        rootStyle.getPropertyValue("--darkBackground").trim()
      );
      root.style.setProperty(
        "--fontColor",
        rootStyle.getPropertyValue("--darkFont").trim()
      );
      root.style.setProperty(
        "--boxBackgroundColor",
        rootStyle.getPropertyValue("--darkBox").trim()
      );
    } else {
      root.style.setProperty(
        "--modalOverlayColor",
        rootStyle.getPropertyValue("--lightModalOverlay").trim()
      );
      root.style.setProperty(
        "--appBackgroundColor",
        rootStyle.getPropertyValue("--lightBackground").trim()
      );
      root.style.setProperty(
        "--fontColor",
        rootStyle.getPropertyValue("--lightFont").trim()
      );
      root.style.setProperty(
        "--boxBackgroundColor",
        rootStyle.getPropertyValue("--lightBox").trim()
      );
    }
  }, [darkModeChecked]);

  // todo : write to local storage
  const handleHintsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      localStorage.setItem("hints", JSON.stringify(event.target.checked));
    } catch (e) {
      console.log("cannot write to localStorage ", e);
    }
    setHintsChecked(event.target.checked);
  };

  // todo : write to local storage
  const handleDarkModeChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(event.target.checked));
    } catch (e) {
      console.log("cannot write to localStorage ", e);
    }
    setDarkModeChecked(event.target.checked);
  };

  return (
    <div className="settingsContainer">
      <div className="rowContainer">
        <div className="settingsTitleContainer">
          <div className="rowTitle">{"Hints"}</div>
        </div>
        <GreenSwitch
          {...hintsLabel}
          checked={hintsChecked}
          onChange={handleHintsChanged}
        />
      </div>
      <div className="rowContainer">
        <div className="settingsTitleContainer">
          <div className="rowTitle">{"Dark mode"}</div>
        </div>
        <GreenSwitch
          {...colorModeLabel}
          checked={darkModeChecked}
          onChange={handleDarkModeChanged}
        />
      </div>
    </div>
  );
};
