import { createButton } from "@components/crossmint/paymentOptions";
import { parentDiv } from "../../index";
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
import { loadHomePage } from "@components/home";
import { walletTypes } from "../../types/index";

export let smartAccount: Account;
export let wallet: Wallet;
export let connectedWalletType: walletTypes;

export const connectWithMetamask = async () => {
  try {
    wallet = createWallet("io.metamask");
    smartAccount = await wallet.connect({
      client: client,
    }); // connect to it
    connectedWalletType = "metamask";
    console.log("metamask smart account", smartAccount);
    const walletInfoTag = document.createElement("p");
    walletInfoTag.innerHTML = `Metamask Wallet: ${smartAccount?.address}`;
    walletInfoTag.className = "flex flex-row justify-center p-2";

    document.body.prepend(walletInfoTag);
  } catch (error) {
    console.log(error);
  }
};

export const connectEmbeddedWallet = async () => {
  try {
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
    connectedWalletType = "embedded";

    const walletInfoTag = document.createElement("p");
    walletInfoTag.innerHTML = `Embedded Wallet: ${smartAccount?.address}`;
    walletInfoTag.className = "flex flex-row justify-center p-2";
    document.body.prepend(walletInfoTag);
  } catch (error) {
    console.log(error);
  }
};

export const loadWalletOptions = () => {
  const buttonContainer = document.createElement("div");
  buttonContainer.className =
    "flex flex-row justify-center p-4 gap-4 w-auto h-auto";
  buttonContainer.setAttribute("id", "button-container");

  // Initialize buttons
  const metamaskWalleBtn = createButton(
    "Connect with metamask",
    "bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded h-3rem w-200"
  );

  const inAppWalletBtn = createButton(
    "Connect with In-App wallet",
    "bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded h-3rem w-200"
  );

  // Add embedded wallet
  metamaskWalleBtn.addEventListener("click", async () => {
    try {
      await connectWithMetamask();
      loadHomePage();
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  inAppWalletBtn.addEventListener("click", async () => {
    try {
      await connectEmbeddedWallet();
      loadHomePage();
    } catch (e) {
      console.error("error connecting to embedded smart wallet", e);
    }
  });

  // Append buttons to the container
  if (buttonContainer) {
    buttonContainer.appendChild(metamaskWalleBtn);
    buttonContainer.appendChild(inAppWalletBtn);
  }

  if (parentDiv) {
    parentDiv.innerHTML = "";
    parentDiv.appendChild(buttonContainer);
  }
};
