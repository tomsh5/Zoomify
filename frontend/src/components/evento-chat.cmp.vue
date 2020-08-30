<template>
  <section>
    <h3>Chat</h3>
    <div class="evento-chat">
      <div class="chat-header">
        <p
          v-if="isTyping & whoType !== loggedInUser.fullName"
          class="typing"
        >{{whoType}} is typing...</p>
        <p v-else> Online </p>
      </div>
      <div class="chat-body">
      <ul>
        <li v-for="(msg, idx) in msgs" :key="idx">{{msg.from}}: {{msg.txt}}</li>
      </ul>
      </div>

      <form class="chat-input" @submit.prevent="sendMsg">
        <input @input="userTyping" type="text" v-model="msg.txt" placeholder="Type your massege" />
        <button class="send-btn">Send</button>
      </form>
      </div>
  </section>
</template>


<script>
import { eventoService } from "../services/evento.service.js";
import socketService from "../services/socket.service.js";

export default {
  name: "evento-chat",
  data() {
    return {
      evento: null,
      msg: { from: "me", txt: "" },
      msgs: [],
      txt: "is typing...",
      isTyping: false,
      whoType: "",
    };
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },

  methods: {
    stopTyping() {
      this.isTyping = false;
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      this.msg.from = this.$store.getters.loggedInUser.fullName;
      socketService.emit("chat newMsg", this.msg);
      this.msg = { from: "Me", txt: "" };
    },

     userTyping() {
      const userName= this.loggedInUser.fullName
      socketService.emit("user typing", userName);
    },

    showUserTyping(userName) {
      this.whoType = userName;
      this.isTyping = true;

      setTimeout(this.stopTyping, 2000);
    },
   
  },

  created() {
    socketService.setup();
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("show typing", this.showUserTyping);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
};
</script>