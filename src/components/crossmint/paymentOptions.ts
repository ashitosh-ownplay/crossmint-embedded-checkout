import { crossmintParent } from ".";
import { loadCardPayment } from "./cardPayment/crossmintPayment";
import { createWallet, inAppWallet, smartWallet } from "thirdweb/wallets";
import { client } from "@configs/client";
import { chainName, chains, smartWalletFactory } from "@configs/consts";
import { predictSmartWalletAddress } from "@utils/index";
import { loadCryptoPayment } from "./cryptoPayment/cryptoPayment";

// Function to create a button element
export function createButton(
  label: string,
  className: string
): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = label;
  button.className = className;
  return button;
}

export function loadButtonsForPayment() {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "flex space-x-4 p-4";
  buttonContainer.setAttribute("id", "button-container");

  // Initialize buttons
  const cryptoButton = createButton(
    "Pay with Crypto",
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  );

  const cardButton = createButton(
    "Pay with Card",
    "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
  );

  // Add embedded wallet
  cryptoButton.addEventListener("click", async () => {
    try {
      const isInAppWalletEnabled = process.env.ENABLE_IN_APP_WALLET;
      if (isInAppWalletEnabled === "true") {
        let wallet: any;
        let smartAccount: any;

        const ebmedded = inAppWallet({});

        const embeddedAccount = await ebmedded.connect({
          client,
          strategy: "iframe",
          chain: chains[chainName],
        });
        console.log("embeddedAccount.address", embeddedAccount.address);
        wallet = smartWallet({
          factoryAddress: smartWalletFactory[chainName],
          chain: chains[chainName],
          gasless: true,
        });

        const predictedAddress = await predictSmartWalletAddress(
          embeddedAccount.address,
          smartWalletFactory[chainName]
        );

        console.log("predictedAddress", predictedAddress);

        smartAccount = await wallet.connect({
          client,
          personalAccount: embeddedAccount,
        });

        loadCryptoPayment(smartAccount);
      } else {
        const mmWallet = createWallet("io.metamask");
        const mmAccount = await mmWallet.connect({
          client,
        }); // connect to it
        loadCryptoPayment(mmAccount);
      }
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  cardButton.addEventListener("click", () => {
    loadCardPayment();
  });

  // Append buttons to the container
  if (buttonContainer) {
    buttonContainer.appendChild(cryptoButton);
    buttonContainer.appendChild(cardButton);
  }

  if (crossmintParent) {
    crossmintParent.innerHTML = "";
    crossmintParent.appendChild(buttonContainer);
  }
}
