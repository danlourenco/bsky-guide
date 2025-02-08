<script setup lang="ts">
const { $agent } = useNuxtApp();

definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
      console.log($agent);
      console.log("Middleware", to, from);
      navigateTo("/feed");
    },
   
  ],
});
</script>
<template>
    <div>Authenticated. Redirecting...</div>
</template>