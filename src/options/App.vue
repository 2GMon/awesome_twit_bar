<template>
  <div id="app">
    <ol v-if="! authorized">
      <li>Authorize Awesome Twit Bar from below link.</br>
        <a :href="auth_url" target="_blank">Opens the page to authorize Awesome Twit Bar and get your PIN from Twitter.</a>
      </li>
      <li>Input your PIN below form to allow Awesome Twit Bar to access Twitter.</br>
        <input v-model="pin" placeholder="input your PIN"></input><button v-on:click="submit">Submit</button>
      </li>
    </ol>
    <div v-if="authorized">
      Already authorized.<button v-on:click="reset">Reset</button>
    </div>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
let TwitterPinAuth = require('twitter-pin-auth');
let twitterPinAuth = new TwitterPinAuth(
  'iTbIWCEeWJnOxNnqfU8ZnA',
  '2cK0UZmIuwtAaoeJ02Rd6dADjy6nrMp8Zd0tHbaR0',
  false,
  false
);

export default {
  name: 'app',
  data () {
    return {
      auth_url: "",
      pin: "",
      msg: "",
      authorized: false
    }
  },
  mounted () {
    if(localStorage.getItem('atw.authorized')) {
      this.authorized = true;
      return;
    }

    self = this;
    twitterPinAuth.requestAuthUrl(function(err, url) {
      if(err) {
          self.msg = err;
          return console.error(err);
      }
      self.auth_url = url;
      console.log(url);
    });
  },
  methods: {
    submit: function() {
      twitterPinAuth.authorize(this.pin, function(err, data) {
        if(err) {
          return console.error(err);
        }
        localStorage.setItem('atw.accessTokenKey', data.accessTokenKey);
        localStorage.setItem('atw.accessTokenSecret', data.accessTokenSecret);
        console.log(data.accessTokenKey);
        console.log(data.accessTokenSecret);
        browser.runtime.sendMessage({
          type: "api_key_initialized"
        });
      });
      localStorage.setItem('atw.authorized', true);
      this.authorized = true;
      console.log(this.pin);
    },
    reset: function() {
      localStorage.removeItem('atw.authorized');
      localStorage.removeItem('atw.accessTokenKey');
      localStorage.removeItem('atw.accessTokenSecret');
      this.authorized = false;
    }
  }
}

function getAuthUrl() {
}
</script>

<style>
</style>
