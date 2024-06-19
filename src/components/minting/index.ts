// Define Minting function

import { useCrossmintEvents } from "@client-sdk-base/src";
import { crossmintParent } from "@components/crossmint";
import sphere from "../../sphere.gif";
import { environment } from "@configs/consts";

export function Minting(orderIdentifier: string) {
  // Define status and result variables
  let status = "pending";
  let result: any;
  console.log("minting with order id: ", orderIdentifier);

  render(); // Call render function to update the DOM

  const { listenToMintingEvents } = useCrossmintEvents({
    environment: environment,
  });

  // Function to update status and result
  function updateStatus(newStatus: string, newResult?: any) {
    status = newStatus;
    result = newResult;
    render(); // Call render function to update the DOM
  }

  // Function to listen to minting events
  if (status === "pending") {
    listenToMintingEvents({ orderIdentifier }, (event) => {
      switch (event.type) {
        case "transaction:fulfillment.succeeded":
          updateStatus("success", event.payload);
          break;
        case "transaction:fulfillment.failed":
          status = "failure";
          updateStatus("failure", event.payload);
          break;
        default:
          break;
      }
      console.log(event.type, ":", event);
    });
  }

  // Function to render the component
  function render() {
    const container = document.createElement("div");
    container.className = "text-black font-mono p-5 text-center";

    if (status === "pending") {
      const pendingContent = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = "Minting your NFT...";
      const image = document.createElement("img");
      image.src = sphere;
      image.width = 256;
      image.height = 256;
      image.className = "shrink mx-auto mt-10";
      image.alt = "processing animation";
      const p = document.createElement("p");
      p.textContent = "This may take up to a few minutes";

      pendingContent.appendChild(h3);
      pendingContent.appendChild(image);
      pendingContent.appendChild(p);
      container.appendChild(pendingContent);
    } else if (status === "success") {
      const successContent = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = "NFT Minted Successfully!";
      const links = document.createElement("div");
      links.className = "mt-10";

      const viewOnOpenSea = createLink(
        "https://testnets.opensea.io/assets/sepolia/",
        result?.contractAddress,
        result?.tokenIds[0],
        "View on OpenSea"
      );
      // set opensea button design
      viewOnOpenSea.setAttribute(
        "class",
        "block bg-blue-500 rounded-lg mt-3 p-3 text-white"
      );

      const viewOnPolygonscan = createLink(
        "https://sepolia.etherscan.io/tx/",
        result?.txId,
        null,
        "View on Polygonscan"
      );

      // set polygonscan button design
      viewOnPolygonscan.setAttribute(
        "class",
        "block bg-purple-800 rounded-lg mt-3 p-3 text-white"
      );

      const viewInCrossmint = createLink(
        "https://staging.crossmint.com/user/collection/sepolia:",
        result?.contractAddress + ":" + result?.tokenIds[0],
        null,
        "View in Crossmint"
      );
      viewInCrossmint.setAttribute(
        "class",
        "block bg-green-300 rounded-lg mt-3 p-3 text-white"
      );

      links.appendChild(viewOnOpenSea);
      links.appendChild(viewOnPolygonscan);
      links.appendChild(viewInCrossmint);
      successContent.appendChild(h3);
      successContent.appendChild(links);
      container.appendChild(successContent);
    } else if (status === "failure") {
      const failureContent = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = "Failed to Mint NFT";
      const p = document.createElement("p");
      p.textContent =
        "Something went wrong. You will be refunded if the mint cannot be fulfilled successfully.";

      failureContent.appendChild(h3);
      failureContent.appendChild(p);
      container.appendChild(failureContent);
    }

    if (crossmintParent) {
      crossmintParent.innerHTML = "";
      crossmintParent?.appendChild(container);
    }
  }

  // Function to create a link element
  function createLink(
    baseUrl: string,
    param1: string | undefined,
    param2: string | number | null | undefined,
    text: string | null
  ) {
    const link = document.createElement("a");
    link.href = baseUrl + param1 + (param2 ? "/" + param2 : "");
    link.target = "_blank";
    link.className = "block bg-[#2081e2] rounded-lg mt-3 p-3 text-white";
    link.textContent = text;
    return link;
  }

  // Call listenToMintingEvents function to simulate listening to minting events
}

// Call the Minting function with the order identifier
// Minting("your_order_identifier_here");
