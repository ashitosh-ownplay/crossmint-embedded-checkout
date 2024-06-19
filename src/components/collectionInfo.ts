import { getContract } from "thirdweb";
import ninjanaut from "../ninjanaut.png";
import { getNFT } from "thirdweb/extensions/erc721";
import { chainName, chains, cityBuildingsNFTAddress } from "@configs/consts";
import { getContractMetadata } from "thirdweb/extensions/common";
import { client } from "@configs/client";
import { ipfsUrlToHttp } from "@utils/index";

const contract = getContract({
  client,
  chain: chains[chainName],
  address: cityBuildingsNFTAddress[chainName],
});
const collectionInfo = await getContractMetadata({
  contract,
});

// Create the outer div with classes
export const collectionInfoTag = document.createElement("div");
collectionInfoTag.className = "sm:col-span-2 flex flex-col";

// Create the Image element
const image = document.createElement("img");
image.src = ipfsUrlToHttp(collectionInfo.image);
image.width = 500;
image.height = 500;
image.className = "rounded-lg shrink";
image.alt = "nft collection image";
image.setAttribute("priority", "true");

// Append the Image to the outer div
collectionInfoTag.appendChild(image);

// Create the inner div with classes
const innerDiv = document.createElement("div");
innerDiv.className = "justify-between p-5 my-6 space-y-3 rounded-lg border";

// Create the first paragraph
const paragraph1 = document.createElement("p");
paragraph1.className = "text-sm text-black font-bold";
paragraph1.textContent = collectionInfo.name;

// Create the second paragraph
const paragraph2 = document.createElement("p");
paragraph2.className = "text-sm text-black";
paragraph2.textContent = collectionInfo.description;

// Append paragraphs to the inner div
innerDiv.appendChild(paragraph1);
innerDiv.appendChild(paragraph2);

// Create the nested div with classes
const nestedDiv1 = document.createElement("div");
nestedDiv1.className = "w-full p-2 border rounded-lg";

// Create the innermost div with classes
const nestedDiv2 = document.createElement("div");
nestedDiv2.className =
  "cursor-pointer flex items-start gap-1 text-black justify-between";

// Create the credit card paragraph
const creditCardParagraph = document.createElement("p");
creditCardParagraph.className = "text-black text-sm";
creditCardParagraph.textContent = "4242 4242 4242 4242";

// Append the credit card paragraph to the innermost div
nestedDiv2.appendChild(creditCardParagraph);

// Append the innermost div to the nested div
nestedDiv1.appendChild(nestedDiv2);

// Append the nested div to the inner div
innerDiv.appendChild(nestedDiv1);

// Append the inner div to the outer div
collectionInfoTag.appendChild(innerDiv);

// const parentCollectionInfo = document.getElementById("collection-info-parent");
// parentCollectionInfo?.appendChild(collectionInfoTag);
