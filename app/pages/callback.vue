<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
    const { $agent } = useNuxtApp();

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