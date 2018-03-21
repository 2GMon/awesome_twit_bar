<template>
  <div class="media-container">
    <div class="medium" v-for="medium in media">
      <Medium :medium="medium" ref="medium"/>
    </div>
  </div>
</template>

<script>
import Medium from "./Medium.vue"

export default {
  props: {
    media: {
      type: Array,
      required: true,
    }
  },
  components: {
    Medium,
  },
  methods: {
    openMedia: function() {
      this.$refs.medium.forEach(function(medium) {
        medium.openMedium();
      });
    },
  },
}
</script>

<style>
.media-container {
  display: flex;
}

.medium {
  margin-left: 10px;
}
</style>
