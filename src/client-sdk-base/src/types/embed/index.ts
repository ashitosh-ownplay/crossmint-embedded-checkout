
import {
    CaseInsensitive,
    CollectionOrClientId,
    CrossmintEvent,
    Currency,
    Locale,
    MintConfigs,
    PaymentMethod,
    Recipient,
} from "..";
import { UIConfig } from "../../../../common-sdk-base/src";
import { CryptoEmbeddedCheckoutProps } from "./crypto";
import { FiatEmbeddedCheckoutProps } from "./fiat";

export * from "./crypto";
export * from "./fiat";
export * from "./json";
export * from "./updatable";

export type CommonEmbeddedCheckoutProps<PM extends PaymentMethod = PaymentMethod> = {
    paymentMethod?: PM;
    mintConfig?: MintConfigs;
    currency?: CaseInsensitive<Currency>;
    locale?: Locale;
    environment?: string;
    uiConfig?: UIConfig;
    whPassThroughArgs?: any;
    projectId?: string;
    recipient?: Recipient;
    onEvent?(event: CrossmintEvent): any;
    debug?: boolean;
} & CollectionOrClientId;

export type CrossmintEmbeddedCheckoutProps = FiatEmbeddedCheckoutProps | CryptoEmbeddedCheckoutProps;
