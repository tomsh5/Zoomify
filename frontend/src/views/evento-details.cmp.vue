<template>
  <section v-if="evento" class="evento-details main-layout">
    <div class="evento-details-hero">
      <div>
        <img :src="evento.imgUrls.img2" />
      </div>
      <div>
        <img :src="evento.imgUrl" />
      </div>
      <div>
        <img :src="evento.imgUrls.img1" />
      </div>
    </div>

    <div class="evento-content flex">
      <div class="top-desc">
        <div class="evento-details-title">
          <span v-for="tag in evento.tags" :key="tag" class="evento-tag">{{tag}}</span>
          {{evento.avgRating}}
          <i class="fas fa-star"></i>
          ({{evento.raters}})
          <h1 class="evento-details-h1">{{evento.title}}</h1>
          <h2 class="evento-details-h2">By {{evento.createdBy.fullName}}</h2>

          <h4 class="evento-details-h4">
            <i class="fas fa-map-marker-alt"></i>
            {{evento.country}}
          </h4>
        </div>

        <div class="evento-info">
          <p>
            <i class="far fa-clock"></i>
            {{evento.dur}} Minutes
          </p>
          <p>
            <i class="fas fa-globe-americas"></i>
            {{evento.lang}}
          </p>
          <p>
            <i class="fas fa-desktop"></i>
            Join from any device
          </p>
          <p>
            <i class="fas fa-users"></i>
            Up to {{evento.capacity}} pepole
          </p>
          <p>
            <i class="far fa-calendar-alt"></i>
            {{evento.startDate}} {{evento.startTime}}
          </p>
          <p>
            <i class="fas fa-tag"></i>
            Free
          </p>
        </div>
        <div class="evento-description">
          <h3>About the event</h3>
          <p>{{evento.desc}}</p>
        </div>
        <div class="about-creator">
          <div class="about-creator-title flex align-center">
            <avatar :src="evento.createdBy.imgUrl"></avatar>
            <h3>Meet your host, {{evento.createdBy.fullName}}</h3>
          </div>

          <p>{{evento.about}}</p>
        </div>

        <!-- <div class="reviews">
          <div v-for="review in evento.reviews" :key="review.id">
            <avatar :src="review.imgUrl"></avatar>
            <p class="review-title">
              {{review.givenRating}}
              <i class="fas fa-star"></i>
              {{review.fullName}}
            </p>
            <p>{{review.txt}}</p>
          </div>
        </div>-->

        <section class="reviews-container">
          <div class="flex space-between">
            <h3>Reviews</h3>
            <h4>Show all</h4>
          </div>

          <el-carousel :interval="0" indicator-position="none" arrow="never" height="260px">
            <el-carousel-item>
              <div class="reviews">
                <div class="review" v-for="review in evento.reviews" :key="review.id">
                  <avatar :src="review.imgUrl"></avatar>
                  <p class="review-title">{{review.fullName}}</p>
                  <p>
                    {{review.givenRating}}
                    <i class="fas fa-star"></i>
                  </p>

                  <p>{{review.txt}}</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </section>

        <section class="related-lectures-container">
          <h3>Related lectures</h3>

          <el-carousel :interval="0" indicator-position="none" arrow="never" height=400px>
          <el-carousel-item >
              <evento-list :eventos="relatedEventos"/>
          </el-carousel-item>
          </el-carousel>
        </section>
      </div>
      <div class="evento-join">
        <form @submit.prevent="addGuest" v-if="!loggedInUser" class="guest-sign">
          <p>
            <input v-model="guestToAdd.fullName" type="text" placeholder="Type your name" />
          </p>
          <p>
            <input v-model="guestToAdd.email" type="text" placeholder="Type your Email" />
          </p>
        </form>
     
        <section class="action-container">
        <button v-if="!isJoined" @click="open" class="join-btn">Join Event</button>
        <div class="evento-start" v-else>
          <div class="evento-start-txt">
            <h4>Event starts in <i>
              {{countDownMinutes}}:
              <i v-if="(countDownSeconds < 10)">0</i>{{countDownSeconds}} minutes
            </i></h4>
            
          </div>
          <button type="text" @click="modal" class="start-btn">Start event !</button>
        </div>
        </section>

        <h3>Event Members</h3>
        <div class="members-container">
          <div class="evento-members" v-for="member in evento.members" :key="member.id">
            <el-tooltip :content="member.fullName" placement="top-start" effect="dark">
              <avatar v-if="!member.imgUrl" :username="member.fullName"></avatar>
              <avatar v-else :src="member.imgUrl"></avatar>
            </el-tooltip>
          </div>
        </div>
        <evento-chat v-if="isJoined"></evento-chat>
      </div>
    </div>
  </section>
