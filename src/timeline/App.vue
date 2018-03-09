<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Timeline Viewer'
    }
  },
  mounted () {
      firefox57_workaround_for_blank_panel();
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

