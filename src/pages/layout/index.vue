<template>
  <div style="margin-bottom: 60px;">
    <router-view />
  </div>
  <tabbar />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tabbar from './components/tabbar.vue';
export default defineComponent({
  name: 'Home',
  components: {
    Tabbar
  }
})
</script>

<style scoped>

</style>