</template>


<script>
import socketService from "../services/socket.service.js";
import { eventoService } from "../services/evento.service.js";
import Avatar from "vue-avatar";
import eventoList from "../components/evento-list.cmp";
import eventoChat from "../components/evento-chat.cmp";

export default {
  name: "evento-details",
  data() {
    return {
      evento: null,
      isJoined: false, 
      guestToAdd: {},
      memberToAdd: null,
      countDownSeconds: 31,
      countDownMinutes: 4,
    };
  },

  computed: {
    eventos() {
      return this.$store.getters.eventos;
    },
    relatedEventos() {
      // return this.$store.getters.eventos.filter()
      return this.$store.getters.eventos.filter
      (evento => evento.tags.find(tag => this.evento.tags.find(taag => taag === tag)) && evento._id !== this.evento._id)     

    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    timerOn() {
      return (this.timer = setInterval(this.timeDown(), 1000));
    },
  },

  methods: {
    modal() {
      this.$alert(
        '<iframe width="590" height="390" src="https://www.youtube.com/embed/T7hCMAckRdg?autoplay=1"controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        "The event will start soon...",
        {
          dangerouslyUseHTMLString: true,
          customClass: "video-modal",
          confirmButtonText: "Hide",
          confirmButtonClass: "video-modal-confirm-btn",
          // cancelButtonText: "Cancel",
          cancelButtonClass: "video-modal-cancel-btn"
        }
      );
    },

    countDownTimer() {
      if (this.countDownSeconds >= 0 && this.countDownMinutes >= 0) {
        setTimeout(() => {
          this.countDownSeconds--;
          this.countDownTimer();
        }, 1000);
      } else {
        this.countDownSeconds = 59;
        this.countDownTimer();
        this.countDownMinutes--;
      }
    },

    open() {
      this.$confirm(
        `You are about to join "${this.evento.title}"`,
        "Join Event",
        {
          customClass: "join-modal",
          confirmButtonText: "OK",
          confirmButtonClass: "join-modal-confirm-btn",
          cancelButtonText: "Cancel",
          cancelButtonClass: "join-modal-cancel-btn"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Completed! You can start the event",
          });
          this.joinEvent();
          this.countDownTimer();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Book was cancelled",
          });
        });
    },
    async loadEvento() {
      const eventoId = this.$route.params._id;
      const evento = await eventoService.getById(eventoId);
      this.evento = evento;
    },
    async joinEvent() {
      this.isJoined = true;
      if (this.loggedInUser) {
        this.memberToAdd = this.loggedInUser;
      } else {
        this.evento.members.push(this.guestToAdd);
      }
      const member = this.memberToAdd
      socketService.emit("new member", member);
    },

    showMember(member) {
      this.evento.members.push(member);
      this.$store.dispatch({ type: "saveEvento", evento: this.evento });
    },
  },
  created() {
    socketService.setup();
    socketService.on("show member", this.showMember);
    this.$store.dispatch({ type: "loadEventos" });
    this.loadEvento();
  },

  components: {
    Avatar,
    eventoList,
    eventoChat,
  },
};
</script>