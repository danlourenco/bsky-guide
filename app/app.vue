<script setup lang="ts">
import { BskyAgent } from '@atproto/api'
import { useVirtualizer, elementScroll } from '@tanstack/vue-virtual'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { computed, ref, watchEffect } from 'vue'

const runtimeConfig = useRuntimeConfig()
const resultLimit: number = 100;
const parentRef = ref<HTMLElement | null>(null)
const scrollingRef = ref<number>()


console.log(runtimeConfig.public)
const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = (
  offset,
  canSmooth,
  instance,
) => {
  const speed = 0.09 // pixels per millisecond
  const start = parentRef.value?.scrollTop || 0
  const distance = Math.abs(offset - start)
  const duration = distance / speed
  const startTime = (scrollingRef.value = Date.now())

  const run = () => {
    if (scrollingRef.value !== startTime) return
    const now = Date.now()
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const interpolated = start + (offset - start) * progress

    if (elapsed < duration) {
      elementScroll(interpolated, canSmooth, instance)
      requestAnimationFrame(run)
    } else {
      elementScroll(offset, canSmooth, instance)
    }
  }
  requestAnimationFrame(run)
}


const { currentTime } = useCurrentTime();

const todaysDate = new Date();

const formattedDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(todaysDate);

const agent = new BskyAgent({
  service: "https://bsky.social",
  persistSession: async (evt, session) => {
    console.log({ evt, session });
    if (session) {
      localStorage.setItem("bsky-session", JSON.stringify(session));
    }
  }
});

async function login() {
  const data = localStorage.getItem("bsky-session");
  if (data) {
    console.log('saved session data available, resuming session');
    const savedSessionData = JSON.parse(data);
    await agent.resumeSession(savedSessionData);
    console.log({ savedSessionData });
  } else {
    console.log('saved session data not available, logging in')
    agent.login({
      identifier: runtimeConfig.public.blueskyUsername,
      password: runtimeConfig.public.blueskyPassword
    });
  }

}
login();

const fetchTimeline = async ({ pageParam }) => {
  return agent.getTimeline({
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

console.log({ status, data, error, isFetching, hasNextPage, isFetchingNextPage });


const allRows = computed(() =>
  data.value ? data.value.pages
    .flatMap((d) => d.data.feed)
    .filter((item) => item.post.record.reply === undefined) : [],)



const rowVirtualizerOptions = computed(() => {
  return {
    count: hasNextPage ? allRows.value.length + 1 : allRows.value.length,
    overscan: 5,
    getScrollElement: () => parentRef.value,
    estimateSize: () => 250,
    scrollToFn,
  }
});

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions);
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

watchEffect(() => {
  console.log('inside watchEffect')
  const [lastItem] = [...virtualRows.value].reverse();
  if (!lastItem) return;

  if (
    lastItem.index >= allRows.value.length - 1 &&
    hasNextPage &&
    !isFetchingNextPage.value
  ) {
    console.log('fetching next page...')
    fetchNextPage()
  }
})

watchEffect(() => {
  if (allRows.value.length > 0) {
    rowVirtualizer.value.scrollToIndex(allRows.value.length)
  }
})

</script>
<template>
  <div class="bg-deep-violet container mx-auto" v-if="status === 'success'">
    <!-- <button class="bg-blue599 font-bold text-white" @click="handleClick">yo</button> -->
    <div class=" text-drab-grey font-display dropshadow text-5xl ">
      <!-- Fixed header row-->
      <div class="flex w-full">
        <div class="text-drab-grey embossed w-[400px] text-center  bg-lighter-violet py-2">{{
          currentTime.toLocaleTimeString() }}</div>
        <div class="embossed flex-1 bg-lighter-violet text-center text-electric-lemongrass uppercase py-2">{{
          formattedDate
        }}</div>
      </div>
      <div ref="parentRef" class="overflow-auto w-full h-[1200px] no-scrollbar">
        <div :style="{
          // height: `${totalSize}px`,
          height: '100%',
          width: '100%',
          position: 'relative',
        }">
          <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }">

            <div class="text-electric-lemongrass embossed min-w-[400px] max-w-[400px] bg-deep-violet p-2 text-center">{{
              allRows[virtualRow.index].post.author.displayName }} <br />
              <div class="text-2xl">{{allRows[virtualRow.index].post.author.handle}}</div>
            </div>
            <div class="embossed flex-1 bg-deep-violet text-drab-grey p-2 overflow-ellipsis">{{
              allRows[virtualRow.index].post.record.text
              }}</div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>
