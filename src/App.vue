<template>
  <layout
    title="Chile OMS"
    tagline="Estatus de proceso de vacunacion"
    content="Tablero Power BI"
  >
    <template v-slot:navigation>
      <ul class="nav-list">
        <li class="nav-item">
          <button
            type="button"
            class="pure-button"
            v-show="registered"
            @click.prevent="askForPermission"
          >
            Activar notificaciones
          </button>
        </li>
      </ul>
    </template>
    <bi />
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bi from './components/Bi.vue'
import Layout from './components/Layout.vue'
import { askForPermissioToReceiveNotifications } from './pushNotifications'

export default defineComponent({
  name: 'App',
  components: {
    Bi,
    Layout
  },
  data: () => ({
    registered: false
  }),
  created () {
    this.swListeners()
  },
  methods: {
    swListeners () {
      document.addEventListener('sw:registered', async () => {
        this.registered = true
      })
    },
    async askForPermission () {
      let token = null
      try {
        token = await askForPermissioToReceiveNotifications()
      } catch (e) {
        console.log('Error while getting token', e)
        return
      }
      if (token.length === 0) return

      const topic = 'all'
      let res = null
      try {
        res = await fetch(`https://etl-chile.vercel.app/api/push?topic=${topic}&subscribe=true`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: token
          }
        })
      } catch (error) {
        console.log(error)
        return
      }

      console.log('response', res)
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
