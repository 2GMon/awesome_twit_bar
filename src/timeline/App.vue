<template>
  <div id="app">
    <div>Esc: close window</div>
    <div class="tweet" v-for="tw in tweets">
      <div class="profile-img"><img v-bind:src="tw.user.profile_image_url_https"></div>
      <div class="tweet-container">
        <div class="tweet-header">
          <User :user="tw.user"/>
          <div class="time">{{ tw.created_at }}</div>
        </div>
        <div class="text">
        {{ tw.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "./User.vue"

var data = {
  msg: 'Timeline Viewer',
  tweets: []
};
export default {
  name: 'app',
  data () {
    return data;
  },
  components: {
    User,
  },
  mounted () {
      firefox57_workaround_for_blank_panel();
      getHomeTimeline();

      addKeyboardEventListener();
  }}

function firefox57_workaround_for_blank_panel () {
  // browser. windows. create () displays blank windows (panel, popup or detached_panel)
  // The trick to display content is to resize the window...

  function getCurrentWindow () { getCurrentWindow
    return browser. windows. getCurrent ();
  }

  getCurrentWindow (). then ((currentWindow) => {
    var updateInfo = {
      width: currentWindow.width,
      height: currentWindow.height + 1, // 1 pixel more than original size...
    };
    browser. windows. update (currentWindow. id, updateInfo);
  });
}

function handleHomeTimelineResponse(message) {
  data.tweets = message.data;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function getHomeTimeline() {
  var sending = browser.runtime.sendMessage({
    type: "get_home_timeline"
  });
  sending.then(handleHomeTimelineResponse, handleError);
}

function closeWindow() {
  let winId = browser.windows.WINDOW_ID_CURRENT;
  console.log("removing window id = " + winId);
  browser.windows.remove(winId);
}

function addKeyboardEventListener() {
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'Escape') {
      closeWindow();
    }
  }, false);
}
</script>

<style>
body {
  background-color: #e6ecf0;
}

#app {
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

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

