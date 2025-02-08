import { Agent } from "@atproto/api";
import {
  BrowserOAuthClient,
  OAuthSession,
} from "@atproto/oauth-client-browser";

export default defineNuxtPlugin(async (nuxtApp) => {
  const isDev = import.meta.dev;
  const origin = isDev ? "http://127.0.0.1:3000" : "https://bsky-guide.nuxt.dev";
  const scope = "atproto transition:generic";
  const redirectUri = origin;
  
  const client = isDev 
  ? new BrowserOAuthClient({
    handleResolver: "https://bsky.social/",
    // Only works if the current origin is a loopback address:
    clientMetadata: undefined,
  })
  : await BrowserOAuthClient.load({
    clientId: 'https://bsky-guide.nuxt.dev/client-metadata.json',
    handleResolver: 'https://bsky.social/',
  })


  console.log("initializing client...");

  async function getSession() {
    let oauthSession: OAuthSession | null = null;
    const result = await client.init();
    if (result) {
      const { session, state } = result;
      if (state != null) {
        console.log(
          `${session.sub} was successfully authenticated (state: ${state})`
        );
      } else {
        console.log(`${session.sub} was restored (last active session)`);
      }
      oauthSession = session;
    } else {
      try {
        await client.signIn("https://bsky.social");
      } catch (error) {
        console.error(error);
      }
    }
    
    return oauthSession;
  }

  
  const session = await getSession();
  if (!session) {
    throw new Error("Failed to get session");
  }
  const agent = new Agent(session);
  const profile = await agent.getProfile({ actor: agent.accountDid })

console.log({profile})

  return {
    provide: {
      client,
      agent
    },
  };
});
