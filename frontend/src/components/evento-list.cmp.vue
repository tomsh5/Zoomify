<template>
      <section class="list-container">
      <div v-for="evento in eventos" :key="evento.id">
          <evento-preview :evento="evento" />
      </div>
      </section>
</template>


<script>

import eventoPreview from '../components/evento-preview.cmp';

export default {
  name: 'evento-list',
  props: {
      eventos: {
          type: Array,
          required: true
      }
  },
  methods: {
      remove(id) {
          this.$emit('eventoRemoved', id);
      }
  },
  components: {
    eventoPreview
  }
}

</script>
