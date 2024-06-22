import {
  IncomingInternalEvent,
  IncomingInternalEvents,
  crossmintIFrameService,
  CrossmintEmbeddedCheckoutProps,
} from "@client-sdk-base/src";
import { crossmintChild } from "..";

type CrossmintEmbeddedCheckoutIFrameProps = CrossmintEmbeddedCheckoutProps & {
  onInternalEvent?: (event: IncomingInternalEvent) => void;
};

export function createCrossmintEmbeddedCheckoutIFrame(
  props: CrossmintEmbeddedCheckoutIFrameProps
) {
  const { getUrl, listenToEvents, listenToInternalEvents } =
    crossmintIFrameService(props);
  let height = 800;
  const url = getUrl(props);

  // Create iframe element
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.id = "crossmint-embedded-checkout.iframe";
  iframe.role = "crossmint-embedded-checkout.iframe";
  iframe.allow = "payment *";
  iframe.style.boxShadow = "none !important";
  iframe.style.border = "none !important";
  iframe.style.padding = "0px !important";
  iframe.style.width = "100% !important";
  iframe.style.minWidth = "100% !important";
  iframe.style.overflow = "hidden !important";
  iframe.style.display = "block !important";
  iframe.style.userSelect = "none";
  iframe.style.transform = "translate(0px) !important";
  iframe.style.opacity = "1";
  iframe.style.transition = "ease 0s, opacity 0.4s ease 0.1s";
  iframe.style.height = `${height}px`;

  // Function to update iframe height
  function setHeight(newHeight: number) {
    height = newHeight;
    iframe.style.height = `${height}px`;
  }

  // Handle public events
  const clearPublicListener = listenToEvents((event) =>
    props.onEvent?.(event.data)
  );

  // Handle internal events
  const clearInternalListener = listenToInternalEvents((event) => {
    const { type, payload } = event.data;

    if (type === IncomingInternalEvents.UI_HEIGHT_CHANGED) {
      setHeight(payload.height);
    }

    props.onInternalEvent?.(event.data);
  });

  // Append child to crossmint
  if (crossmintChild) {
    crossmintChild.innerHTML = "";
    crossmintChild.appendChild(iframe);
  }

  // Cleanup function to remove listeners
  function cleanup() {
    clearPublicListener();
    clearInternalListener();
  }

  cleanup();

  // // Ensure cleanup is called when the iframe is removed from the DOM
  // iframe.addEventListener("load", () => {
  //   window.addEventListener("beforeunload", cleanup);
  //   iframe.addEventListener("remove", cleanup);
  // });

  return iframe;
}
