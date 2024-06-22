import { client } from "@configs/client";
import {
  chainName,
  chains,
  collectionId,
  packagesCollectionId,
  packagesNFTAddress,
} from "@configs/consts";
import { ipfsUrlToHttp } from "@utils/index";
import { getContract } from "thirdweb";
import { contractURI } from "thirdweb/extensions/common";
import { nextTokenIdToMint } from "thirdweb/extensions/erc1155";
import { NftCard } from "./nftCard";
import { childDiv, parentDiv } from "../../index";

const getTokensContent = async (
  nextTokenId: number,
  contractAddress: string,
  collectionId: string
) => {
  const nftContainer = document.createElement("div");
  nftContainer.className = "container mx-auto p-4";

  const flexBox = document.createElement("div");
  flexBox.className = "flex flex-row flex-wrap gap-4";

  nftContainer.appendChild(flexBox);

  if (childDiv) {
    childDiv.innerHTML = "";
    childDiv.appendChild(nftContainer);
    parentDiv.appendChild(childDiv);
  }

  for (let i = 0; i < nextTokenId; i++) {
    const nftCard = await NftCard(String(i), contractAddress, collectionId);
 
    flexBox.appendChild(nftCard);
  }
};

export const loadStorePackagesList = async () => {
  try {
    const contract = getContract({
      client: client,
      address: packagesNFTAddress[chainName],
      chain: chains[chainName],
    });

    if (contract) {
      const result = await contractURI({ contract });
      const contractMetadata = await (
        await fetch(ipfsUrlToHttp(result as string))
      ).json();

      const netTokenIdToMint = await nextTokenIdToMint({ contract });

      console.log("netTokenIdToMint: ", netTokenIdToMint);

      if (netTokenIdToMint) {
        await getTokensContent(
          Number(netTokenIdToMint?.toString()),
          packagesNFTAddress[chainName],
          packagesCollectionId[chainName]
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
