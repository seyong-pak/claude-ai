<template>
  <div v-if="banners.length > 0" class="banner-swiper">
    <div class="banner-swiper__inner">
      <div
        v-for="(banner, i) in banners"
        :key="banner.id"
        class="banner-swiper__slide"
        :class="{ 'banner-swiper__slide--active': i === current }"
      >
        <img :src="banner.image" :alt="banner.imageName || '배너'" class="banner-swiper__img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  banners: { type: Array, default: () => [] },
  interval: { type: Number, default: 2000 }
})

const current = ref(0)
let timer = null

function start() {
  if (props.banners.length <= 1) return
  stop()
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.banners.length
  }, props.interval)
}

function stop() {
  if (timer) { clearInterval(timer); timer = null }
}

watch(() => props.banners, () => {
  current.value = 0
  stop()
  start()
}, { flush: 'post' })

onMounted(start)
onUnmounted(stop)
</script>

<style scoped>
.banner-swiper {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: inherit;
}

.banner-swiper__inner {
  position: relative;
  width: 100%;
}

.banner-swiper__slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.banner-swiper__slide:first-child {
  position: relative;
}

.banner-swiper__slide--active {
  opacity: 1;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}

.banner-swiper__slide:not(.banner-swiper__slide--active) {
  position: absolute;
  z-index: 0;
}

.banner-swiper__img {
  width: 100%;
  display: block;
}
</style>
