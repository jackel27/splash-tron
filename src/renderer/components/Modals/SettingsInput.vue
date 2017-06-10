<style scoped>
  .container    {
    font-family:'Roboto';
    width:600px;
    margin:30px auto 0;
    display:block;
    background: transparent;
    padding:10px 50px 50px;
  }
  .group        {
    position:relative;
    margin-bottom:45px;
  }
  input         {
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid #757575;
  }
  input:focus     { outline:none; }

  /* LABEL ======================================= */
  label          {
    color:#999;
    font-size:18px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }

  /* active state */
  input:focus ~ label, input:valid ~ label    {
    top:-20px;
    font-size:14px;
    color:#5264AE;
  }

  /* BOTTOM BARS ================================= */
  .bar  { position:relative; display:block; width:300px; }
  .bar:before, .bar:after   {
    content:'';
    height:2px;
    width:0;
    bottom:1px;
    position:absolute;
    background:#5264AE;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }
  .bar:before {
    left:50%;
  }
  .bar:after {
    right:50%;
  }

  /* active state */
  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width:50%;
  }

  /* HIGHLIGHTER ================================== */
  .highlight {
    position:absolute;
    height:60%;
    width:100px;
    top:25%;
    left:0;
    pointer-events:none;
    opacity:0.5;
  }

  /* active state */
  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }

  /* ANIMATIONS ================ */
  @-webkit-keyframes inputHighlighter {
    from { background:#5264AE; }
    to  { width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
    from { background:#5264AE; }
    to  { width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
    from { background:#5264AE; }
    to  { width:0; background:transparent; }
  }
</style>

<template>
  <div class="SettingsInput">
    <div class="content">
      <blockquote>To obtain an Unsplash Application ID, go to https://unsplash.com/oauth/applications</blockquote>
    </div>
    <div class="container">
      <form>
        <div class="group">
          <input type="text" v-model="$parent.keyInput" @focus="focused()" @blur="unFocused()" @click="onInput()" :placeholder="focus ? $parent.placeholder : ''" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Application ID</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  // import 'blah' from './components/blah.vue
  name: 'SettingsInput',
  components: {
  },
  mounted () {
  },
  data () {
    return {
      focus: false
    }
  },
  methods: {
    focused () {
      console.log('is focused!')
      this.focus = true
    },
    unFocused () {
      console.log('is unfocused!')
      this.focus = false
    },
    onInput () {
      this.$parent.invalidKey = false
    }
  }
}
</script>
