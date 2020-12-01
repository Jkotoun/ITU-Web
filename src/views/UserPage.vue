<template>
  <b-container fluid>
    <h1 class="my-4">{{ user.name }}</h1>
    <b-row class="my-5">
      <b-col>
        <UserInfo class="info" :user="userVM" />
      </b-col>
      <b-col>
        <div>
          <b-row>
            <b-col cols="6">
              <h3>Lety na pozici</h3>
              <BarGraph v-if="loaded" :data="escortEventsCountData" />
            </b-col>
            <b-col cols="6">
              <h3>Lety ve dnech</h3>
              <BarGraph v-if="loaded" :data="weekDayCounts" />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <h3>Lety v měsících</h3>
              <BarGraph v-if="loaded" :data="monthsCounts" />
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>Nadcházející lety</h2>
        <Events class="info" :events="futureEvents" />
      </b-col>
      <b-col>
        <h2>Proběhlé lety</h2>
        <Events class="info" :events="pastEvents" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { GetUser, User, Event, GetUserEvents } from "../modules/ApiModel";
import UserInfo from "../components/UserInfo.vue";
import Events from "../components/Events.vue";
import BarGraph from "../components/BarGraph.vue";
import * as Stats from "../modules/Stats";

@Component({
  components: {
    UserInfo,
    Events,
    BarGraph,
  },
})
export default class UserPage extends Vue {
  user: User = {} as User;
  userVM: any = {};
  events: Event[] = [];
  loaded = false;

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
        this.userVM = user;
        this.userVM.eventCount = this.events.length;
        this.userVM.customerCount = this.events
          .map((a) => a.customerCount)
          .reduce((a, b) => a + b);
        const sortedEvents = this.events.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        );
        if (sortedEvents.length > 0) {
          this.userVM.firstEventDate = new Date(
            sortedEvents[0].startDate,
          ).toLocaleDateString();
          this.userVM.lastEventDate = new Date(
            sortedEvents[sortedEvents.length - 1].startDate,
          ).toLocaleDateString();
        }
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

  get escortEventsCountData(): {} {
    return Stats.escortEventsCountData(this.events, this.user.id);
  }

  get weekDayCounts(): {} {
    return Stats.weekDayCounts(this.events);
  }

  get monthsCounts(): {} {
    return Stats.monthsCounts(this.events);
  }
}
</script>

<style scoped>
.info {
  margin: 1.4em 0;
}
</style>
