<template>
  <section>
    <nav class="nav-bar">
      <router-link to="/">
        <img class="logo-img" src="../assets/imgs/eyes logo.png" />
      </router-link>
      <div class="nav-links">
        <router-link to="/events">Events</router-link>
        <router-link to="/event/edit">Create Event</router-link>
        <!-- <router-link to="/about">About</router-link> -->
        <router-link v-if="!loggedInUser" to="/login">Login</router-link>
        <router-link v-if="loggedInUser" to="/profile/">
          <button v-if="loggedInUser" class="user-btn">
            <avatar
              v-if="!loggedInUser.imgUrl"
              class="nav-user-img"
              inline
              :size="30"
              :username="loggedInUser.fullName"
            ></avatar>
            <avatar v-else class="nav-user-img" inline :size="30" :src="loggedInUser.imgUrl"></avatar>
            {{loggedInUser.fullName}}
          </button>
        </router-link>
        <Slide :closeOnNavigation="true" right>
          <!-- <li><router-link to="/events">Events</router-link></li> -->

          <li v-if="!loggedInUser" @click="goToLogin">Login</li>
          <div class="flex column align-center" v-else>
          <div class="mobile-avatar flex justify-center"> 
          <avatar
              v-if="!loggedInUser.imgUrl"
              class="nav-user-img"
              inline
              :size="70"
              :username="loggedInUser.fullName"
            ></avatar>
            <avatar v-else class="nav-user-img" inline :size="30" :src="loggedInUser.imgUrl"></avatar>
            </div>
          <i class="mobile-name">Hello {{loggedInUser.fullName}}</i>
          <ul class="mobile-user flex">
            <li @click="goToProfile">Profile</li>
            <li @click="doLogout">Logout</li>
          </ul>
          </div>
          <li @click="goToEventos">Events</li>
          <li @click="goToCreate">Create Event</li>
          <!-- <li @click="goToAbout">About</li> -->

          <!-- <li>Hey</li> -->
          <!-- <li><router-link to="/events">Events</router-link></li>  -->
        </Slide>
        <!-- <button class="btn-menu" @click="toggleMenu">☰</button> -->
      </div>
    </nav>
  </section>
</template>


<script>
import Avatar from "vue-avatar";
import { Slide } from "vue-burger-menu";
export default {
  name: "nav-bar",

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },

  methods: {
    goToEventos() {
      this.$router.push("/events");
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToCreate() {
      this.$router.push("/event/edit");
    },
    goToAbout() {
      this.$router.push("/about");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push('/')
    },
  },

  components: {
    Avatar,
    Slide,
  },
};
</script>



