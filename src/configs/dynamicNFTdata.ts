import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import {
  chainName,
  isUsdcEnabled,
  thirdWebClientId,
  usdcAddress,
} from "./consts";

export type NFTAttributes = {
  trait_type: string;
  value: string;
};

export type NFTMetadata = {
  description: string;
  image: string;
  name: string;
  attributes: NFTAttributes[];
};

export type ERC721MintWithSignatureParams = {
  uri: string;
  price: string;
  currency: string;
  uid: string;
  metadata?: NFTMetadata;
};

export type GiftRewards = { coins: number; shields: number; diceRolls: number };

export type ERC1155intWithSignatureParams = {
  name: string;
  tokenId: string;
  uid: string;
  price: string;
  currency?: string;
  rewards: GiftRewards;
};

export const giftPackages: ERC1155intWithSignatureParams[] = [
  {
    name: "Free Hourly Gift", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67000",
    tokenId: "0",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 3 },
  },
  {
    name: "Free Daily Gift #1", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67001",
    tokenId: "1",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 3 },
  },
  {
    name: "Free Daily Gift #2", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67002",
    tokenId: "2",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 5 },
  },
  {
    name: "Free Daily Gift #3", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67003",
    tokenId: "-1",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 8 },
  },
  {
    name: "Free Daily Gift #4", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67004",
    tokenId: "4",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 10 },
  },
  {
    name: "Free Daily Gift #5", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67005",
    tokenId: "5",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 25 },
  },
  {
    name: "Golden Wheel #1", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67006",
    tokenId: "6",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 12 },
  },
  {
    name: "Golden Wheel #2", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67007",
    tokenId: "8",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 20 },
  },
  {
    name: "Golden Wheel #3", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67008",
    tokenId: "9",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 32 },
  },
  {
    name: "Golden Wheel #4", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67009",
    tokenId: "10",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 40 },
  },
  {
    name: "Golden Wheel #5", // comes from chain, but keep it here to easily identify
    uid: "e3c3cac7-f35f-4d1d-9ebf-cf302cd67010",
    tokenId: "11",
    price: "0",
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    rewards: { coins: 0, shields: 0, diceRolls: 100 },
  },
];

