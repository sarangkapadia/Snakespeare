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
  const progressiveSpeed = localStorage.getItem("progressiveSpeed");
  const sounds = localStorage.getItem("sounds");

  const [hintsChecked, setHintsChecked] = useState(
    hints ? JSON.parse(hints) : true
  );
  const [darkModeChecked, setDarkModeChecked] = useState(
    darkMode ? JSON.parse(darkMode) : false
  );
  const [progressiveSpeedChecked, setProgressiveSpeedChecked] = useState(
    progressiveSpeed ? JSON.parse(progressiveSpeed) : true
  );
  const [soundsChecked, setSoundsChecked] = useState(
    sounds ? JSON.parse(sounds) : true
  );

  const [soundsUx, setSoundsUx] = useState(false);
  useEffect(() => {
    const dummyAudio = new Audio("silent.mp3");
    dummyAudio.volume = 0.1;
    dummyAudio
      .play()
      .then(() => {
        console.log("Show Sound Settings");
        setSoundsUx(true);
      })
      .catch((e) => {
        console.log("Safari", e);
        setSoundsUx(false);
        try {
          localStorage.setItem("sounds", JSON.stringify(false));
        } catch (e) {
          console.log("cannot write to localStorage ", e);
        }
        setSoundsChecked(false);
      });
  }, []);

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
        "--statsOverlay",
        rootStyle.getPropertyValue("--darkStatsOverlay").trim()
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
        "--statsOverlay",
        rootStyle.getPropertyValue("--lightStatsOverlay").trim()
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

  const handleProgressiveSpeedChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      localStorage.setItem(
        "progressiveSpeed",
        JSON.stringify(event.target.checked)
      );
    } catch (e) {
      console.log("cannot write to localStorage ", e);
    }
    setProgressiveSpeedChecked(event.target.checked);
  };

  const handleSoundsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      localStorage.setItem("sounds", JSON.stringify(event.target.checked));
    } catch (e) {
      console.log("cannot write to localStorage ", e);
    }
    setSoundsChecked(event.target.checked);
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
      <div className="rowContainer">
        <div className="settingsTitleContainer">
          <div className="rowTitle">{"Progressive speed"}</div>
        </div>
        <GreenSwitch
          {...colorModeLabel}
          checked={progressiveSpeedChecked}
          onChange={handleProgressiveSpeedChanged}
        />
      </div>
      {soundsUx ? (
        <div className="rowContainer">
          <div className="settingsTitleContainer">
            <div className="rowTitle">{"Sounds"}</div>
          </div>
          <GreenSwitch
            {...colorModeLabel}
            checked={soundsChecked}
            onChange={handleSoundsChanged}
          />
        </div>
      ) : null}
    </div>
  );
};
