<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
    const { $agent } = useNuxtApp();
      return navigateTo("/feed");
    },
   
  ],
});
</script>
<template>
    <div>Authenticated. Redirecting...</div>
</template>