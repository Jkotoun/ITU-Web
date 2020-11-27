<template>
  <div class="about">
    <h1>Zadar</h1>
    <p>{{ response }}</p>
  </div>
</template>

<script>
import { GetUser } from "../modules/ApiModel";
export default {
  data() {
    return {
      response: String,
    };
  },
  async created() {
    GetUser(1).then(user => (this.response = user));
  },
};
</script>
