<style scoped>
  .Home {
    max-height: 100vh!important;
  }
  .results {
    margin: 0!important;
    position: absolute;
    bottom: 1%;
  }
  .settings-button {
    position: absolute;
    left: 1%;
    top: 1%;
    color: aliceblue;
  }
  .quit-button {
    position: absolute;
    right: 1%;
    top: 1%;
    color: aliceblue;
  }
  .settings-button, .quit-button {
    position: absolute;
  }
  .pagination-list {
    justify-content: center
  }
  .pagination {
    margin-top: 6%;
  }
</style>

<template>
  <div class="Home">
  <image-modal></image-modal>
  <alert :alert="alert"></alert>
  <settings-modal></settings-modal>
    <div class="settings-button">
      <span class="icon is-medium" @click="toggleSettingsModal()">
        <i class="fa fa-gear"></i>
      </span>
    </div>
    <div class="quit-button">
      <span class="icon is-medium">
        <i class="fa fa-close"></i>
      </span>
    </div>

    <main-header></main-header>
    <search></search>
    <nav v-if="results.total_pages > 1" class="pagination">
<!--       <a class="pagination-previous" title="This is the first page" disabled>Previous</a>
      <a class="pagination-next">Next page</a> -->
      <ul class="pagination-list">
        <li>
          <a class="pagination-link" @click="n !== page ? changePage(n) : ''" v-for="n in results.total_pages" :disabled="n === page ? true : false" :class="{'is-current': page === n}" v-if="n < 11">{{n}}</a>
        </li>
      </ul>
    </nav>
    <div class="columns results is-multiline">
      <result v-if="index < 8" v-for="(result, index) in results.results" :key="index" :animeindex="index" :class="['result' + index]" :result=result></result>
    </div>
  </div>
</template>

<script>
  import MainHeader from './MainHeader.vue'
  import Search from './Search.vue'
  import Result from './Result.vue'
  import ImageModal from './Modals/ImageModal.vue'
  import SettingsModal from './Modals/SettingsModal.vue'
  import alert from './Modals/alert.vue'
  // import 'blah' from './components/blah.vue
  export default {
    name: 'Home',
    components: {
      Search,
      MainHeader,
      Result,
      ImageModal,
      SettingsModal,
      alert
    },
    mounted () {
      this.focusSearch()
      let existingKey = window.localStorage.getItem('splashtron')
      if (existingKey) {
        this.$parent.devkey = JSON.parse(existingKey)
      }
    },
    watch: {
    },
    data () {
      return {
        alertModal: {
          opened: false
        },
        alertBody: '',
        currentQuery: '',
        page: 1,
        maxPages: 0,
        devkey: '',
        timeline: this.$Anime.timeline({
          direction: 'alternate',
          auoplay: true
        }),
        invalidKey: false,
        results: ['nothing'],
        imageModal: {
          opened: false,
          result: {
            urls: {
              full: ''
            },
            user: {
              name: ''
            }
          }
        },
        settingsModal: {
          opened: false
        }
      }
    },
    methods: {
      changePage (page) {
        this.$http.get('https://api.unsplash.com/search/photos', {
          params: {
            page: page,
            client_id: this.devkey,
            query: this.currentQuery
          }
        })
        .then((response) => {
          console.log(response)
          this.results = response.data
          this.page = page
        })
        .catch((error) => {
          console.log(error)
        })
      },
      toggleImageModal (result) {
        console.log('hi', result)
        this.imageModal.opened = !this.imageModal.opened
        if (result) {
          this.imageModal.result.urls.full = result.urls.full
          this.imageModal.result.user.name = result.user.name
        }
        if (this.imageModal.opened === false) {
          this.imageModal.result.urls.full = ''
          this.focusSearch()
        }
      },
      toggleAlertModal () {
        this.alertModal.opened = !this.alertModal.opened
        if (!this.alertModal.opened) {
          this.focusSearch()
          this.toggleImageModal()
        }
      },
      toggleSettingsModal () {
        this.settingsModal.opened = !this.settingsModal.opened
        if (!this.settingsModal.opened) {
          this.focusSearch()
        }
      },
      focusSearch () {
        if (this.settingsModal.opened === false && this.imageModal.opened === false) {
          document.getElementById('user-query').focus()
        }
      }
    }
  }
</script>
