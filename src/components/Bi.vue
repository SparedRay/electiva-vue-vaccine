<template>
  <div class="img-background"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Bi'
})
</script>

<style>
  .img-background {
    width: 100vw;
    height: 90vh;

    background-image: url('/img/bi.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
