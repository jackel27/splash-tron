<style scoped>
  .control {
    width: 50%;
    margin: 0 auto;
    padding: 20px;
  }
  .field {
  }
  .input {
    font-family: 'Roboto', sans-serif;
    font-weight: 200;
    background-color: transparent;
    border: none;
    box-shadow: none;
    text-align: center;
    color: white;
    caret-color: white;
  }
  .input::placeholder {
    color: white;
  }
</style>

<template>
  <div class="Search">
    <div class="field">
      <div class="control">
        <input type="text" @blur="$parent.focusSearch()" id="user-query" class="input is-large" @keyup.enter="getPhotos()" v-model="query" placeholder="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // import 'blah' from './components/blah.vue
  name: 'Search',
  components: {
  },
  mounted () {
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    getPhotos () {
      this.$http.get('https://api.unsplash.com/search/photos', {
        params: {
          // page: this.$parent.page,
          client_id: this.$parent.devkey,
          query: this.query
        }
      })
      .then((response) => {
        console.log(response)
        this.$parent.results = response.data
        this.$parent.currentQuery = this.query
        this.$parent.maxPages = response.data.results.total_pages
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
