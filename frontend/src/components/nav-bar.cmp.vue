<template>
  <section class="nav-bar-container">
    <nav class="nav-bar">
      <router-link to="/"> <img class="logo-img" src="../assets/imgs/eyes logo.png"/></router-link>
      <div class="nav-links">
        <router-link to="/events">Events</router-link>
        <router-link to="/event/edit">Create Event</router-link>
        <router-link to="/about">About</router-link>
        <router-link v-if="!loggedInUser" to="/login">Login</router-link>
        <router-link v-if="loggedInUser" to="/login">
        <button v-if="loggedInUser" class="user-btn">
        <avatar v-if="!loggedInUser.imgUrl" class="nav-user-img" inline :size="30" :username="loggedInUser.fullName"></avatar>
        <avatar v-else class="nav-user-img" inline :size="30" :src="loggedInUser.imgUrl"></avatar>
        {{loggedInUser.fullName}}
        </button>
        </router-link>
        <!-- <button class="btn-menu" @click="toggleMenu">☰</button> -->
      </div>
    </nav>
  </section>
</template>


<script>
import Avatar from 'vue-avatar'
export default {
  name: "nav-bar",

  computed:{
  loggedInUser() {
    return this.$store.getters.loggedInUser;
    }
  },
  components: {
    Avatar
  }







}
</script>



