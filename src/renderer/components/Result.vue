<style scoped>
  .image {
    width: 23vw;
    height: 25vh;
    background-size: cover;
    background-position: center;
    /* transform: translateX(800px); */
  }
  .column {
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
    <div class="image" @click="$parent.toggleImageModal(result)" :style="{backgroundImage: 'url(' + result.urls.small + ')'}"></div>
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
      delay: this.animeindex * 200,
      translateX: [1000, 0], // Translate X from 100 to 200
      // rotate: ['.5turn', '1turn'], // Rotate from 180deg to 360deg
      // scale: ['*=2', 1], // Scale from 2 times the original value to 1,
      // backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
      duration: 1500
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
