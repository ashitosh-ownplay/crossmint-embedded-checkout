import { createButton } from "@components/crossmint/paymentOptions";
import { parentDiv } from "../../index";
import { loadStorePackages } from "./loadStorePackages";
import { loadCityBuildings } from "./loadCityBuildings.";

export const loadHomePage = () => {
  const buttonContainer = document.createElement("div");
  buttonContainer.className =
    "flex flex-row justify-center p-4 gap-4 w-auto h-auto";
  buttonContainer.setAttribute("id", "button-container");

  // Initialize buttons
  const storePackagesBtn = createButton(
    "Mint Store Packages",
    "bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded h-3rem w-200"
  );

  const cityBuildingBtn = createButton(
    "Mint City Buildings",
    "bg-pink-500 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded h-3rem w-200"
  );

  // Add embedded wallet
  storePackagesBtn.addEventListener("click", async () => {
    try {
      await loadStorePackages();
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  cityBuildingBtn.addEventListener("click", async () => {
    try {
      loadCityBuildings();
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  // Append buttons to the container
  if (buttonContainer) {
    buttonContainer.appendChild(storePackagesBtn);
    buttonContainer.appendChild(cityBuildingBtn);
  }

  if (parentDiv) {
    parentDiv.innerHTML = "";
    parentDiv.appendChild(buttonContainer);
  }
};
