import type { Ref } from "vue";
import { elementScroll } from "@tanstack/vue-virtual";
import type { VirtualizerOptions } from "@tanstack/vue-virtual";

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const smoothScroll = (
  parentRef: Ref<HTMLElement | null>,
  scrollingRef: Ref<number | undefined>,
): VirtualizerOptions<any, any>["scrollToFn"] => {
  return (offset, canSmooth, instance) => {
    const speed = 0.09; // pixels per millisecond
    const start = parentRef.value?.scrollTop || 0;
    const distance = Math.abs(offset - start);
    const duration = distance / speed;
    const startTime = (scrollingRef.value = Date.now());

    const run = () => {
      if (scrollingRef.value !== startTime) return;
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const interpolated = start + (offset - start) * progress;

      if (elapsed < duration) {
        elementScroll(interpolated, canSmooth, instance);
        requestAnimationFrame(run);
      } else {
        elementScroll(offset, canSmooth, instance);
      }
    };
    requestAnimationFrame(run);
  };
};
