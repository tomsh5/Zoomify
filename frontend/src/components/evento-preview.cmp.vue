<template>
  <router-link :to="'/event/details/' + this.evento._id">
    <div class="evento-preview" >
      <!-- <img v-if="evento.imgUrls" :src="evento.imgUrls"> -->
      <!-- <img class="evento-img" v-else :src="`https://www.jeffbullas.com/wp-content/uploads/2017/06/Why-Live-Events-Should-Be-At-The-Center-Of-Your-Marketing-Strategy.jpg`"> -->
      <img class="evento-img" :src="evento.imgUrl" />


      <div class="card-txt">
      <div class="creator-details">
        <img class="creator-img" :src="evento.createdBy.imgUrl" />
        <h4 class="card-h4">By {{evento.createdBy.fullName}},<br>{{evento.country}}</h4>
      </div>
      <h3 class="card-h3">{{ evento.title }}</h3>

      <p class="prev-price-tag"><i class="fas fa-tag"></i> Free of charge</p>
      
      <div class="event-star-date">
      <div class="star">
        <p class="fas fa-star">{{evento.avgRating}}</p>
        <span class="raters"> ({{evento.raters}}) </span>
      </div>
      <p class="event-date">{{eventoDate.toLocaleString()}}</p>
      </div>
      </div>

      <!-- <p>id: {{ evento.id }}</p> -->

      <!-- <a :href="`#${evento.link}`" class="join">Join ›</a> -->
      <!-- <router-link :to="'/event/edit/' + evento.id">Edit</router-link>         -->
      <!-- <router-link :to="'/event/details/' + evento.id">Details</router-link> -->
    </div>
  </router-link>
</template>


<script>
import { utilService } from "../services/util.service.js";

export default {
  title: "evento-preview",
  props: {
    evento: {
      type: Object,
      required: true,
    },
  },

  getters: {},
  computed: {
    eventoDate() {
      var dbDate = this.evento.startDate;
      // var today = new Date()
      // var newDate = today.setDate(today.getDate() + utilService.getRandomInt(10, 200))
      // if (dbDate < today) return newDate.toLocaleString()
      // // else return dbDate
      // // return today.toLocaleDateString()
      return dbDate;
    },
  },
  methods: {},
};
</script>


<style lang="scss">
</style>