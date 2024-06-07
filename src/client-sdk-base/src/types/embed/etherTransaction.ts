export type AccessList = Array<{ address: string; storageKeys: Array<string> }>;

export interface Transaction {
  hash?: string;

  to?: string;
  from?: string;
  nonce: number;

  gasLimit: any;
  gasPrice?: any;

  data: string;
  value: any;
  chainId: number;

  r?: string;
  s?: string;
  v?: number;

  // Typed-Transaction features
  type?: number | null;

  // EIP-2930; Type 1 & EIP-1559; Type 2
  accessList?: AccessList;

  // EIP-1559; Type 2
  maxPriorityFeePerGas?: any;
  maxFeePerGas?: any;
}
