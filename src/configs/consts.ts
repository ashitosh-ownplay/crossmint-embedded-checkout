import {
  Chain,
  anvil,
  arbitrum,
  arbitrumNova,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  ethereum,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
  zora,
  zoraSepolia,
} from "thirdweb/chains";

/// Crossmint stuff
export const cityBuildingsCollectionId: Record<string, string> = {
  polgonAmoy: "",
  // sepolia: "687898d5-46de-474a-b59c-7a16caa9132e", // non burnable city buildings eth
  sepolia: "a7f3cd86-f678-4be4-a84f-9b595f171b24", // non-burnable city buildings usdc
  // "sepolia": "d5a872c0-a804-42d1-8e4c-bea52102b3fa", burnable one
  // "arbitrumNova": "21c60d08-b1f9-4098-8fbd-5969a3b0cf87" // Dummy for now ... // eth
  arbitrumNova: "75b30a9b-6c06-4492-a8dc-a3b2a7a141af", // Dummy for now ... // usdc
  // "base": "23e3fa45-45b8-4b68-be18-fc80b627e742" // Dummy for now ... // eth
  base: "3895004a-ce39-4d18-b6f7-32db2a75e1ea", // Dummy for now ... // usdc
  baseSepolia: "a1da7cbd-a873-4b0a-8e19-c44b85d4af76", // non-burnable city buildings usdc
};
export const packagesCollectionId: Record<string, string> = {
  polgonAmoy: "",
  // sepolia: "d81dbe97-ca32-46bd-85fa-53eb2bbc9848", // eth
  sepolia: "c7e57fc1-17ee-4bed-9273-149264eddbd4", // usdc
  arbitrumNova: "e7a3ea0e-20ec-4bdf-984f-3af071d36f68", // Dummy for now ...
  base: "2b3f3580-1a63-44a0-9d57-74404d08e341", // Dummy for now...
  baseSepolia: "efc7d444-1838-4133-a377-0f17dee0659a",
};

export const giftPackagesCollectionId: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "792a1488-6113-4166-bb91-de6f09aaa975", // usdc
  arbitrumNova: "",
  base: "",
  baseSepolia: "bf4ba7d1-d4ea-450d-b93c-0de307884a28",
};

export const reservoirCollectionId: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "9505630e-fdaf-4ede-999a-8a1c988e703c",
  arbitrumNova: "6f91d13b-47e2-43f3-a936-191cfedaa2f5",
  base: "9043b077-d6d6-4103-92ca-b04632534241",
  baseSepolia: "dbc8f7ee-6701-4c8a-bb51-6361d17e8703",
};

export const smartWalletFactory: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "0xBa0DF2f5722aE7bB015F896A32dA63367Ea29559", // Immutable Account Factory
  // sepolia: "0x21187414d973891032AdfD52e8808adA893dB60b", // Managed Account Factory
  arbitrumNova: "0x3f743c7417E1db677710371f4fd193c10322F666", // Immutable Account Factory
  base: "0xcEac86626c7c5571118Cb7A3522d83B28c7c419E", // Managed Account Factory
  baseSepolia: "0xcEac86626c7c5571118Cb7A3522d83B28c7c419E", // Managed Account Factory
};

export const cityBuildingsNFTAddress: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "0xbe2290df49503844B851Fb31694fD546b2667dD3", // non-burnable
  // "sepolia": "0xf688b7201f29953A6828D3834Bd7164Dfd051f28", // burnable city buildings
  arbitrumNova: "0x56D2b86dB9c8aa3fFFE5d4f9e54a51b31C975277", // Dummy for now ...
  base: "0xBE27f83D6d9116C9bd0C610054b306d2A1f33D2f", // Dummy for now ...
  baseSepolia: "0xFfdd56faC3A5A87b574b1E9ed0F826879811d7D3",
};
export const packagesNFTAddress: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "0x9506D39EDd348314E6Ad8665a54e50cd660D35f3",
  arbitrumNova: "0xb8043620Ef662995b5bcBB6E5c39162642304894", // Dummy for now ...
  base: "0x020FA69b70C0DF82A0BEf5f8f652e746E68079ed", // Dummt for now
  baseSepolia: "0x77Fc0BDE9a8380602F3Da53c2E43367237B1f6EE",
};
export const giftPackageNFTAddress: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "0xc215dDc236826132F360A1f4CED208aDD526c8c8",
  arbitrumNova: "",
  base: "0x02159c5C8FB954B2932CAA04fE5B946861333746", // Dummy for now
  baseSepolia: "0x15a1fa39a4A24940625052aAcb1A0617B4AEbA86",
};
export const piggyClubNFTAddress: Record<string, string> = {
  ethereum: "0xa7778fB887F06Df9ddB0f7f6BF433A11bcB5a76A",
  polgonAmoy: "",
  // sepolia: "0x2bFAa77DCE822ca682Ad9459035533A0e29bf586", // testnet piggy collection from xterio
  sepolia: "0xf6dBa02aF0A18e1914C2F323a0be14faF492E5Db", // testnet drop collection for piggy
  arbitrumNova: "",
  base: "",
  baseSepolia: "",
};

