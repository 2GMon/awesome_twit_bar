<template>
  <div class="user">
    <div class="user-name">{{ user.name }}</div>
    <div class="screen-name">@{{ user.screen_name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style>
.user {
  display: flex;
}

.screen_name {
  margin-left: 10px;
}
</style>
