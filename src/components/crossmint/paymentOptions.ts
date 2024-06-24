import { crossmintChild, crossmintParent } from ".";
import { loadCardPayment } from "./cardPayment/crossmintPayment";
import {
  Account,
  Wallet,
  createWallet,
  inAppWallet,
  smartWallet,
} from "thirdweb/wallets";
import { client } from "@configs/client";
import { chainName, chains, smartWalletFactory } from "@configs/consts";
import { predictSmartWalletAddress } from "@utils/index";
import { loadCryptoPayment } from "./cryptoPayment/cryptoPayment";
import { IMintInfo } from "../../types/index";
import { connectedWalletType, smartAccount, wallet } from "@components/wallet";

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

export async function getSmartWallet() {
  try {
    const isInAppWalletEnabled = process.env.ENABLE_IN_APP_WALLET;
    if (isInAppWalletEnabled === "true") {
      let wallet: Wallet;
      let smartAccount: Account;

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
      return { smartAccount, wallet };
    } else {
      const mmWallet = createWallet("io.metamask");
      const mmAccount = await mmWallet.connect({
        client,
      }); // connect to it
      return { smartAccount: mmAccount, wallet: mmWallet };
    }
  } catch (error) {
    console.log(error);
  }
}
export function loadButtonsForPayment(mintInfo?: IMintInfo) {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "flex space-x-4 p-4";
  buttonContainer.setAttribute("id", "button-container");

  // Initialize buttons
  const cryptoButton = createButton(
    "Pay with Crypto",
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  );

  if (connectedWalletType === "embedded") {
    cryptoButton.disabled = true;
    cryptoButton.className =
      "bg-gray-300 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded";
  }

  const cardButton = createButton(
    "Pay with Card",
    "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
  );

  // Add embedded wallet
  cryptoButton.addEventListener("click", async () => {
    try {
      if (wallet && smartAccount) {
        await loadCryptoPayment(smartAccount, wallet, mintInfo);
      }
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  cardButton.addEventListener("click", async () => {
    try {
      if (wallet && smartAccount) {
        await loadCardPayment(smartAccount, mintInfo);
      }
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  // Append buttons to the container
  if (buttonContainer) {
    buttonContainer.appendChild(cryptoButton);
    buttonContainer.appendChild(cardButton);
  }

  if (crossmintParent) {
    crossmintParent.innerHTML = "";
    crossmintParent.appendChild(buttonContainer);
    crossmintParent.appendChild(crossmintChild);
  }
}
