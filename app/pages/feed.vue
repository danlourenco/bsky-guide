<template>
  <div class="h-screen w-full grid grid-rows-[40vh_60vh] container mx-auto">
    <!-- TOP SECTION-->
    <div class="flex">
      <div class="w-1/2 h-full">
        <video autoplay muted loop class="w-full h-full object-cover aspect-square">
        <source src="/ident.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      </div>
      <div class="flex flex-1 flex-col justify-between text-center font-display dropshadow text-white text-5xl">
       
        <p class="my-4 ">This app is under active development. <br/> Find any bugs? Report them to me, @danlouren.co on Bluesky.</p>
        <iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1323512037/size=small/bgcol=ffffff/linkcol=0687f5/track=3521368349/transparent=true/" seamless><a href="https://trndytrndy.bandcamp.com/album/virtua">Virtua by trndytrndy</a></iframe>
        
      </div>
    </div>

      <ScrollingTable
        :allRows="allRows"
        :hasNextPage="hasNextPage"
        :isFetchingNextPage="isFetchingNextPage"
        :fetchNextPage="fetchNextPage"
      />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
import { useInfiniteQuery } from "@tanstack/vue-query";
const { $agent } = useNuxtApp();

const resultLimit: number = 100;

const fetchTimeline = async ({ pageParam }) => {
  return $agent.getTimeline({
    limit: resultLimit,
    cursor: pageParam,
  });
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

const allRows = computed(() =>
  data.value
    ? data.value.pages
        .flatMap((d) => d.data.feed)
        .filter((item) => item.post.record.reply === undefined)
    : []
);
</script>
