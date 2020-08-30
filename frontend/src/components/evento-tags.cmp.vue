<template>
  <section>

    <el-row class="el-row">
    <el-button class="el-button" plain v-model="filterBy.tags" value="technology" @click="filterOn">Technology</el-button>
    <el-button plain  v-model="filterBy.tags" value="career" @click="filterOn">Career</el-button>
    <el-button plain  v-model="filterBy.tags" value="coding" @click="filterOn">Coding</el-button>
    <el-button plain  v-model="filterBy.tags" value="design" @click="filterOn">Design</el-button>
    <el-button plain  v-model="filterBy.tags" value="support" @click="filterOn">Support</el-button>
    <el-button plain  v-model="filterBy.tags" value="marketing" @click="filterOn">Marketing</el-button>
    <el-button plain  v-model="filterBy.tags" value="business" @click="filterOn">Business</el-button>
    <el-button plain  v-model="filterBy.tags" value="sales" @click="filterOn">Sales</el-button>
    </el-row>

  
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "evento-tags",
  data() {
    return {
      filterBy: {},
    };
  },
  components: {
    ValidationProvider
  },
  methods: {
    filterOn() {
      // this.$store.commit({
      //   type: "updateFilterBy",
      //   filterBy: { ...this.filterBy }
      // });
      this.$store.dispatch({ type: "loadEventos" });
      this.$router.push("/events");
    },
  
  },


};
</script>

