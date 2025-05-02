<template>
  <div>
    <audio ref="audioPlayer" :src="audioSource" controls></audio>
  </div>
</template>

<script>
export default {
  props: {
    audioSource: String,
  },
  methods: {
    play() {
      this.$refs.audioPlayer.play();
    },
    pause() {
      this.$refs.audioPlayer.pause();
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需要自定义 */
</style>
