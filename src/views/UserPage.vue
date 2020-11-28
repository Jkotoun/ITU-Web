<template>
  <b-container fluid>
    <h1 class="my-4">{{ user.name }}</h1>
    <b-row class="my-5">
      <b-col>
        <UserInfo class="info" :user="user" />
      </b-col>
      <b-col> </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>Nadcházející lety</h2>
        <EventInfo class="info" :events="futureEvents" />
      </b-col>
      <b-col>
        <h2>Proběhlé lety</h2>
        <EventInfo class="info" :events="pastEvents" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { GetUser, User, Event, GetUserEvents } from "../modules/ApiModel";
import UserInfo from "../components/UserInfo.vue";
import EventInfo from "../components/EventInfo.vue";

@Component({
  components: {
    UserInfo,
    EventInfo,
  },
})
export default class UserPage extends Vue {
  public user: User = {} as User;
  public events: Event[] = [];

  async created() {
    this.LoadData();
  }

  @Watch("$route")
  async LoadData() {
    const userId = parseInt(this.$route.params.id);
    GetUser(userId).then((user) => (this.user = user));
    GetUserEvents(userId).then((events) => (this.events = events));
  }

  get futureEvents(): Event[] {
    return this.events.filter((a) => new Date(a.startDate) > new Date());
  }
  get pastEvents(): Event[] {
    return this.events.filter((a) => new Date(a.startDate) < new Date());
  }
}
</script>

<style scoped>
.info {
  margin: 1.4em 0;
}
</style>
