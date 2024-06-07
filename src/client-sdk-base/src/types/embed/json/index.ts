
import { CaseInsensitive, CollectionOrClientId, Currency, Locale, MintConfigs, PaymentMethod, Recipient } from "../..";
import { UIConfig } from "../../../../../common-sdk-base/src";
import { CryptoEmbeddedCheckoutPropsJSONParsed, CryptoEmbeddedCheckoutPropsJSONStringified } from "./crypto";
import { FiatEmbeddedCheckoutPropsJSONParsed, FiatEmbeddedCheckoutPropsJSONStringified } from "./fiat";

export type CommonEmbeddedCheckoutPropsJSONStringified<PM extends PaymentMethod = PaymentMethod> = {
    paymentMethod?: PM;
    mintConfig?: string;
    currency?: CaseInsensitive<Currency>;
    locale?: Locale;
    uiConfig?: string;
    whPassThroughArgs?: string;
    projectId?: string;
    recipient?: string;
} & CollectionOrClientId;

export type CommonEmbeddedCheckoutPropsJSONParsed<PM extends PaymentMethod = PaymentMethod> = {
    paymentMethod?: PM;
    mintConfig?: MintConfigs;
    currency?: CaseInsensitive<Currency>;
    locale?: Locale;
    uiConfig?: UIConfig;
    whPassThroughArgs?: any;
    projectId?: string;
    recipient?: Recipient;
} & CollectionOrClientId;

export type CrossmintEmbeddedCheckoutPropsJSONStringified =
    | FiatEmbeddedCheckoutPropsJSONStringified
    | CryptoEmbeddedCheckoutPropsJSONStringified;
export type CrossmintEmbeddedCheckoutPropsJSONParsed =
    | FiatEmbeddedCheckoutPropsJSONParsed
    | CryptoEmbeddedCheckoutPropsJSONParsed;
