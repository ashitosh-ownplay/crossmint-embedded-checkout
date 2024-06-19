import { getContract, readContract } from "thirdweb";
import { client } from "../configs/client";
import { chainName, chains, thirdWebClientId } from "../configs/consts";

export const predictSmartWalletAddress = async (
  personalWallet: string,
  factoryAddress: string
): Promise<string> => {
  const contract = getContract({
    client: client,
    address: factoryAddress,
    chain: chains[chainName],
  });

  const predictedAddress = await readContract({
    contract,
    method: "function getAddress(address,bytes) view returns (address)",
    params: [personalWallet, "0x"],
  });

  return predictedAddress;
};

export const ipfsUrlToHttp = (ipfsUrl: string): string => {
  if (!ipfsUrl) return "";
  if (ipfsUrl.includes("ipfs://")) {
    const cfIpfsGatewayBaseUrl = `https://${thirdWebClientId}.ipfscdn.io/ipfs/`;
    const ipfsCID = ipfsUrl.substring(7);

    return `${cfIpfsGatewayBaseUrl}${ipfsCID}`;
  }

  return ipfsUrl;
};
