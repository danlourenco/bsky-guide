<script setup lang="ts">

const { $agent } = useNuxtApp();

const credentials = reactive({
  username: "",
  password: "",
});

const runtimeConfig = useRuntimeConfig();

const login = async () => {
  await $agent.login({
    identifier: credentials.username,
    password: credentials.password,
  });
  await navigateTo("/feed");
};
</script>

<template>
  <div class="container mx-auto flex flex-col justify-center align-center h-dvh w-full">
    <div class="mt-8">
      <h1
        class="text-8xl text-center font-heading dropshadow text-light-blue text-stroke"
      >
        BlueSky Guide
      </h1>
   
    </div>

    <form @submit.prevent="login" class="b">
    <fieldset
      class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto mt-8"
    >

      <!-- <label class="fieldset-label">Username</label>
      <input type="text" class="input" placeholder="user.bsky.app" v-model="credentials.username" required />

      <label class="fieldset-label">Password</label>
      <input type="password" class="input" placeholder="Password" v-model="credentials.password" required /> -->

      <button class="btn btn-neutral mt-4" type="submit">Login</button>
    </fieldset>
</form>


  </div>
</template>
