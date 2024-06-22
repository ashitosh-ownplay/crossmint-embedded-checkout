import { getCollectionInfo } from "@components/collectionInfo";
import { childDiv, parentDiv } from "../../index";
import { crossmintParent } from "@components/crossmint";
import { loadButtonsForPayment } from "@components/crossmint/paymentOptions";
import { chainName, cityBuildingsNFTAddress } from "@configs/consts";

export const loadCityBuildings = async () => {
  console.log("loading city buildings");
  // @ts-ignore
  if (childDiv) {
    const collectionInfo = await getCollectionInfo(
      cityBuildingsNFTAddress[chainName]
    );

    childDiv.innerHTML = "";

    // append collectino info with nft image
    childDiv.appendChild(collectionInfo);

    // append crossmint payment
    childDiv.appendChild(crossmintParent);

    // load the payment options
    loadButtonsForPayment();

    parentDiv.appendChild(childDiv);
  }
};
