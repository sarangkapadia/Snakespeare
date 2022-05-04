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

  const isFirst = localStorage.getItem("isFirst");
  const isFirstVisit: boolean = isFirst ? JSON.parse(isFirst) : true;
  if (isFirstVisit)
    localStorage.setItem("isFirst", JSON.stringify(!isFirstVisit));

  return isFirstVisit;
};
