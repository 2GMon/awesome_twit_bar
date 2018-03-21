<template>
  <div :id="tweetStyleId" class="tweet" v-bind:class="{ selected: isSelected }">
    <div class="profile-img" v-on:click="openProfile"><img v-bind:src="profileImg"></div>
    <div class="tweet-container">
      <div class="tweet-header">
        <User :tweet="tweet"/>
        <div class="time">{{ tweet.created_at }}</div>
      </div>
      <div class="text">
      <span v-html="tweetText"></span>
      </div>
      <div class="extended-entities" v-if="tweet.extended_entities">
        <MediaContainer :media="tweet.extended_entities.media" ref="mediaContainer"/>
      </div>
    </div>
  </div>
</template>

<script>
import User from "./User.vue"
import MediaContainer from "./MediaContainer.vue"

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
    User, MediaContainer,
  },
  computed: {
    isSelected: function() {
      return this.tweet.id == this.selectedId;
    },
    tweetStyleId: function() {
      return "tweet-" + this.tweet.id;
    },
    profileImg: function() {
      if (this.tweet.retweeted_status) {
        return this.tweet.retweeted_status.user.profile_image_url_https;
      } else {
        return this.tweet.user.profile_image_url_https;
      }
    },
    tweetText: function() {
      let tweet = this.tweet;
      if (this.tweet.retweeted_status) {
        tweet = this.tweet.retweeted_status;
      }

      let hashtags = tweet.entities.hashtags;
      let userMentions = tweet.entities.user_mentions;
      let urls = tweet.entities.urls;
      let media = [];
      if (tweet.entities.media) {
        media = tweet.entities.media;
      }

      let entities = hashtags.concat(userMentions).concat(urls).concat(media).sort(function(a, b) {
        return b.indices[0] - a.indices[0];
      });

      let text = tweet.text;
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
  },
  methods: {
    openProfile: function() {
      let url = "https://twitter.com/" + this.tweet.user.screen_name;
      browser.tabs.create({url, active: false});
    },
    openMedia: function() {
      if (this.$refs.mediaContainer) {
        this.$refs.mediaContainer.openMedia();
      }
    }
  },
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
