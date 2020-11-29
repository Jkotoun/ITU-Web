<template>
  <b-container fluid>
    <h1 class="my-4">{{ user.name }}</h1>
    <b-row class="my-5">
      <b-col>
        <UserInfo class="info" :user="user" />
      </b-col>
      <b-col>
        <b-row>
          <b-col>
            <BarGraph v-if="loaded" :data="escortEventsCountData" />
          </b-col>
          <b-col> </b-col>
          <b-col> </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row> </b-row>
      </b-col>
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
import BarGraph from "../components/BarGraph.vue";

@Component({
  components: {
    UserInfo,
    EventInfo,
    BarGraph,
  },
})
export default class UserPage extends Vue {
  public user: User = {} as User;
  public events: Event[] = [];
  public loaded = false;

  async created() {
    this.LoadData();
  }

  @Watch("$route")
  async LoadData() {
    const userId = parseInt(this.$route.params.id);
    Promise.all([GetUser(userId), GetUserEvents(userId)]).then(
      ([user, events]) => {
        this.user = user;
        this.events = events;
        this.loaded = true;
      },
    );
  }

  get futureEvents(): Event[] {
    return this.events.filter((a) => new Date(a.startDate) > new Date());
  }
  get pastEvents(): Event[] {
    return this.events.filter((a) => new Date(a.startDate) < new Date());
  }

  get escortEventsCountData(): any {
    const escortCount = this.events.filter((a) => a.escortId == this.user.id)
      .length;
    const pilotCount = this.events.filter((a) => a.pilotId == this.user.id)
      .length;
    return {
      labels: ["Jako doprovod", "Jako pilot"],
      datasets: [
        {
          data: [escortCount, pilotCount],
          borderWidth: 1,
        },
      ],
    };
  }
}
</script>

<style scoped>
.info {
  margin: 1.4em 0;
}
</style>
