<template>
  <b-container fluid>
    <h1 class="my-4">{{ user.name }}</h1>
    <b-row class="my-5">
      <b-col>
        <UserInfo class="info" :user="userVM" />
      </b-col>
      <b-col>
        <div>
          <EventsControl v-model="controlsValue" />

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
        <h2>Seznam letů</h2>
        <Events class="info" :events="filteredEvents" />
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
import EventsControl from "../components/EventsControl.vue";
import * as Stats from "../modules/Stats";

@Component({
  components: {
    UserInfo,
    Events,
    BarGraph,
    EventsControl,
  },
})
export default class UserPage extends Vue {
  user: User = {} as User;
  userVM: any = {};
  events: Event[] = [];
  loaded = false;
  controlsValue = {
    entriesDate: "",
    eventTypes: ["1", "2"],
  };

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
          .map(a => a.customerCount)
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

  get filteredEvents(): Event[] {
    return this.events.filter(
      a =>
        a.startDate > this.controlsValue.entriesDate &&
        this.controlsValue.eventTypes.includes(a.eventType.toString()),
    );
  }

  get escortEventsCountData(): {} {
    return Stats.escortEventsCountData(this.filteredEvents, this.user.id);
  }

  get weekDayCounts(): {} {
    return Stats.weekDayCounts(this.filteredEvents);
  }

  get monthsCounts(): {} {
    return Stats.monthsCounts(this.filteredEvents);
  }
}
</script>

<style scoped>
.info {
  margin: 1.4em 0;
}
</style>
