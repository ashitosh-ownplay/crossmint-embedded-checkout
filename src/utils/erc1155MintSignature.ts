import { client } from "@configs/client";
import {
  backendWalletPK,
  signatureValidityPeriod,
  royaltyRecipient,
  royaltyBps,
  primarySaleRecipient,
} from "@configs/consts";
import { ERC1155intWithSignatureParams } from "@configs/dynamicNFTdata";
import { createHash } from "crypto";
import { Address, NATIVE_TOKEN_ADDRESS, ThirdwebContract } from "thirdweb";
import { generateMintSignature } from "thirdweb/extensions/erc1155";
import { privateKeyToAccount } from "thirdweb/wallets";

export type Hex = `0x${string}`;

export type GeneratePayloadInput = {
  to: string;
  quantity: bigint;
  royaltyRecipient?: Address;
  royaltyBps?: number;
  primarySaleRecipient?: Address;
  pricePerToken?: string;
  pricePerTokenWei?: bigint;
  currency?: Address;
  validityStartTimestamp?: Date;
  validityEndTimestamp?: Date;
  uid?: Hex;
} & (
  | {
      metadata: /* NFTInput */ any | string;
    }
  | { tokenId: bigint }
);

export type ERC1155SignatureMintResult = {
  payload: any;
  signature: string;
};

export async function prepareSignatureMint(
  giftPack: ERC1155intWithSignatureParams,
  contract: ThirdwebContract,
  toAddress: string,
  amount = 1
): Promise<ERC1155SignatureMintResult> {
  if (!giftPack || giftPack?.tokenId === undefined)
    return {} as ERC1155SignatureMintResult;

  const backendWallet = privateKeyToAccount({
    client: client,
    privateKey: backendWalletPK!,
  });
  console.log(backendWallet.address);

  // 5 min before to make sure that we don't get contract error on timestamps
  const currentTimestamp = new Date(Date.now() - 1000 * 60 * 5);
  const endTimestamp = new Date(Date.now() + signatureValidityPeriod);

  const uuidHash = createHash("sha256")
    .update(`${giftPack.uid}${generateRandomString(10)}`)
    .digest("hex");

  const { payload, signature } = await generateMintSignature({
    contract,
    account: backendWallet,
    mintRequest: {
      to: toAddress,
      royaltyRecipient: royaltyRecipient,
      royaltyBps: Number(royaltyBps),
      primarySaleRecipient: primarySaleRecipient,
      tokenId: BigInt(giftPack.tokenId),
      quantity: BigInt(amount),
      pricePerToken: giftPack.price,
      currency: giftPack.currency || NATIVE_TOKEN_ADDRESS,
      validityStartTimestamp: currentTimestamp,
      validityEndTimestamp: endTimestamp,
      uid: `0x${uuidHash}`,
    },
  });
  const parsedPayload = parseMintRequestPayload(payload);

  return { payload: parsedPayload, signature };
}

export const parseMintRequestPayload = (payload: any) => {
  return {
    ...payload,
    royaltyBps: Number(payload.royaltyBps),
    quantity: Number(payload.quantity),
    pricePerToken: String(payload.pricePerToken),
    tokenId: Number(payload.tokenId),
    validityStartTimestamp: Number(payload.validityStartTimestamp),
    validityEndTimestamp: Number(payload.validityEndTimestamp),
  };
};

export const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
