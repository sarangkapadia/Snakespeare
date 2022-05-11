import { IGraphData } from "./graphGrid";
import { getCountryCode } from "./scores";

export interface IScore {
  gold: IGraphData;
  silver: IGraphData;
  bronze: IGraphData;
}
const personalScores: IScore = {
  gold: {
    score: 0,
    country: "--",
  },
  silver: {
    score: 0,
    country: "--",
  },
  bronze: {
    score: 0,
    country: "--",
  },
};

export const initCountry = async () => {
  const flag = await getCountryCode();
  localStorage.setItem(
    "myCountry",
    JSON.stringify({ flag: flag, date: Date.now() })
  );
};

export const initLaunchSettings = () => {
  const root = document.querySelector<HTMLElement>(":root")!;
  const rootStyle = getComputedStyle(root);

  const darkMode = localStorage.getItem("darkMode");
  const darkModeChecked = darkMode ? JSON.parse(darkMode) : true; // default turn on dark mode

  if (darkModeChecked) {
    root.style.setProperty(
      "--modalOverlayColor",
      rootStyle.getPropertyValue("--darkModalOverlay").trim()
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
      "--statsOverlay",
      rootStyle.getPropertyValue("--lightStatsOverlay").trim()
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

  const isFirst = localStorage.getItem("isFirst");
  const isFirstVisit: boolean = isFirst ? JSON.parse(isFirst) : true;
  if (isFirstVisit) {
    console.log("first visit");
    localStorage.setItem("isFirst", JSON.stringify(!isFirstVisit));
    localStorage.setItem("personalScores", JSON.stringify(personalScores));
  }

  return isFirstVisit;
};
