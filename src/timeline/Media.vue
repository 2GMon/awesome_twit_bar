<template>
  <div>
    <img :src="media.media_url_https" :width="size.width" :height="size.height" v-on:click="openMedia(media.media_url_https)"/>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      required: true,
    }
  },
  computed: {
    size: function() {
      const maxWidth = 96;
      const maxHeight = 64;
      let width = this.media.sizes.small.w;
      let height = this.media.sizes.small.h;

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
    openMedia: function(url) {
      openTab(url);
    },
  },
}

function openTab(url) {
  browser.tabs.create({url, active: false});
}
</script>

<style>
</style>
