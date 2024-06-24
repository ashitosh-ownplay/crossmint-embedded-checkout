import { loadHomePage } from "@components/home/index";
import { loadWalletOptions } from "@components/wallet";

export const parentDiv = document.createElement("div");
parentDiv.className = "container mx-auto bg-white w-full h-full";

export const childDiv = document.createElement("div");
childDiv.className = "container mx-auto bg-white w-full h-full p-4";
childDiv.setAttribute("id", "collection-info-parent");

// load wallet options
loadWalletOptions();

// append layout to body
document.body.appendChild(parentDiv);
