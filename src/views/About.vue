<template>
  <div class="about">
    <h1>Zadar</h1>
    <p>{{ user }}</p>
    <p>{{ events }}</p>
  </div>
</template>

<script>
import { GetUser, User, Event, GetUserEvents } from "../modules/ApiModel";
export default {
  data() {
    return {
      user: User,
      events: [Event],
    };
  },
  async created() {
    await GetUser(1).then(user => (this.user = user));
    GetUserEvents(this.user.id).then(events => (this.events = events));
  },
};
</script>
