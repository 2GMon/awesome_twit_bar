<template>
  <div class="tweet">
    <div class="profile-img"><img v-bind:src="tweet.user.profile_image_url_https"></div>
    <div class="tweet-container">
      <div class="tweet-header">
        <User :user="tweet.user"/>
        <div class="time">{{ tweet.created_at }}</div>
      </div>
      <div class="text">
      {{ tweet.text }}
      </div>
    </div>
  </div>
</template>

<script>
import User from "./User.vue"

export default {
  props: {
    tweet: {
      type: Object,
      required: true,
    }
  },
  components: {
    User,
  }
}
</script>

<style>
.tweet {
  text-align: left;
  margin-top: 5px;
  background-color: #ffffff;
  display: flex;
}

.profile-img img {
  width: 32px;
  height: 32px;
}

.tweet-container {
  width: 100%;
}

.tweet-header {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}

.text {
  margin-top: 3px;
  font-size: 12px;
}
</style>
