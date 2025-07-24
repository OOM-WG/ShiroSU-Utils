<template>
  <div class="carousel-container">
    <n-carousel
      :interval="4000"
      :show-arrow="false"
      :show-dots="false"
      autoplay
      dot-type="line"
      trigger="hover">
      <img class="carousel-img" src="/assets/carousel/1.png" />
      <img class="carousel-img" src="/assets/carousel/2.png" />
    </n-carousel>
  </div>
</template>

<script lang="ts" setup>
import { NCarousel } from "naive-ui"
</script>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto 24px auto;
  border-radius: 8px;
  overflow: hidden;
}

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
}
</style>