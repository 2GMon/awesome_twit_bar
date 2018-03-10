<template>
  <div id="app">
    <ol>
      <li>Authorize Awesome Twit Bar from below link.</br>
        <a :href="auth_url" target="_blank">Opens the page to authorize Awesome Twit Bar and get your PIN from Twitter.</a>
      </li>
      <li>Input your PIN below form to allow Awesome Twit Bar to access Twitter.</br>
        <input v-model="pin" placeholder="input your PIN"></input><button v-on:click="submit">Submit</button>
      </li>
    </ol>
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
      msg: ""
    }
  },
  mounted () {
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
      console.log(this.pin);
    }
  }
}

function getAuthUrl() {
}
</script>

<style>
</style>
