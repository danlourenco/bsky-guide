import { AtpAgent } from "@atproto/api";

export default defineNuxtPlugin((nuxtApp) => {
    console.log("Inside the agent.client.ts file");

    // Instantiate the AtpAgent
    const agent = new AtpAgent({
      service: "https://bsky.social",
      persistSession: async (evt, session) => {
        console.log({ evt, session });
        if (session) {
          localStorage.setItem("bsky-session", JSON.stringify(session));
        }
      },
    });

    return {
        provide: {
           agent: agent, 
        }
    }
});
