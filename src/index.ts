import { collectionInfoTag } from "@components/collectionInfo";
import { crossmintParent } from "@components/crossmint";
import { loadButtonsForPayment } from "@components/crossmint/paymentOptions";

const parentDiv = document.createElement("div");
parentDiv.className = "container mx-auto max-w-4xl bg-white";

const childDiv = document.createElement("div");
childDiv.className = "grid grid-cols-1 sm:grid-cols-5 sm:gap-4 p-4";
childDiv.setAttribute("id", "collection-info-parent");

// append collectino info with nft image
childDiv.appendChild(collectionInfoTag);

// append crossmint payment
childDiv.appendChild(crossmintParent);

// // Load the payment component
// loadPaynent();

// load the payment options
loadButtonsForPayment();

parentDiv.appendChild(childDiv);

// append layout to body
document.body.appendChild(parentDiv);
