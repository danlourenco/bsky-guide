export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('auth middleware');

    // TODO: Check to see if there is a session.

    // If there is a session, resume the session.
      // const oauthsession = oauthClient.restore('...');
      // agent = newAgent(oauthsession)
    // If there is no session, redirect to login.

    
    // Creds based auth stuff
  /*     const { $agent } = useNuxtApp();

    const data = localStorage.getItem("bsky-session");
    if (data) {
      console.log('saved session data available, resuming session');
      const savedSessionData = JSON.parse(data);
      await $agent.resumeSession(savedSessionData);
      console.log({ savedSessionData });
    } else {
      console.log('saved session data not available, redirecting to login')
      if (to.path !== '/') {
        return navigateTo('/')
      }
    } */

  })