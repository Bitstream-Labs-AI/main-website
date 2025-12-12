<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
#app-wrapper {
  min-height: 100vh;
  width: 100%;
}
</style>
