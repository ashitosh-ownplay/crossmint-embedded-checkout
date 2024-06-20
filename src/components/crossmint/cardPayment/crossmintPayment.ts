import {
  CrossmintEmbeddedCheckoutProps,
  IncomingInternalEvent,
  IncomingInternalEvents,
  PaymentMethod,
  crossmintIFrameService,
} from "@client-sdk-base/src";
import { Minting } from "@components/minting";
import {
  chainName,
  cityBuildingsCollectionId,
  crossmintProjectId,
  environment,
} from "@configs/consts";
import { cityBuildings } from "@configs/dynamicNFTdata";
import { prepareSignatureMint } from "@utils/erc721MintSignature";
import { NATIVE_TOKEN_ADDRESS, toEther } from "thirdweb";
import { Account } from "thirdweb/wallets";
import { crossmintParent } from "..";

let buildingIndex = 0;

type CrossmintEmbeddedCheckoutIFrameProps = CrossmintEmbeddedCheckoutProps & {
  onInternalEvent?: (event: IncomingInternalEvent) => void;
};

// CrossmintEmbeddedCheckoutIFrame function
function CrossmintEmbeddedCheckoutIFrame(
  props: CrossmintEmbeddedCheckoutIFrameProps
) {
  const { getUrl, listenToEvents, listenToInternalEvents } =
    crossmintIFrameService(props);

  let height = 800;
  const url = getUrl(props);

  console.log(" iframe url: ", url);

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.id = "crossmint-embedded-checkout.iframe";
  iframe.role = "crossmint-embedded-checkout.iframe";
  iframe.allow = "payment *";
  iframe.style.cssText = `
        box-shadow: none !important;
        border: none !important;
        padding: 0px !important;
        width: 100% !important;
        min-width: 100% !important;
        overflow: hidden !important;
        display: block !important;
        user-select: none;
        transform: translate(0px) !important;
        opacity: 1;
        transition: ease 0s, opacity 0.4s ease 0.1s;
        height: ${height}px;
    `;

  // Public events
  const clearPublicListener = listenToEvents((event) => {
    console.log("clearPublicListener event: ", event);

    if (props.onEvent) {
      props.onEvent(event.data);
    }
  });

  // Internal events
  const clearInternalListener = listenToInternalEvents((event) => {
    const { type, payload } = event.data;
    console.log("clearInternalListener event: ", event);

    if (type === IncomingInternalEvents.UI_HEIGHT_CHANGED) {
      height = payload.height;
      iframe.style.height = `${height}px`;
    }

    if (props.onInternalEvent) {
      props.onInternalEvent(event.data);
    }
  });

  // Append child to crossmint
  if (crossmintParent) {
    crossmintParent.innerHTML = "";
    crossmintParent.appendChild(iframe);
  }

  // Clean up function
  return function cleanup() {
    clearPublicListener();
    clearInternalListener();
    // crossmintParent.removeChild(iframe);
  };
}

async function getCardProps(account: Account) {
  const { mintRequest: mintReq, signature: sig } = await prepareSignatureMint(
    account?.address,
    cityBuildings[buildingIndex]
  );
  console.log("buildingIndex: ", buildingIndex);
  console.log("sig: ", sig);
  console.log("mintReq: ", mintReq);

  return {
    projectId: crossmintProjectId,
    collectionId: cityBuildingsCollectionId[chainName],
    environment: environment,
    paymentMethod: PaymentMethod.FIAT,
    preferredSigninMethod: "metamask",
    recipient: { wallet: account?.address },
    emailInputOptions: {
      show: true,
    },
    mintConfig: {
      // type: "erc-721",
      totalPrice:
        mintReq.currency.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()
          ? toEther(BigInt(mintReq.price))
          : String(Number(mintReq.price) / 10 ** 6), // NOTE - 6 -decimal of USDC
      _req: mintReq, // mintRequest,
      _signature: sig, // signature
    },
    onEvent: (event: { type: any; payload: { orderIdentifier: string } }) => {
      switch (event.type) {
        case "payment:process.succeeded":
          const orderIdentifier = event.payload.orderIdentifier;
          Minting(orderIdentifier);
          break;
        default:
          console.log(event);
          break;
      }
    },
  };
}

export const loadCardPayment = async (account?: Account) => {
  try {
    if (account) {
      const props = await getCardProps(account);

      if (!props) return;

      CrossmintEmbeddedCheckoutIFrame(props);
    }
  } catch (error) {
    console.log("error in card: ", error);
  }
};
