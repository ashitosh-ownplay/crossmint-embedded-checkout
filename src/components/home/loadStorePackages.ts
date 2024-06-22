import { childDiv, parentDiv } from "../../index";
import { crossmintParent } from "@components/crossmint";
import { loadButtonsForPayment } from "@components/crossmint/paymentOptions";
import { loadStorePackagesList } from "@components/storePackages";

export const loadStorePackages = async () => {
  //   // @ts-ignore
  //   if (childDiv) {
  //     // append collectino info with nft image
  //     childDiv.appendChild(collectionInfoTag);

  //     // append crossmint payment
  //     childDiv.appendChild(crossmintParent);

  //     // load the payment options
  //     loadButtonsForPayment();

  //     parentDiv.appendChild(childDiv);
  //   }

  await loadStorePackagesList();
};
