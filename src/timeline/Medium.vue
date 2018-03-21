<template>
  <div>
    <img :src="medium.media_url_https" :width="size.width" :height="size.height" v-on:click="openMedium"/>
  </div>
</template>

<script>
export default {
  props: {
    medium: {
      type: Object,
      required: true,
    }
  },
  computed: {
    size: function() {
      const maxWidth = 96;
      const maxHeight = 64;
      let width = this.medium.sizes.small.w;
      let height = this.medium.sizes.small.h;

      if (width > maxWidth) {
        height = Math.floor(height * (maxWidth / width));
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.floor(width * (maxHeight / height));
        height = maxHeight;
      }
      return {width: width + "px", height: height + "px"};
    }
  },
  methods: {
    openMedium: function() {
      openTab(this.medium.media_url_https);
    },
  },
}

function openTab(url) {
  browser.tabs.create({url, active: false});
}
</script>

<style>
img {
  cursor: pointer;
}
</style>
