import {
  CrossmintEmbeddedCheckoutProps,
  IncomingInternalEvent,
  IncomingInternalEvents,
  PaymentMethod,
  crossmintIFrameService,
} from "@client-sdk-base/src";
import { crossmintParent } from "..";
import { Minting } from "@components/minting";
import {
  chainName,
  chains,
  collectionId,
  environment,
  projectId,
} from "@configs/consts";
import { EVMBlockchainIncludingTestnet } from "@common-sdk-base/src";

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

function getCardProps() {
  return {
    projectId: projectId,
    collectionId: collectionId,
    environment: environment,
    emailInputOptions: {
      show: true,
    },
    mintConfig: {
      type: "erc-721",
      totalPrice: "0.001",
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

export const loadCardPayment = () => {
  CrossmintEmbeddedCheckoutIFrame(getCardProps());
};
