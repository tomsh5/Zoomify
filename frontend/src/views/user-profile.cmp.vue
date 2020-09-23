<template>
  <section class="main-layout">
      <div class="user-profile flex column align-center">
    <div class="profile-nav">
      <!-- <h2>Hello {{loggedInUser.fullName}}</h2> -->
        <router-view></router-view>
        <router-link to='/profile/details'>User details</router-link>
        <router-link to='/profile/joined'>Joined Events</router-link>
        <router-link to='/profile/created'>Created event</router-link>
    </div>
    <main class="main-profile"></main>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  components: {
    Avatar,
  },
};
</script>

