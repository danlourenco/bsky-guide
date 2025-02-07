import { Agent } from "@atproto/api";
import {
  BrowserOAuthClient,
  OAuthSession,
} from "@atproto/oauth-client-browser";


export default defineNuxtPlugin((nuxtApp) => {
  let oauthClient: BrowserOAuthClient;

  nuxtApp.hook("app:beforeMount", async () => {
     oauthClient = new BrowserOAuthClient({
      handleResolver: "https://bsky.social",
      clientMetadata: undefined
    });
  });
 

    return {
        provide: {
        }
    }
});
