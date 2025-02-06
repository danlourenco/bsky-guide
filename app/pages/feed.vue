<template>
  <div class="container mx-auto" v-if="status === 'success'">
    <div class=" flex justify-center ">
      <video width="1000" height="415" autoplay muted loop >
        <source src="/bsky4.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
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
  middleware: ["auth"]
})
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
