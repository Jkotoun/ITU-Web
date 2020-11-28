<template>
  <div class="about">
    <h1>Zadar</h1>
    <p>{{ user }}</p>
    <p>{{ events }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetUser, User, Event, GetUserEvents } from "../modules/ApiModel";

@Component
export default class About extends Vue {
  public user: User = {} as User;
  public events: Event[] = [];

  async created() {
    const userId = 1;
    GetUser(userId).then(user => (this.user = user));
    GetUserEvents(userId).then(events => (this.events = events));
  }
}
</script>
