import {
  royaltyRecipient,
  royaltyBps,
  primarySaleRecipient,
  signatureValidityPeriod,
  cityBuildingsNFTAddress,
  chainName,
  backendWalletPK,
  reservoirChains,
} from "@configs/consts";
import { ERC721MintWithSignatureParams } from "@configs/dynamicNFTdata";
import { TypedMessage, signTypedData_v4 } from "eth-sig-util";
import { toBuffer } from "ethereumjs-util";
import { sha256 } from "js-sha256";

export type ERC721MintRequest = {
  to: string;
  royaltyRecipient: string;
  royaltyBps: number;
  primarySaleRecipient: string;
  uri: string;
  price: string;
  currency: string;
  validityStartTimestamp: number;
  validityEndTimestamp: number;
  uid: string;
};

export const signingTypes = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ],
  MintRequest: [
    { name: "to", type: "address" },
    { name: "royaltyRecipient", type: "address" },
    { name: "royaltyBps", type: "uint256" },
    { name: "primarySaleRecipient", type: "address" },
    { name: "uri", type: "string" },
    { name: "price", type: "uint256" },
    { name: "currency", type: "address" },
    { name: "validityStartTimestamp", type: "uint128" },
    { name: "validityEndTimestamp", type: "uint128" },
    { name: "uid", type: "bytes32" },
  ],
};

export type MessageTypes = typeof signingTypes;

export type Message<T extends keyof MessageTypes> = T extends "MintRequest"
  ? ERC721MintRequest
  : never;

export type Domain = TypedMessage<MessageTypes>["domain"];

export function getTypedMesssage<T extends keyof MessageTypes>(
  primaryType: T,
  domain: Domain,
  message: Message<T>
): TypedMessage<MessageTypes> {
  return {
    types: signingTypes,
    primaryType,
    domain,
    message,
  };
}

export function getTypedDomain(
  chainId: number,
  verifyingContractAddress: string
): Domain {
  return {
    name: "TokenERC721",
    version: "1",
    chainId,
    verifyingContract: verifyingContractAddress.toLowerCase(),
  };
}

export async function getErc721MintSignature(
  chainId: number,
  verifyingContractAddress: string,
  message: ERC721MintRequest,
  signerOrPrivateKey: any
): Promise<string> {
  const domain = getTypedDomain(chainId, verifyingContractAddress);
  if (typeof signerOrPrivateKey === "string") {
    const pkToBuffer = toBuffer(signerOrPrivateKey);
    const typedMessage = getTypedMesssage("MintRequest", domain, message);

    return signTypedData_v4(pkToBuffer, {
      data: typedMessage,
    });
  }

  return signerOrPrivateKey._signTypedData(
    domain,
    {
      ERC721MintRequest: signingTypes.MintRequest,
    },
    {
      to: message.to,
      royaltyRecipient: message.royaltyRecipient,
      royaltyBps: message.royaltyBps,
      primarySaleRecipient: message.primarySaleRecipient,
      uri: message.uri,
      currency: message.currency,
      validityStartTimestamp: message.validityStartTimestamp,
      validityEndTimestamp: message.validityEndTimestamp,
      uid: message.uid,
    }
  );
}

export async function prepareSignatureMint(
  wallet: string,
  nft: ERC721MintWithSignatureParams
) {
  // we do now - 5 seconds as some times we are the block timestamp is before the `validityStartTimestamp`
  const timestampNowInSeconds = Math.floor(Date.now() / 1000) - 5000;
  const uuidHash = sha256(nft.uid);
  const mintRequest: ERC721MintRequest = {
    to: wallet!,
    royaltyRecipient: royaltyRecipient,
    royaltyBps: Number(royaltyBps),
    primarySaleRecipient: primarySaleRecipient,
    uri: nft.uri,
    price: nft.price,
    currency: nft.currency,
    uid: `0x${uuidHash}`,
    validityStartTimestamp: timestampNowInSeconds,
    validityEndTimestamp: timestampNowInSeconds + signatureValidityPeriod,
  };
  const signature = await getErc721MintSignature(
    reservoirChains[chainName].id,
    cityBuildingsNFTAddress[chainName],
    mintRequest,
    backendWalletPK!
  );

  return {
    mintRequest,
    signature,
  };
}
