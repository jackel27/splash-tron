<style scoped>
  .image {
    border-radius: 5%;
    width: 23vw;
    height: 25vh;
    background-size: cover;
    background-position: center;
    transition: all;
    transition-duration: 400ms;
    z-index: 4;
  }
  .image:hover {
    z-index: 99!important;
    transform: scale(1.2);
  }
  .column:hover {
    z-index: 99;
  }
  .result-container {
    /* height: 20vh; */
    text-align: center;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
</style>
<!-- animeclass = result + index -->
<template>
  <div class="column is-3">
    <div class="image result-images" @click="$parent.toggleImageModal(result)" :style="{backgroundImage: 'url(' + result.urls.small + ')'}"></div>
  </div>
</template>

<script>
export default {
  // import 'blah' from './components/blah.vue
  name: 'Result',
  components: {
  },
  props: {
    result: {},
    animeindex: ''
  },
  updated () {
    // let timeline = this.$Anime.timeline()
    console.log('animeIndex = ', this.animeindex)
    this.$Anime({
      targets: '.result' + this.animeindex,
      delay: this.animeindex * 50,
      translateX: [1000, 0], // Translate X from 100 to 200
      // rotate: ['.5turn', '1turn'], // Rotate from 180deg to 360deg
      // scale: ['*=2', 1], // Scale from 2 times the original value to 1,
      // backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
      duration: 100
    })
    // this.$Anime({
    //   targets: '.' + this.animeclass,
    //   // translateX: [100, 200], // Translate X from 100 to 200
    //   rotate: ['.5turn', '1turn'], // Rotate from 180deg to 360deg
    //   scale: ['*=2', 1], // Scale from 2 times the original value to 1,
    //   // backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
    //   duration: 1500
    // })
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
