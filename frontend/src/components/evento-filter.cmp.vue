<template>
  <section class="search-bar">

    <el-input

      class="el-input search"
      prefix-icon="el-icon-search"
      @input="filterOn"
      placeholder="Search events ..."
      v-model="filterBy.txt"
    ></el-input>
    <!-- <br /> -->

    <el-select class="el-select" v-model="filterBy.sort" @change="filterOn">
      <el-option label="sort by: title" value="title"></el-option>
      <el-option label="sort by: date" value="startDate"></el-option>
    </el-select>

    <el-select v-model="filterBy.order"  @change="filterOn">
      <el-option label="Order: ascending" value="asc"></el-option>
      <el-option label="Order: descending" value="desc"></el-option>
    </el-select>

    <el-select v-model="filterBy.tags"  @change="filterOn">
      <el-option label="Show all categories" value></el-option>
      <el-option label="technology" value="technology"></el-option>
      <el-option label="career" value="career"></el-option>
      <el-option label="coding" value="coding"></el-option>
      <el-option label="design" value="design"></el-option>
      <el-option label="support" value="support"></el-option>
      <el-option label="marketing" value="marketing"></el-option>
      <el-option label="business" value="business"></el-option>
      <el-option label="sales" value="sales"></el-option>
    </el-select>
    <el-button class="el-button" @click="clearAll">Clear all</el-button>
 


  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "evento-filter",
  data() {
    return {
      filterBy: {},
      email: ""
    };
  },
  components: {
    ValidationProvider
  },
  methods: {
    filterOn() {
      this.$store.commit({
        type: "updateFilterBy",
        filterBy: { ...this.filterBy }
      });
      this.$store.dispatch({ type: "loadEventos" });
    },
    clearAll() {
      this.filterBy.txt = "";
      this.filterBy.tags = "";
      this.filterBy.order = "asc";
      this.filterBy.sort = "title";
      this.filterOn();
    }
  },
  created() {
    const filter = this.$store.getters.filterBy;
    this.filterBy = { ...filter };
  },
  destroyed() {
    this.clearAll()
}
};
</script>

