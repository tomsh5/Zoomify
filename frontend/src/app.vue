<template>
  <div id="app" class="app">
    <nav-bar />
    <router-view />
    <evento-footer></evento-footer>
  </div>
</template>

<script>

import navBar from './components/nav-bar.cmp.vue';
import eventoFooter from './components/evento-footer.cmp.vue';

export default {
  name: "app",
  components: {
    navBar,
    eventoFooter
  }
};
</script>



