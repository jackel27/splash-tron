<style scoped>
  .modal-content {
    background-color: white;
    height: 25vh;
    width:  50vw;
  }
  .modal-card-foot {
    justify-content: flex-end;
  }
  .modal-card-body {
    text-align: center;
  }
  .alert-text {
    font-size: 2em;
    font-weight: 200!important;
    font-family: 'Roboto', sans-serif!important;
    color: black;
  }
  .fa-check:before {
    color: cornflowerblue;
  }
</style>

<template>
  <div class="alert">
    <div class="modal" :class="{'is-active': $parent.alertModal.opened}">
      <div class="modal-card">
 <!--        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete"></button>
        </header> -->
        <section class="modal-card-body">
          <span class="alert-text">
            {{ alert }}
          </span>
          <span v-if="alert = 'Wallpaper Set!'" class="icon is-large"><i class="fa fa-check"></i></span>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" @click="$parent.toggleAlertModal()">Continue</a>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  // import 'blah' from './components/blah.vue
  name: 'alert',
  components: {
  },
  props: {
    alert: ''
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
