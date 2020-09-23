<template>
<section>

  <div class="all-events-hero">
    <h1 class="list-h1">All Events</h1>
    <img src="../assets/imgs/list-cover.jpg" class="hero-list-img" />
   </div>

  <div class="list-filter">
    <evento-filter @setFilter="setFilter()" />
  </div>

  <div v-if="!isLoading" class="evento-list main-layout">
    <evento-list  :eventos="eventos" />
  </div>
  <div v-else class="isLoading">
  <img src="../assets/imgs/loading.gif" alt="Loading...">
  </div>
</section>
</template>



<script>

import eventoList from '../components/evento-list.cmp';
import eventoFilter from '../components/evento-filter.cmp';

export default {
  name: 'evento-app',
  computed: {
    eventos() {
      return this.$store.getters.eventos
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    setFilter(filterBy) {
            this.$store.commit({type: 'setFilter', filterBy: filterBy})
            this.$store.dispatch({type: 'loadEventos'})
        }
  },
  created() {
      this.$store.dispatch({ type: 'loadEventos' })
  },

  components: {
    eventoList,
    eventoFilter
  }
}

</script>
