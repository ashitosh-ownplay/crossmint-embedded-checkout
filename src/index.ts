import { loadHomePage } from "@components/home/index";

export const parentDiv = document.createElement("div");
parentDiv.className = "container mx-auto max-w-4xl bg-white w-screen h-screen";

export const childDiv = document.createElement("div");
childDiv.className = "grid grid-cols-1 sm:grid-cols-5 sm:gap-4 p-4";
childDiv.setAttribute("id", "collection-info-parent");

// load home page
loadHomePage();

// append layout to body
document.body.appendChild(parentDiv);
