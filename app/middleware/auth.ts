export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $agent } = useNuxtApp();

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
    }

  })