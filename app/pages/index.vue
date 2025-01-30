<script setup lang="ts">
// async function login() {
//   const data = localStorage.getItem("bsky-session");
//   if (data) {
//     console.log('saved session data available, resuming session');
//     const savedSessionData = JSON.parse(data);
//     await $agent.resumeSession(savedSessionData);
//     console.log({ savedSessionData });
//   } else {
//     console.log('saved session data not available, logging in')
//     $agent.login({
//       identifier: runtimeConfig.public.blueskyUsername,
//       password: runtimeConfig.public.blueskyPassword
//     });
//   }

// }
// login();

const { $agent } = useNuxtApp();

const router = useRouter();
const credentials = reactive({
  username: '',
  password: ''
})

const runtimeConfig = useRuntimeConfig();

const login = async () => {
    console.log('Logging in')
    console.log(credentials.username);
    console.log(credentials.password);
    await $agent.login({
      identifier: credentials.username,
      password: credentials.password
    });
    await navigateTo('/feed');
}
</script>

<template>
    <div class="bg-deep-violet container mx-auto ">
    <h1 class="text-8xl text-center font-heading dropshadow text-light-blue text-stroke">BlueSky Guide</h1>
    <div class="font-garamond text-white text-6xl text-center">We Are What's On</div>

    <div class="flex justify-center">
        <form @submit.prevent="login" class="bg-white mt-8 w-1/2">
        <input type="text" v-model="credentials.username" placeholder="Username" required />
        <input type="password" v-model="credentials.password" placeholder="Password" required />
        <button type="submit">Log In</button>
    </form>
    </div>
    

    </div>
</template>

