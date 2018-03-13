<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div v-for="tw in tweets">
      {{ tw.text }}
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
  }
}

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
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


h1, h2 {
  font-weight: normal;
}
</style>