export const cityBuildings: ERC721MintWithSignatureParams[] = [
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/0.json`,
    price: !isUsdcEnabled ? "100000000000000" : "1", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6400",
    metadata: {
      name: "10 TEST STREET",
      description: "10 TEST STREET #1 Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/0.png",
      attributes: [
        {
          trait_type: "address",
          value: "10 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6400",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/1.json`,
    price: !isUsdcEnabled ? "200000000000000" : "2", // 0.02 MATIC OR // 0.02 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6401",
    metadata: {
      name: "11 TEST STREET",
      description: "11 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/1.png",
      attributes: [
        {
          trait_type: "address",
          value: "11 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6401",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/2.json`,
    price: !isUsdcEnabled ? "300000000000000" : "3", // 0.03 MATIC OR // 0.03 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6402",
    metadata: {
      name: "12 TEST STREET",
      description: "12 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/2.png",
      attributes: [
        {
          trait_type: "address",
          value: "12 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6402",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/3.json`,
    price: !isUsdcEnabled ? "400000000000000" : "4", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6403",
    metadata: {
      name: "13 TEST STREET",
      description: "13 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/3.png",
      attributes: [
        {
          trait_type: "address",
          value: "13 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6403",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/4.json`,
    price: "5", // 0.05 USDC // ERC20 w. 6 decimals
    currency: usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6404",
    metadata: {
      name: "14 TEST STREET",
      description: "14 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/4.png",
      attributes: [
        {
          trait_type: "address",
          value: "14 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6404",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/5.json`,
    price: !isUsdcEnabled ? "100000000000000" : "6", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6405",
    metadata: {
      name: "15 TEST STREET",
      description: "15 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/5.png",
      attributes: [
        {
          trait_type: "address",
          value: "15 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6405",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/6.json`,
    price: "7", // 0.02 USDC // ERC20 w. 6 decimals
    currency: usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6406",
    metadata: {
      name: "16 TEST STREET",
      description: "16 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/6.png",
      attributes: [
        {
          trait_type: "address",
          value: "16 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6406",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/7.json`,
    price: !isUsdcEnabled ? "300000000000000" : "8", // 0.03 MATIC OR // 0.03 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6407",
    metadata: {
      name: "17 TEST STREET",
      description: "17 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/7.png",
      attributes: [
        {
          trait_type: "address",
          value: "17 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6407",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/8.json`,
    price: !isUsdcEnabled ? "400000000000000" : "9", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6408",
    metadata: {
      name: "18 TEST STREET",
      description: "18 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/8.png",
      attributes: [
        {
          trait_type: "address",
          value: "18 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6408",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/9.json`,
    price: !isUsdcEnabled ? "500000000000000" : "10", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6409",
    metadata: {
      name: "19 TEST STREET",
      description: "19 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/9.png",
      attributes: [
        {
          trait_type: "address",
          value: "19 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6409",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/10.json`,
    price: !isUsdcEnabled ? "100000000000000" : "10", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6410",
    metadata: {
      name: "20 TEST STREET",
      description: "20 TEST STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/20.png",
      attributes: [
        {
          trait_type: "address",
          value: "10 TEST STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6410",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/11.json`,
    price: !isUsdcEnabled ? "200000000000000" : "3", // 0.02 MATIC OR // 0.02 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6411",
    metadata: {
      name: "2655 FREDRICK DOUGLASS BL",
      description: "2655 FREDRICK DOUGLASS BL Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/11.png",
      attributes: [
        {
          trait_type: "address",
          value: "2655 FREDRICK DOUGLASS BL",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6411",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/12.json`,
    price: !isUsdcEnabled ? "300000000000000" : "10", // 0.03 MATIC OR // 0.03 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6412",
    metadata: {
      name: "2504 ADAM C POWELL BLVD",
      description: "2504 ADAM C POWELL BLVD Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/12.png",
      attributes: [
        {
          trait_type: "address",
          value: "2504 ADAM C POWELL BLVD",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6412",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/13.json`,
    price: !isUsdcEnabled ? "400000000000000" : "2", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6413",
    metadata: {
      name: "573 ISHAM STREET",
      description: "573 ISHAM STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/13.png",
      attributes: [
        {
          trait_type: "address",
          value: "573 ISHAM STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6413",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/14.json`,
    price: !isUsdcEnabled ? "500000000000000" : "4", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6414",
    metadata: {
      name: "209 WEST 135 STREET",
      description: "209 WEST 135 STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/14.png",
      attributes: [
        {
          trait_type: "address",
          value: "209 WEST 135 STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6414",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/15.json`,
    price: !isUsdcEnabled ? "100000000000000" : "5", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6415",
    metadata: {
      name: "143 WEST 74 STREET",
      description: "143 WEST 74 STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/15.png",
      attributes: [
        {
          trait_type: "address",
          value: "143 WEST 74 STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6415",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/16.json`,
    price: !isUsdcEnabled ? "200000000000000" : "5", // 0.02 MATIC OR // 0.02 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6416",
    metadata: {
      name: "13 WEST 9 STREET",
      description: "13 WEST 9 STREET Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/16.png",
      attributes: [
        {
          trait_type: "address",
          value: "13 WEST 9 STREET",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6416",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/17.json`,
    price: !isUsdcEnabled ? "300000000000000" : "8", // 0.03 MATIC OR // 0.03 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6417",
    metadata: {
      name: "415 RIVERSIDE DRIVE",
      description: "415 RIVERSIDE DRIVE Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/17.png",
      attributes: [
        {
          trait_type: "address",
          value: "415 RIVERSIDE DRIVE",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6417",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/18.json`,
    price: !isUsdcEnabled ? "400000000000000" : "9", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6418",
    metadata: {
      name: "856 AMSTERDAM AVENUE",
      description: "856 AMSTERDAM AVENUE Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/18.png",
      attributes: [
        {
          trait_type: "address",
          value: "856 AMSTERDAM AVENUE",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6418",
        },
      ],
    },
  },
  {
    uri: `https://${thirdWebClientId}.ipfscdn.io/ipfs/bafybeie2d7amenmhvcpyg2chs3sqwqmza6olxcmpk4a2vcxwxqqagswe5y/19.json`,
    price: !isUsdcEnabled ? "500000000000000" : "9", // 0.01 MATIC OR // 0.01 USDC // ERC20 w. 6 decimals
    currency: !isUsdcEnabled ? NATIVE_TOKEN_ADDRESS : usdcAddress[chainName],
    uid: "10000000-50fd-4a0c-b31b-31f1a56e6419",
    metadata: {
      name: "243 SEAMAN AVENUE",
      description: "243 SEAMAN AVENUE Description",
      image: "ipfs://QmXCCZ7n3H4G2bXYUDG7ASvV3D2KkCdypEN2egEw25aKKw/19.png",
      attributes: [
        {
          trait_type: "address",
          value: "243 SEAMAN AVENUE",
        },
        {
          trait_type: "area",
          value: "4",
        },
        {
          trait_type: "floor",
          value: "3",
        },
        {
          trait_type: "piggyInitialMultiplier",
          value: "1.25",
        },
        {
          trait_type: "zipCode",
          value: "10032",
        },
        {
          trait_type: "buildingId",
          value: "10000000-50fd-4a0c-b31b-31f1a56e6419",
        },
      ],
    },
  },
];
