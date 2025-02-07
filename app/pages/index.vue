<script setup lang="ts">

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
      <button class="btn btn-neutral mt-4" type="submit">Login</button>
    </fieldset>
</form>


  </div>
</template>
