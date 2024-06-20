import {
  CryptoEmbeddedCheckoutPropsWithSigner,
  ETHEmbeddedCheckoutSigner,
  IncomingInternalEvent,
  IncomingInternalEvents,
  OutgoingInternalEvents,
  PaymentMethod,
  crossmintIFrameService,
  embeddedCheckoutPropsToUpdatableParamsPayload,
} from "@client-sdk-base/src";
import { EVMBlockchainIncludingTestnet } from "@common-sdk-base/src";
import { Minting } from "@components/minting";
import { client } from "@configs/client";
import {
  chainName,
  chains,
  cityBuildingsCollectionId,
  crossmintProjectId,
  environment,
} from "@configs/consts";
import { cityBuildings } from "@configs/dynamicNFTdata";
import { prepareSignatureMint } from "@utils/erc721MintSignature";
import {
  NATIVE_TOKEN_ADDRESS,
  prepareTransaction,
  sendAndConfirmTransaction,
  toEther,
} from "thirdweb";
import { Account, Wallet } from "thirdweb/wallets";
import { createCrossmintEmbeddedCheckoutIFrame } from "./crossmintEmbeddedIframe";

let buildingIndex = 0;

// This function is equivalent to the React component
export function createCryptoEmbeddedCheckoutIFrame(
  props: CryptoEmbeddedCheckoutPropsWithSigner
) {
  const { emitInternalEvent } = crossmintIFrameService(props);
  const { signer, paymentMethod } = props;

  function onInternalEvent(event: IncomingInternalEvent) {
    const { type, payload } = event;

    if (type === IncomingInternalEvents.CRYPTO_PAYMENT_INCOMING_TRANSACTION) {
      const { serializedTransaction } = payload;
      console.log(
        "[Crossmint] Received incoming transaction",
        serializedTransaction
      );
      handleIncomingTransaction(serializedTransaction);
    }

    if (type === IncomingInternalEvents.CRYPTO_CHAIN_SWITCH) {
      const { chain } = payload;
      console.log("[Crossmint] Received change of chain", chain);

      const handleChainSwitch = (signer as ETHEmbeddedCheckoutSigner)
        .handleChainSwitch;
      if (handleChainSwitch == null) {
        throw new Error("switchNetwork function should have been defined");
      }
      handleChainSwitch(chain as EVMBlockchainIncludingTestnet);
    }
  }

  async function handleIncomingTransaction(serializedTransaction: string) {
    try {
      let txId: string;
      switch (paymentMethod) {
        // case "SOL":
        //   txId = await handleSOLTransaction(signer, serializedTransaction);
        //   break;
        case "ETH":
          txId = await handleETHTransaction(signer, serializedTransaction);
          break;
        default:
          throw new Error(`Unsupported payment method ${paymentMethod}`);
      }

      console.log("[Crossmint] Signed and sent transaction", txId);
      emitInternalEvent({
        type: OutgoingInternalEvents.CRYPTO_PAYMENT_USER_ACCEPTED,
        payload: {
          txId,
        },
      });
    } catch (e) {
      console.error("[Crossmint] Failed to sign and send transaction", e);
      emitInternalEvent({
        type: OutgoingInternalEvents.CRYPTO_PAYMENT_USER_REJECTED,
        payload: {},
      });
    }
  }

  // async function handleSOLTransaction(
  //   signer: SOLEmbeddedCheckoutSigner,
  //   serializedTransaction: string
  // ) {
  //   const transaction = Transaction.from(bs58.decode(serializedTransaction));
  //   console.log("[Crossmint] Deserialized SOL transaction", transaction);

  //   return await signer.signAndSendTransaction(transaction);
  // }

  async function handleETHTransaction(
    signer: ETHEmbeddedCheckoutSigner,
    serializedTransaction: string
  ) {
    const { parse: parseTransaction } =
      await require("@ethersproject/transactions");
    const transaction = parseTransaction(serializedTransaction);
    console.log("[Crossmint] Deserialized ETH transaction", transaction);

    return await signer.signAndSendTransaction(transaction);
  }

  // Equivalent to useEffect in React
  function initialize() {
    emitInternalEvent({
      type: "params-update",
      payload: embeddedCheckoutPropsToUpdatableParamsPayload(props),
    });
  }

  // Create and return the iframe element
  function createIframe() {
    const iframe = createCrossmintEmbeddedCheckoutIFrame({
      ...props,
      onInternalEvent,
    });

    return iframe;
  }

  // Initialize the component
  initialize();

  return createIframe();
}

