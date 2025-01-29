<script setup lang="ts">
const { currentTime } = useCurrentTime();

</script>
<template>
  <div class="bg-deep-violet">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>

    <div class="container">
      <table class="table border-separate bg-deep-violet text-drab-grey font-display dropshadow text-5xl blur-[0.2px]">
        <thead>
          <tr class="bg-lighter-violet h-18 align-middle">
            <th class="embossed align-middle"> {{ currentTime.toLocaleTimeString() }}
            </th>
            <th class="text-electric-lemongrass uppercase text-shadow-2xl embossed align-middle">January 28, 2025</th>
          </tr>
        </thead>
        <tbody>
          <tr class="h-40">
            <td class="text-electric-lemongrass embossed">USER@BSKY.APP</td>
            <td class="embossed pl-12">This is my skeet, lol</td>
          </tr>
          <tr class="h-40">
            <td class="embossed text-electric-lemongrass ">ANOTHER@BSKY.APP</td>
            <td class="embossed pl-12">This is another skeet, lol</td>
          </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>
