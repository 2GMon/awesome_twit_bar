<template>
  <div :id="tweetStyleId" class="tweet" v-bind:class="{ selected: isSelected }">
    <div class="profile-img" v-on:click="openProfile"><img v-bind:src="profileImg"></div>
    <div class="tweet-container">
      <div class="tweet-header">
        <User :tweet="tweet"/>
        <div class="time" v-on:click="openTweet">{{ tweet.created_at }}</div>
      </div>
      <div class="text">
        <span v-for="elem in tweetElems"> 
          <TweetElement :elem="elem"/>
        </span>
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
import TweetElement from "./TweetElement.vue"

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
    User, MediaContainer, TweetElement,
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
    tweetElems: function() {
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

      let elems = [];
      let entities = hashtags.concat(userMentions).concat(urls).concat(media).sort(function(a, b) {
        return a.indices[0] - b.indices[0];
      });
      let pos = 0;
      entities.forEach(function(entity) {
        elems.push({text: tweet.text.slice(pos, entity.indices[0])});
        pos = entity.indices[1];
        let ent = {text: tweet.text.slice(entity.indices[0], entity.indices[1])};
        if (entity.media_url_https) {
          ent.media_url_https = entity.media_url_https;
        } else if (entity.expanded_url) {
          ent.text = entity.expanded_url;
          ent.expanded_url = entity.expanded_url;
        } else if (entity.screen_name) {
          ent.screen_name = entity.screen_name;
        } else if (entity.text) {
          ent.hashtag = entity.text;
        }
        elems.push(ent);
      })
      elems.push({text: tweet.text.slice(pos)});
      return elems;
    },
  },
  methods: {
    openTweet: function() {
      let url = "https://twitter.com/" + this.tweet.user.screen_name + "/status/" + this.tweet.id_str;
      browser.tabs.create({url, active: false});
    },
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

.profile-img {
  cursor: pointer;
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

.time {
  cursor: pointer;
}

.text {
  margin-top: 3px;
  font-size: 12px;
}
</style>
