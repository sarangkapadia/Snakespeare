import { IGraphData } from "./graphGrid";
import { getCountryCode } from "./scores";

export interface IScore {
  record: {
    gold: IGraphData;
    silver: IGraphData;
    bronze: IGraphData;
  };
}
const personalScores: IScore = {
  record: {
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
  },
};

export const Timeout = (timeInMS: number) => {
  let controller = new AbortController();
  setTimeout(() => {
    console.log("aborting call ", timeInMS);
    controller.abort();
  }, timeInMS);
  return controller;
};

// fetches worldScores and puts into localStorage
export const getWorldScores = async () => {
  const worldScores = localStorage.getItem("worldScores");
  const worldScoresTimeStamp = localStorage.getItem("worldScoresTimeStamp");

  if (worldScores && worldScoresTimeStamp) {
    if (
      Math.floor(
        (Date.now() - JSON.parse(worldScoresTimeStamp)) / (1000 * 60 * 60 * 24)
      ) < 2
    ) {
      console.log("no need to fetch world scores");
      return;
    }
    console.log("World scores need refresh");
  }

  let myHeaders = new Headers();
  myHeaders.append(
    "X-Master-Key",
    "$2b$10$k/NZNRRra1kD8akN1cw5nu3sxp7RSvLNx7xBlUb5GhDLhGlZbDx5m"
  );

  const url = "https://api.jsonbin.io/v3/b/626b05ce38be296761f98e18/latest";

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    signal: Timeout(2000).signal,
  };

  console.log("Fetching world data");

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("worldScores", JSON.stringify(data));
      localStorage.setItem("worldScoresTimeStamp", JSON.stringify(Date.now()));
    } else {
      console.log("response = ", response.status);
    }
  } catch (e) {
    console.log(e);
  }
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
  const darkModeChecked = darkMode ? JSON.parse(darkMode) : false; // default turn off dark mode

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
    localStorage.setItem("darkMode", JSON.stringify(false));
  }

  return isFirstVisit;
};