async function getCryptoProps(account: Account, wallet?: Wallet) {
  const { mintRequest: mintReq, signature: sig } = await prepareSignatureMint(
    account?.address,
    cityBuildings[buildingIndex]
  );
  console.log("buildingIndex: ", buildingIndex);
  console.log("sig: ", sig);
  console.log("mintReq: ", mintReq);

  // Example usage
  return {
    projectId: crossmintProjectId,
    collectionId: cityBuildingsCollectionId[chainName],
    environment: environment,
    paymentMethod: PaymentMethod.ETH,
    recipient: { wallet: account?.address },
    signer: {
      address: account?.address, // public address of connected wallet
      signAndSendTransaction: async (transaction: any) => {
        const preparedTx = prepareTransaction({
          chain: transaction.chainId,
          nonce: transaction.nonce,
          maxPriorityFeePerGas: BigInt(transaction.maxPriorityFeePerGas._hex),
          maxFeePerGas: BigInt(transaction.maxFeePerGas._hex),
          gas: BigInt(transaction.gasLimit._hex),
          to: transaction.to,
          value: BigInt(transaction.value._hex),
          data: transaction.data,
          accessList: transaction.accessList,
          client: client,
        });

        const { transactionHash } = await sendAndConfirmTransaction({
          // assuming you have called `prepareTransaction()` or `prepareContractCall()` before which returns the prepared transaction to send
          transaction: preparedTx,
          // Pass the account to sign the transaction with
          account,
        });

        return transactionHash;
      },
      chain:
        chainName === "base"
          ? EVMBlockchainIncludingTestnet.BASE
          : EVMBlockchainIncludingTestnet.ETHEREUM_SEPOLIA, // the currently selected chain
      supportedChains: [
        EVMBlockchainIncludingTestnet.BASE,
        EVMBlockchainIncludingTestnet.ETHEREUM_SEPOLIA,
      ], // array of chains you want to enable crosschain payments on
      handleChainSwitch: async (chain: any) => {
        console.log(chain);
        // custom logic to trigger a network change in the connected wallet
        wallet?.switchChain(chains[chainName]);
      },
    },
    mintConfig: {
      // type: "erc-721",
      totalPrice:
        mintReq?.currency.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()
          ? toEther(BigInt(mintReq.price))
          : String(Number(mintReq?.price) / 10 ** 6), // NOTE - 6 -decimal of USDC
      _req: mintReq, // mintRequest,
      _signature: sig, // signature
    },
    onEvent: async (event: {
      type: any;
      payload: { orderIdentifier: string; error?: any };
    }) => {
      switch (event.type) {
        case "payment:process.succeeded":
          const orderIdentifier = event.payload.orderIdentifier;
          Minting(orderIdentifier);
          break;
        case "payment:preparation.failed":
          if (event?.payload?.error?.message === "Error(invalid signature)") {
            buildingIndex += 1;
            const props = await getCryptoProps(account);

            if (!props) return;

            createCryptoEmbeddedCheckoutIFrame(props);
          }
          break;
        default:
          console.log(event);
          break;
      }
    },
  };
}

export const loadCryptoPayment = async (account?: Account, wallet?: Wallet) => {
  try {
    if (account) {
      const props = await getCryptoProps(account, wallet);

      if (!props) return;

      createCryptoEmbeddedCheckoutIFrame(props);
    }
  } catch (error) {
    console.log("error in crypto: ", error);
  }
};
