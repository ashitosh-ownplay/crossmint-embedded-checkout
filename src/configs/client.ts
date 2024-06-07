import { thirdWebClientId } from "./consts";
import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID

if (!thirdWebClientId) {
  throw new Error("No TW client ID provided");
}

export const client = createThirdwebClient({
  clientId: thirdWebClientId,
});

export const initTWClient = () => {
  if (!thirdWebClientId) {
    throw new Error("No TW client ID provided");
  }
  const client = createThirdwebClient({
    clientId: thirdWebClientId,
  });

  return client;
};
