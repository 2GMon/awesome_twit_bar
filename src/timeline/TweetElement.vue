<template>
  <span>
    <a v-if="elem.hashtag" v-on:click="openHashtag">{{ elem.text }}</a>
    <a v-if="elem.expanded_url" v-on:click="openUrl">{{ elem.text }}</a>
    <a v-if="elem.screen_name" v-on:click="openProfile">{{ elem.text }}</a>
    <span v-if="rawText">{{ elem.text }}</span>
  </span>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    rawText: function() {
      if (!this.elem.hashtag && !this.elem.expanded_url &&
          !this.elem.screen_name && !this.elem.media_url_https) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    openHashtag: function() {
      let url = "https://twitter.com/hashtag/" + this.elem.hashtag;
      browser.tabs.create({url, active: false});
    },
    openUrl: function() {
      let url = this.elem.expanded_url;
      browser.tabs.create({url, active: false});
    },
    openProfile: function() {
      let url = "https://twitter.com/" + this.elem.screen_name;
      browser.tabs.create({url, active: false});
    },
  },
}
</script>

<style>
a, a:hover, a:focus, a:active {
  color: #0084B4;
  cursor: pointer;
}
</style>
