<template>
  <router-link :to="'/event/details/' + this.evento._id">
    <div class="evento-preview" >
      <img class="evento-img" :src="evento.imgUrl" />

      <div class="card-txt">
      <div class="creator-details">
        <img class="creator-img" :src="evento.createdBy.imgUrl" />
        <h4 class="card-h4">By {{evento.createdBy.fullName}}</h4>
      </div>
      <h3 class="card-h3">{{ evento.title }}</h3>
      <div class="event-star-date">
      <div class="star">
        <p class="fas fa-star">{{evento.avgRating}}</p>
        <span class="raters"> ({{evento.raters}}) </span>
      
      </div>
      </div>
      <div class="flex">
      <p class="event-date">{{eventoDate.toLocaleString()}}</p>
      <p class="prev-price-tag"><i class="fas fa-tag"></i> Free of charge</p>
      </div>
      
      

    </div>
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
      return dbDate;
    },
  },
  methods: {},
};
</script>
