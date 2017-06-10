<style scoped>
  .modal-card {
    background-color: white;
    height: 80vh!important;
  }
  .modal-card-foot {
    justify-content: flex-end;
  }
</style>

<template>
  <div class="SettingsModal">
    <div class="modal" :class="{'is-active': $parent.settingsModal.opened}">
      <div class="modal-background" @click="$parent.toggleSettingsModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Settings
          </p>
        </header>
        <section class="modal-card-body">
          <settings-input></settings-input>
          <div v-if="invalidKey" class="notification is-danger">
            Sorry, the key you entered is invalid
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button" @click="$parent.toggleSettingsModal()">Cancel</a>
          <a class="button is-primary" @click="setDevId()">Save changes</a>
        </footer>
      </div>
      <button class="modal-close" @click="$parent.toggleSettingsModal()"></button>
    </div>
  </div>
</template>

<script>
  import SettingsInput from './SettingsInput.vue'
  export default {
    name: 'SettingsModal',
    components: {
      SettingsInput
    },
    mounted () {
      let existingKey = window.localStorage.getItem('splashtron')
      if (existingKey) {
        this.placeholder = JSON.parse(existingKey)
        this.$parent.devkey = JSON.parse(existingKey)
      }
    },
    data () {
      return {
        keyInput: '',
        placeholder: '',
        invalidKey: false
      }
    },
    methods: {
      setDevId () {
        this.$http.get('https://api.unsplash.com/search/photos?page=1', {
          params: {
            client_id: this.keyInput,
            query: 'cat'
          }
        })
        .then((response) => {
          console.log('Success! = ', response)
          console.log('saved!', this.keyInput)
          this.$parent.invalidKey = false
          window.localStorage.setItem('splashtron', JSON.stringify(this.keyInput))
          this.$parent.settingsModal.opened = false
          this.$parent.devkey = this.keyInput
        })
        .catch((error) => {
          this.$parent.invalidKey = true
          console.log('Not Saving. Invalid Key', error)
        })
      }
    }
  }
</script>
