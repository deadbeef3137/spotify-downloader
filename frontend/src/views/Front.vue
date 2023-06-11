<template>
  <Hero />
</template>

<script>
import { ref, onMounted } from 'vue'
import Hero from '/src/components/Hero.vue'
import API from '../model/api'

export default {
  components: { Hero },
  setup() {
    onMounted(() => {
      window.scroll(0, 0)
      API.check_for_update().then((resp) => {
        if (Boolean(resp.data) === true) {
          alert("Esta versión ya no está soportada, actualiza a la nueva versión https://github.com/deadbeef3137/spotify-downloader")
          }
      }).catch((error) => {
        alert("Esta versión ya no está soportada, actualiza a la nueva versión https://github.com/deadbeef3137/spotify-downloader")
      })
    })
    return {}
  },
}
</script>

<style scoped></style>