export const usdcAddress: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F",
  arbitrumNova: "0x750ba8b76187092B0D1E87E28daaf484d1b5273b",
  base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  baseSepolia: "0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F",
};

// For reservoir
// Reservoir supported chains --> https://docs.reservoir.tools/reference/supported-chains
export const reservoirBaseUri: Record<string, string> = {
  polgonAmoy: "https://api-amoy.reservoir.tools/",
  sepolia: "https://api-sepolia.reservoir.tools/",
  arbitrumNova: "https://api-arbitrum-nova.reservoir.tools/",
  base: "https://api-base.reservoir.tools/",
  baseSepolia: "https://api-base-sepolia.reservoir.tools/",
};

// TODO - update ReservoirChain type in place of any
export const reservoirChains: Record<string, any> = {
  polygonMumbai: {
    id: 80002,
    name: "Polygon Amoy",
    baseApiUrl: reservoirBaseUri["polygonAmoy"],
    active: true,
  },
  sepolia: {
    id: 11155111,
    name: "Ethereum Sepolia",
    baseApiUrl: reservoirBaseUri["sepolia"],
    active: true,
  },
  arbitrumNova: {
    id: 42170,
    name: "Arbitrum Nova",
    baseApiUrl: reservoirBaseUri["arbitrumNova"],
    active: true,
  },
  base: {
    id: 8453,
    name: "Base",
    baseApiUrl: reservoirBaseUri["base"],
    active: true,
  },
  baseSepolia: {
    id: 84532,
    name: "Base Sepolia",
    baseApiUrl: reservoirBaseUri["baseSepolia"],
    active: true,
  },
};

export const nativeCurrencySymbol: Record<string, string> = {
  polgonAmoy: "MATIC",
  sepolia: "ETH",
  arbitrumNova: "ETH",
  base: "ETH",
  baseSepolia: "ETH",
};

export const crossmintProjectId = process.env.CROSSMINT_PROJECT_ID;

export const chainName = process.env.CHAIN_NAME || "sepolia";

export const chains: Record<string, Chain> = {
  anvil: anvil,
  arbitrumNova: arbitrumNova,
  arbitrumSepolia: arbitrumSepolia,
  arbitrum: arbitrum,
  avalancheFuji: avalancheFuji,
  avalanche: avalanche,
  baseSepolia: baseSepolia,
  base: base,
  ethereum: ethereum,
  optimismSepolia: optimismSepolia,
  optimism: optimism,
  polgonAmoy: polygonAmoy,
  polygon: polygon,
  sepolia: sepolia,
  zoraSepolia: zoraSepolia,
  zora: zora,
};

export const thirdWebClientId = process.env.TW_CLIENT_ID;
export const backendWalletPK = process.env.BACKEND_WALLET_PK;

export const isUsdcEnabled = process.env.USDC_ENABLED === "true";

// crossmint initial data
export const projectId = "42c43e55-f92d-4b25-bc99-d8309b6e1f38";
export const collectionId = "a7f3cd86-f678-4be4-a84f-9b595f171b24";
export const environment = process.env.CROSSMINT_ENV || "staging";

export const SALE_DURATION_SECONDS = 604800; // One week in seconds
export const marketplaceSource = "cityverse.tycoon.test";
export const royaltyRecipient = "0xA0fdFBfB2FB279eFCa16266d509c50Ed83d31643";
export const royaltyBps = "500"; // 5%
export const primarySaleRecipient =
  "0xA0fdFBfB2FB279eFCa16266d509c50Ed83d31643";
export const signatureValidityPeriod = 10 * 86400; // day in seconds
