<template>
  <layout
    title="Chile OMS"
    tagline="Estatus de proceso de vacunacion"
    content="Tablero Power BI"
  >
    <template v-slot:navigation>
      <ul class="nav-list">
        <li class="nav-item" v-show="loading">
          <loader/>
        </li>
        <li class="nav-item" v-show="!loading && !subscribed">
          <button
            type="button"
            class="pure-button"
            v-show="registered"
            @click.prevent="subscribeToTopic"
          >
            Activar notificaciones
          </button>
        </li>
        <li class="nav-item" v-show="!loading && subscribed">
          <button
            type="button"
            class="pure-button"
            v-show="registered"
            @click.prevent="unsubscribeFromTopic"
          >
            Desactivar notificaciones
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
import Loader from './components/Loader.vue'
import { askForPermissioToReceiveNotifications } from './pushNotifications'

export default defineComponent({
  name: 'App',
  components: {
    Bi,
    Layout,
    Loader
  },
  data: () => ({
    registered: false,
    subscribed: false,
    loading: false
  }),
  created () {
    this.swListeners()
    this.checkSubscribed()
  },
  methods: {
    checkSubscribed () {
      const token = localStorage.getItem('push-token')
      this.registered = !!token
    },
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
        return false
      }
      if (token.length === 0) {
        return false
      }

      return token
    },
    async subscribeToTopic () {
      this.loading = true
      const token = await this.askForPermission()
      if (!token) {
        this.loading = false
        return
      }

      const topic = 'all'
      const subscribe = 'true'
      const res = await this.subscription(topic, token, subscribe)
      if (res) {
        this.subscribed = true
      }

      this.loading = false
      console.log('response', res)
    },
    async unsubscribeFromTopic () {
      this.loading = true
      const token = await this.askForPermission()
      if (!token) {
        this.loading = false
        return
      }

      const topic = 'all'
      const subscribe = 'false'
      const res = await this.subscription(topic, token, subscribe)
      if (res) {
        localStorage.removeItem('push-token')
        this.subscribed = false
      }

      this.loading = false
      console.log('response', res)
    },
    async subscription (topic: string, token: string, subscribe: string) {
      let res = null
      try {
        res = await fetch(`https://etl-chile.vercel.app/api/push?topic=${topic}&subscribe=${subscribe}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: token
          }
        })
      } catch (error) {
        console.log(error)
        return false
      }

      res = await res.json
      return res
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
