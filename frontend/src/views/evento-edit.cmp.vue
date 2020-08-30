
<template>
   <section class="evento-edit">

 <div class="edit-hero">
    <h1>{{ (eventoToEdit._id) ? 'Edit' : 'Add New' }} Event</h1>
    <!-- <h2>We will share it with others</h2> -->

    <img src="../assets/imgs/1.jpg" class="hero-edit-img" />
    <!-- <img src="../assets/imgs/hero-list.jpg" class="hero-edit-img" /> -->
    <!-- <img src="../assets/imgs/2.jpg" class="hero-edit-img" /> -->
    <!-- <img src="../assets/imgs/list-hero2.jpg" class="hero-edit-img" /> -->
</div>




    <form class="flex column" v-if="eventoToEdit" @submit.prevent="saveEvento">
      
      <div class="justify-center flex">
      <label>
        <h3>My event is about:</h3>
        <input class="add-event-placeholder" type="text" v-model="eventoToEdit.title" placeholder="Add event title..." />
      </label>
      </div>

      <div class="justify-center flex">

      <label>
        <h3>Be there on:</h3>
        <!-- <input class="add-event-placeholder" type="date" v-model="eventoToEdit.startDate" placeholder="Event start date..." /> -->
        <input class="add-event-date" type="date" v-model="eventoToEdit.startDate" />
      </label>

      <label>
        <h3>Starting at:</h3>
        <input class="add-event-time" type="time" v-model="eventoToEdit.startTime" />
      </label>
      </div>

<div class="justify-center flex">
      <label>
        <h3>Event Description:</h3>
        <textarea class="add-event-placeholder add-desc-placeholder" type="text" v-model="eventoToEdit.desc" placeholder="Add event description..." />
</label>
</div>

<div class="justify-center flex">
     <label>
        <h3>About the Host:</h3>
        <textarea class="add-event-placeholder add-desc-placeholder" type="text" v-model="eventoToEdit.about" placeholder="Add some abouts..." />
      </label>
</div>


<div class="justify-center flex">
    <button class="back-btn" title="Back" @click="$router.push('/events')">◄ To Events</button>
    <!-- </div> -->
<!-- <div class="justify-center flex"> -->
      <button  class="add-btn">Add Event ►</button>
</div>

    </form>

    <button v-if="eventoToEdit.id" @click="removeEvento">Delete</button>
   </section>
</template>
<script>



import { eventoService } from "../services/evento.service.js";
const _ = require("lodash");

export default {
  name: "evento-edit",
  data() {
    return {
      eventoToEdit: null
    };
  },
  
  methods: {
    loadEvento() {
      const eventoId = this.$route.params.id;
      if (eventoId) {
        eventoService.getById(eventoId).then(evento => {
          this.eventoToEdit = _.cloneDeep(evento);
        });
      } else this.eventoToEdit = eventoService.getEmptyEvento();
    },
    saveEvento() {
      const loggedInUser = this.$store.getters.loggedInUser;
      this.eventoToEdit.createdBy = loggedInUser;
      this.$store
        .dispatch({ type: "saveEvento", evento: this.eventoToEdit })
        .then(evento => {
          this.$router.push("/events");
        });
    },
    removeEvento(){
      console.log('removing...');
      this.$store.dispatch({ type: 'removeEvento',id: this.eventoToEdit.id})
      .then((savedEvento)=>{
                this.$router.push('/');
    })
    }
  },
  watch: {
    "$route.params.id"() {
      this.loadEvento();
    }
  },
  created() {
    this.loadEvento();
  }
};
</script>

