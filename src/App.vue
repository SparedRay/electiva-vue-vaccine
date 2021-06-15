<template>
  <bi />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bi from './components/Bi.vue'

export default defineComponent({
  name: 'App',
  components: {
    Bi
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
