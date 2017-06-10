<style>
  .noclick  {
    user-select: none!important;
    pointer-events: none!important;
  }
  button, .icon, .button, span, input, .pagination-link {
    -webkit-app-region: no-drag;
  }
@import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500');
  html {
    -webkit-app-region: drag;
    background-image: url('./assets/background.jpg');
    background-size: cover;
  }
  body, html {
    overflow: hidden;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'splash-tron'
  }
</script>
