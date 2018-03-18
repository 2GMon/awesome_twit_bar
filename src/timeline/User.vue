<template>
  <div class="user">
    <div class="profile-img"><img v-bind:src="user.profile_image_url_https"></div>
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

.profile-img img {
  width: 16px;
  height: 16px;
}

.screen_name {
  margin-left: 10px;
}
</style>
