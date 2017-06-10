<style scoped>
  .sidebar {
    width: 16.5%;
    position: fixed;
    z-index: 99;
    right: 0vw;
    margin-top: 6%;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
  }
  .image-info {
        position: fixed;
    bottom: 5%;
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>

<template>
  <div class="ImageModal">
    <div class="modal" :class="{'is-active': $parent.imageModal.opened}">
      <div class="modal-background" @click="$parent.toggleImageModal()"></div>
        <div class="image-info">
          {{ $parent.imageModal.result.user.name }}
        </div>
      <div class="modal-content">
        <div class="sidebar">
          <a class="button is-info" @click="downloadAndSet($parent.imageModal.result.urls.full)">
            <span class="icon is-small">
              <i class="fa fa-picture-o"></i>
            </span>
            <span>Set as Wallpaper</span>
          </a>
        </div>
        <!-- <button class="button is-primary" @click="downloadAndSet($parent.imageModal.result.urls.full)">Set as wallpaper</button> -->
        <p class="image is-4by3">
        <!-- {{ $parent.imageModal.result.urls }} -->
           <!-- v-if="$parent.imageModal.result.urls.full" -->
            <img v-lazy="$parent.imageModal.result.urls.full">
        </p>
      </div>
      <button class="modal-close" @click="$parent.toggleImageModal()"></button>
    </div>
  </div>
</template>

<script>
  import https from 'https'
  import fs from 'fs'
  import path from 'path'
  export default {
    // import 'blah' from './components/blah.vue
    name: 'ImageModal',
    components: {
    },
    props: {
    },
    data () {
      return {
        url: ''
      }
    },
    methods: {
      downloadAndSet (url) {
        let temp = this.$electron.remote.app.getPath('temp')
        // let options = {
        //   url: url,
        //   dest: path.join(temp, '/wallpaper.jpg')        // Save to /path/to/dest/photo.jpg
        // }
        // this.$Download(url).then(data => {
        //   fs.writeFileSync(path.join(temp, '/wallpaper.jpg'), data)
        //   this.$Wallpaper.set(data).then(() => {
        //     this.$parent.alert = 'Wallpaper Set!'
        //     this.$parent.toggleAlertModal()
        //     console.log('Wallpaper Set!')
        //   })
        // }, (error) => {
        //   console.log(error)
        // })
        // fs.unlinkSync(path.join(temp, '/wallpaper.jpg'))
        // ---------------------
        // this.$Download(url, path.join(temp, '/wallpaper.jpg')).then(() => {
        //   // console.log('getting this... ', data)
        //   this.$Wallpaper.set(path.join(temp, '/wallpaper.jpg')).then(() => {
        //     this.$parent.alert = 'Wallpaper Set!'
        //     this.$parent.toggleAlertModal()
        //     console.log('Wallpaper Set!')
        //   })
        // }, (error) => {
        //   console.log(error)
        // })
        // -----------------
        // let download = (url, dest, cb) => {
        let dest = path.join(temp, '/wallpaper.jpg')
        let file = fs.createWriteStream(dest)
        https.get(url, (response) => {
          response.pipe(file)
          file.on('finish', () => {
            file.close(cb)  // close() is async, call cb after close completes.
            this.$Wallpaper.set(path.join(temp, '/wallpaper.jpg')).then(() => {
              this.$parent.alert = 'Wallpaper Set!'
              this.$parent.toggleAlertModal()
              console.log('Wallpaper Set!')
            })
          })
        }).on('error', (err) => { // Handle errors
          fs.unlink(dest) // Delete the file async. (But we don't check the result)
          if (cb) cb(err.message)
        })
        function cb (arg) {
          console.log('finished ', arg)
        }
        // }
        // this.$Download.image(options)
        //   .then(({ filename, image }) => {
        //     console.log('File saved to', filename)
        //     // download successful, apply to wallpaper
        //     this.$Wallpaper.set(filename).then(() => {
        //       this.$parent.alert = 'Wallpaper Set!'
        //       this.$parent.toggleAlertModal()
        //       console.log('Wallpaper Set!')
        //     })
        //   }).catch((err) => {
        //     throw err
        //   })
      },
      updateImage () {
        this.url = ''
        this.$nextTick(() => {
          this.url = this.$parent.imageModal.result.urls.full
        })
      }
    }
  }
</script>
