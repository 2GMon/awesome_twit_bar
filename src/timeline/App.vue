<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div class="tweet" v-for="tw in tweets">
      <div class="tweet-header">
        <div class="user">
          <div class="user-name">{{ tw.user.name }}</div>
          <div class="screen-name">@{{ tw.user.screen_name }}</div>
        </div>
        <div class="time">{{ tw.created_at }}</div>
      </div>
      <div class="text">
      {{ tw.text }}
      </div>
    </div>
  </div>
</template>

<script>
var data = {
  msg: 'Timeline Viewer',
  tweets: []
};
export default {
  name: 'app',
  data () {
    return data;
  },
  mounted () {
      firefox57_workaround_for_blank_panel();
      getHomeTimeline();
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
  data.tweets = JSON.parse(message.data);
  console.log(JSON.parse(message.data));
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
}

.tweet-header {
  display: flex;
  justify-content: space-between;
}

.user {
  display: flex;
}

.screen_name {
  margin-left: 10px;
}
</style>

