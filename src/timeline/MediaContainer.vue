<template>
  <div class="media-container">
    <div class="medium" v-for="medium in media">
      <Medium :medium="medium"/>
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
