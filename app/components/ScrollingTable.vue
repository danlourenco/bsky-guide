<script lang="ts" setup>
import { useVirtualizer, elementScroll } from "@tanstack/vue-virtual";
import { computed, ref, watchEffect } from "vue";
import { formatDate, smoothScroll } from "@/utils/helpers";

interface Props {
  shouldScroll: boolean;
  allRows: any[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
const props = withDefaults(defineProps<Props>(), {
  shouldScroll: false,
  allRows: [],
  hasNextPage: false,
  isFetchingNextPage: false,
  fetchNextPage: () => {}
});

const parentRef = ref<HTMLElement | null>(null);
const scrollingRef = ref<number>();

const scrollToFn = smoothScroll(parentRef, scrollingRef);

const { currentTime } = useCurrentTime();
const formattedDate = formatDate(new Date());

const getCount = computed(() => {
  if (props.allRows.length === 0) return 0;
  console.log(props.allRows.length);
  return props.hasNextPage ? props.allRows.length + 1 : props.allRows.length;
});

// TODO: Clean this up. Truly understand estimateSize values
const rowVirtualizerOptions = computed(() => {
  return {
    count: getCount.value,
    overscan: 5,
    getScrollElement: () => parentRef.value,
    estimateSize: () => 210, 
    scrollToFn,
  };
});

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions);
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

watchEffect(() => {
  const [lastItem] = [...virtualRows.value].reverse();
  if (!lastItem) return;

  if (
    lastItem.index >= props.allRows.length - 1 &&
    props.hasNextPage &&
    !props.isFetchingNextPage.value
  ) {
    props.fetchNextPage();
  }
});



watchEffect(() => {
  if (props?.allRows.length > 0 && props.shouldScroll) {
    rowVirtualizer.value.scrollToIndex(props.allRows.length);
  }
});

</script>

<template>
  <div class="text-drab-grey font-display dropshadow text-5xl">
    <!-- Fixed Header-->  
    <div class="flex w-full">
        <div
          class="text-drab-grey embossed w-[400px] text-center bg-lighter-violet py-2"
        >
          {{ currentTime.toLocaleTimeString() }}
        </div>
        <div
          class="embossed flex-1 bg-lighter-violet text-center text-electric-lemongrass uppercase py-2"
        >
          {{ formattedDate }}
        </div>
      </div>
      <!-- Scrolling Content-->
      <div ref="parentRef" class="overflow-auto w-full h-[calc(100%-80px)] no-scrollbar">
        <div
          :style="{
            // height: `${totalSize}px`,
            height: '100%',
            width: '100%',
            position: 'relative',
          }"
        >
          <div
            v-for="virtualRow in virtualRows"
            :key="virtualRow.key"
            :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }"
          >
            <div
              class="text-electric-lemongrass embossed min-w-[400px] max-w-[400px] bg-deep-violet p-2 text-center"
            >
              <h2>{{ virtualRow.index }}</h2>
              <span class="uppercase text-4xl">{{ allRows[virtualRow.index].post.author.displayName }}</span> <br />
              <div class="text-2xl">
                {{ allRows[virtualRow.index].post.author.handle }}
              </div>
            </div>
            <div
              class="embossed flex-1 bg-deep-violet text-drab-grey p-2 overflow-ellipsis"
            >
            <p class="line-clamp-4">{{ allRows[virtualRow.index].post.record.text }}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
</template>



