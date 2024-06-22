import { getCollectionInfo } from "@components/collectionInfo";
import { crossmintParent } from "@components/crossmint";
import {
  createButton,
  loadButtonsForPayment,
} from "@components/crossmint/paymentOptions";
import { client } from "@configs/client";
import { chainName, chains, nativeCurrencySymbol } from "@configs/consts";
import { ipfsUrlToHttp } from "@utils/index";
import { parentDiv } from "../../index";
import { childDiv } from "../../index";
import { NATIVE_TOKEN_ADDRESS, getContract } from "thirdweb";
import { getActiveClaimCondition, tokenUri } from "thirdweb/extensions/erc1155";
import { symbol } from "thirdweb/extensions/common";
import { decimals } from "thirdweb/extensions/erc20";

export const NftCard = async (
  tokenId: string,
  contractAddress: string,
  collectionId: string
) => {
  let claimCondition: any;
  let tokenMetadata: any;
  let currencySymbol: string | undefined;
  let currencyDecimals: any;

  const contract = getContract({
    client,
    address: contractAddress,
    chain: chains[chainName],
  });

  if (contract) {
    claimCondition = await getActiveClaimCondition({
      contract,
      tokenId: BigInt(tokenId),
    });

    const result = await tokenUri({ contract, tokenId: BigInt(tokenId) });
    tokenMetadata = await (await fetch(ipfsUrlToHttp(result as string))).json();

    if (!claimCondition) return;

    if (
      claimCondition?.currency?.toLowerCase() ===
      NATIVE_TOKEN_ADDRESS.toLowerCase()
    ) {
      currencySymbol = nativeCurrencySymbol[chainName];
    } else {
      const tokenContract = getContract({
        client,
        address: claimCondition?.currency!,
        chain: chains[chainName],
      });

      currencySymbol = await symbol({ contract: tokenContract });
      currencyDecimals = await decimals({ contract: tokenContract });
    }
  }

  // create nft card container
  const nftCardContainer = document.createElement("div");
  nftCardContainer.className =
    "flex flex-col justify-between items-center bg-white overflow-hidden shadow-lg w-96 max-w-96 p-2 rounded-lg border";

  // Create the Image element
  const image = document.createElement("img");
  image.src = ipfsUrlToHttp(tokenMetadata?.image);
  image.width = 250;
  image.height = 250;
  image.className = "rounded-lg shrink";
  image.alt = "nft collection image";
  image.setAttribute("priority", "true");

  // Append the Image to the outer div
  nftCardContainer.appendChild(image);

  // Create the inner div with classes
  const innerDiv = document.createElement("div");
  innerDiv.className =
    "flex flex-col justify-between p-5 my-6 space-y-3 rounded-lg border w-full";

  // Create the first paragraph
  const paragraph1 = document.createElement("p");
  paragraph1.className = "text-sm text-black font-bold";
  paragraph1.textContent = tokenMetadata?.name;

  // Create the second paragraph
  const paragraph2 = document.createElement("p");
  paragraph2.className = "text-sm text-black";
  paragraph2.textContent = tokenMetadata?.description;

  // Initialize buttons
  const buyWithCrossmintBtn = createButton(
    "Buy with Crossmint",
    "bg-green-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded h-3rem w-200"
  );

  buyWithCrossmintBtn.addEventListener("click", async () => {
    try {
      const collectionInfo = await getCollectionInfo(
        contractAddress,
        tokenMetadata
      );

      childDiv.innerHTML = "";
      childDiv.className =
        "flex flex-row flex-wrap gap-4 p-4 items-start justify-center";

      // append collectino info with nft image
      childDiv.appendChild(collectionInfo);

      // append crossmint payment
      childDiv.appendChild(crossmintParent);

      // load the payment options
      loadButtonsForPayment({
        collectionId,
        tokenId,
        currencyDecimals,
        claimCondition,
      });

      parentDiv.appendChild(childDiv);
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  // Append paragraphs to the inner div
  innerDiv.appendChild(paragraph1);
  innerDiv.appendChild(paragraph2);
  innerDiv.appendChild(buyWithCrossmintBtn);

  // Append innerdiv to container
  nftCardContainer.appendChild(innerDiv);

  return nftCardContainer;
};
