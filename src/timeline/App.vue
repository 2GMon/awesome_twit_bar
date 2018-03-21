<template>
  <div id="app">
    <div class="shortcut-container">
      <div><span class="key">Esc</span>: close window</div>
      <div><span class="key">j</span>: select next tweet</div>
      <div><span class="key">k</span>: select previous tweet</div>
      <div><span class="key">0</span>: select first tweet</div>
      <div><span class="key">$</span>: select last tweet</div>
      <div><span class="key">Enter</span>: open tweet</div>
      <div><span class="key">p</span>: open profile</div>
      <div><span class="key">m</span>: open media</div>
      <div><span class="key">o</span>: open urls</div>
      <div><span class="key">h</span>: open hashtag</div>
    </div>
    <Tweet v-for="tw in tweets" :key="tw.id_str" :tweet="tw" :selectedId="selectedId" ref="tweet"/>
  </div>
</template>

<script>
import Tweet from "./Tweet.vue"

var data = {
  msg: 'Timeline Viewer',
  tweets: [],
  selectedIdx: 0,
  selectedId: 0,
  tweetRefs: [],
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
  },
  updated () {
    this.tweetRefs = this.$refs.tweet;
  },
  methods: {
    openMedia: function() {
      console.log("openMedia in TimelineViewer");
    }
  },
};

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
    } else if (keyName === '0') {
      selectFirstTweet();
      scrollTimelineViewer();
    } else if (keyName === '$') {
      selectLastTweet();
      scrollTimelineViewer();
    } else if (keyName === 'Enter') {
      data.tweetRefs[data.selectedIdx].openTweet();
    } else if (keyName === 'p') {
      data.tweetRefs[data.selectedIdx].openProfile();
    } else if (keyName === 'm') {
      data.tweetRefs[data.selectedIdx].openMedia();
    } else if (keyName === 'o') {
      data.tweetRefs[data.selectedIdx].openUrl();
    } else if (keyName === 'h') {
      data.tweetRefs[data.selectedIdx].openHashtag();
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

function selectFirstTweet() {
  data.selectedIdx = 0;
  data.selectedId = data.tweets[data.selectedIdx].id;
}

function selectLastTweet() {
  data.selectedIdx = data.tweets.length - 1;
  data.selectedId = data.tweets[data.selectedIdx].id;
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

.shortcut-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.key {
  margin: 0 3px;
  padding: 0 5px;
  border-width: 1px 2px 2px 1px;
  border-style: solid;
  border-color: #999;
  background-color: #F5F5F5;
  font-family: monospace;
}
</style>

