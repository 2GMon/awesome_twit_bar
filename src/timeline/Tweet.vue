<template>
  <div :id="tweetStyleId" class="tweet" v-bind:class="{ selected: isSelected }">
    <div class="profile-img"><img v-bind:src="tweet.user.profile_image_url_https"></div>
    <div class="tweet-container">
      <div class="tweet-header">
        <User :user="tweet.user"/>
        <div class="time">{{ tweet.created_at }}</div>
      </div>
      <div class="text">
      <span v-html="tweetText"></span>
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
    },
    selectedId: {
      type: Number,
      required: true,
    }
  },
  components: {
    User,
  },
  computed: {
    isSelected: function() {
      return this.tweet.id == this.selectedId;
    },
    tweetStyleId: function() {
      return "tweet-" + this.tweet.id;
    },
    tweetText: function() {
      let hashtags = this.tweet.entities.hashtags;
      let userMentions = this.tweet.entities.user_mentions;
      let urls = this.tweet.entities.urls;
      let media = [];
      if (this.tweet.entities.media) {
        media = this.tweet.entities.media;
      }

      let entities = hashtags.concat(userMentions).concat(urls).concat(media).sort(function(a, b) {
        return b.indices[0] - a.indices[0];
      });

      let text = this.tweet.text;
      entities.forEach(function(entity) {
        text = insertStr(text, entity.indices[1], "</a>");
        if (entities.media_url_https) {
          text = insertStr(text, entity.indices[0], "<a href=\"" + entity.media_url_https + "\">");
        } else if (entity.expanded_url) {
          text = insertStr(text, entity.indices[0], "<a href=\"" + entity.expanded_url + "\">");
        } else if (entity.screen_name) {
          text = insertStr(text, entity.indices[0], "<a href=\"https://twitter.com/" + entity.screen_name + "\">");
        } else if (entity.text) {
          text = insertStr(text, entity.indices[0], "<a href=\"https://twitter.com/hashtag/" + entity.text + "\">");
        }
      })
      return text;
    },
  }
}

function insertStr(str, index, insert) {
  return str.slice(0, index) + insert + str.slice(index, str.length);
}
</script>

<style>
.tweet {
  text-align: left;
  margin-top: 5px;
  background-color: #ffffff;
  display: flex;
}

.tweet.selected {
  border: 2px solid #000000;
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

a, a:hover, a:focus, a:active {
  color: #0084B4;
}
</style>
