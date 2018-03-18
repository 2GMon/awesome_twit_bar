<template>
  <div id="app">
    <div>Esc: close window, j: select next tweet, k: select previous tweet</div>
    <Tweet v-for="tw in tweets" :key="tw.id" :tweet="tw" :selectedId="selectedId"/>
  </div>
</template>

<script>
import Tweet from "./Tweet.vue"

var data = {
  msg: 'Timeline Viewer',
  tweets: [],
  selectedIdx: 0,
  selectedId: 0,
};
export default {
  name: 'app',
  data () {
    return data;
  },
  components: {
    Tweet,
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
  data.selectedIdx = 0;
  data.selectedId = message.data[data.selectedIdx].id;
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
    } else if (keyName === 'j') {
      selectNextTweet();
      scrollTimelineViewer();
    } else if (keyName === 'k') {
      selectPreviousTweet();
      scrollTimelineViewer();
    }

  }, false);
}

function selectNextTweet() {
  if (data.selectedIdx < data.tweets.length - 1) {
    data.selectedIdx += 1;
    data.selectedId = data.tweets[data.selectedIdx].id;
  }
}

function selectPreviousTweet() {
  if (data.selectedIdx > 0) {
    data.selectedIdx -= 1;
    data.selectedId = data.tweets[data.selectedIdx].id;
  }
}

function scrollTimelineViewer() {
  let tweetElem = document.getElementById("tweet-" + data.selectedId);
  let tweetRect = tweetElem.getBoundingClientRect() ;

  if (tweetRect.top < 0) {
    window.scrollBy(0, tweetRect.top - 5);
  }
  if (tweetRect.top + tweetRect.height > window.innerHeight) {
    window.scrollBy(0, tweetRect.top + tweetRect.height - window.innerHeight + 5);
  }

  if (data.selectedIdx == 0) {
    window.scroll(0, 0);
  }
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
</style>

