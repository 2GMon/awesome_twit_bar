<template>
  <div class="user-container">
    <div class="user">
      <div class="user-name">{{ originalUserName }}</div>
      <div class="screen-name">@{{ originalScreenName }}</div>
    </div>
    <div class="user retweet" v-if="tweet.retweeted_status">
      <div>Retweeted by</div>
      <div class="retweet-profile-img"><img v-bind:src="tweet.user.profile_image_url_https"></div>
      <div class="user-name">{{ tweet.user.name }}</div>
      <div class="screen-name">@{{ tweet.user.screen_name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tweet: {
      type: Object,
      required: true,
    }
  },
  computed: {
    originalUserName: function() {
      if (this.tweet.retweeted_status) {
        return this.tweet.retweeted_status.user.name;
      } else {
        return this.tweet.user.name;
      }
    },
    originalScreenName: function() {
      if (this.tweet.retweeted_status) {
        return this.tweet.retweeted_status.user.screen_name;
      } else {
        return this.tweet.user.screen_name;
      }
    },
  }
}
</script>

<style>
.user-container {
  display: flex;
}

.user {
  display: flex;
}

.user.retweet {
  margin-left: 10px;
}

.screen_name {
  margin-left: 10px;
}

.retweet-profile-img {
  margin-left: 2px;
}

.retweet-profile-img img {
  width: 10px;
  height: 10px;
}
</style>
