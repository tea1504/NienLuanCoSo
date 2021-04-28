<template>
  <div id="app">
    <b-button @click="showAlert">alert</b-button>
    <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
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