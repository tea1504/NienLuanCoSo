<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    showAlert() {
      this.$swal(this.msg);
    },
  },
};
</script>

<style scoped>
</style>