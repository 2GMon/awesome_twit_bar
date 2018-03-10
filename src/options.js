'use strict';

let TwitterPinAuth = require('twitter-pin-auth');
let twitterPinAuth = new TwitterPinAuth(
  'iTbIWCEeWJnOxNnqfU8ZnA',
  '2cK0UZmIuwtAaoeJ02Rd6dADjy6nrMp8Zd0tHbaR0',
  false,
  false
);

twitterPinAuth.requestAuthUrl()
  .then(function(url) {
    let element = document.getElementById("authorize-link");
    element.href = url;
    console.log("Authorize link: " + url);
  }).catch(function(err) {
    let element = document.getElementById("msg");
    msg.innerHTML = err;
    console.error("Authorize link error: " + err);
  });
