<template>
  <div class="h-screen w-full grid grid-rows-[40vh_60vh] container mx-auto">
    <!-- TOP SECTION-->
    <div class="flex">
      <div class="w-1/2 h-full">
        <video
          autoplay
          muted
          loop
          class="w-full h-full object-cover aspect-square"
        >
          <source src="/ident.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        class="flex flex-1 flex-col justify-center text-center font-display dropshadow text-white text-4xl gap-2 p-4"
      >
        <p class="my-4" v-show="startScroll">
          This app is under active development. Suggestions? Feedback? Let us know!
          Send a message to me on Bluesky: @danlouren.co
        </p>
        <button
          class="bg-lighter-violet text-electric-lemongrass uppercase py-2 cursor-pointer w-full"
          @click="toggleScroll"
          v-show="!startScroll"
        >
          Click here to start scrolling
        </button>
      </div>
    </div>
    <ScrollingTable
      :shouldScroll="startScroll"
      :allRows="allRows"
      :hasNextPage="hasNextPage"
      :isFetchingNextPage="isFetchingNextPage"
      :fetchNextPage="fetchNextPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { useInfiniteQuery } from "@tanstack/vue-query";
const { $agent } = useNuxtApp();
console.log($agent);
const resultLimit: number = 100;

const fetchTimeline = async ({ pageParam }) => {
  return $agent.getTimeline({
    limit: resultLimit,
    cursor: pageParam,
  });
};

const startScroll = ref(false);
const toggleScroll = () => {
  startScroll.value = !startScroll.value;
};
const {
  status,
  data,
  error,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
} = useInfiniteQuery({
  queryKey: ["feed"],
  queryFn: fetchTimeline,
  initialPageParam: "",
  getNextPageParam: (lastPage, pages) => {
    return lastPage.data.cursor;
  },
});

console.log($agent);
const allRows = computed(() =>
  data.value
    ? data.value.pages
        .flatMap((d) => d.data.feed)
        .filter((item) => item.post.record.reply === undefined)
    : []
);
</script>
