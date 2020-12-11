<!--Autor: Jiří Vlasák -->
<template>
  <b-container fluid>
    <b-skeleton class="my-4" v-if="!loaded" width="15em" style="display:inline-block;" type="input"></b-skeleton>
    <h1 class="my-4">{{ user.name }}</h1>
    <b-row>
      <b-col lg="6" offset-lg="3">
        <EventsControl v-model="controlsValue" />
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col lg="4">
        <b-skeleton-table v-if="!loaded" :rows="7" :columns="2" :table-props="{ striped: false }"></b-skeleton-table>
        <UserInfo v-if="loaded" :user="userVM" />
      </b-col>
      <b-col lg="2">
        <div class="chart-container">
          <h3>Lety na pozici</h3>
          <b-skeleton-img v-if="!loaded" aspect="2:3"></b-skeleton-img>
          <DonutGraph v-if="loaded" :data="escortEventsCountData" />
        </div>
      </b-col>
      <b-col lg="3">
        <div class="chart-container">
          <h3>Lety v měsících</h3>
          <b-skeleton-img v-if="!loaded" aspect="1:1"></b-skeleton-img>

          <BarGraph v-if="loaded" :data="monthsCounts" />
        </div>
      </b-col>
      <b-col lg="3">
        <div class="chart-container">
          <h3>Lety ve dnech</h3>
          <b-skeleton-img v-if="!loaded" aspect="1:1"></b-skeleton-img>

          <BarGraph v-if="loaded" :data="weekDayCounts" />
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
import DonutGraph from "../components/DonutGraph.vue";

import EventsControl from "../components/EventsControl.vue";
import * as Stats from "../modules/Stats";

@Component({
  components: {
    UserInfo,
    Events,
    BarGraph,
    DonutGraph,
    EventsControl,
  },
})
export default class UserPage extends Vue {
  user: User = {} as User;
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

        this.loaded = true;
      },
    );
  }
  get userVM(): {} {
    const userVM = this.user as any;

    userVM.eventCount = this.events.length;
    if (userVM.eventCount) {
      userVM.customerCount = this.events
        .map(a => a.customerCount)
        .reduce((a, b) => a + b);
      const sortedEvents = this.events.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
      userVM.firstEventDate = new Date(
        sortedEvents[0].startDate,
      ).toLocaleDateString();
      userVM.lastEventDate = new Date(
        sortedEvents[sortedEvents.length - 1].startDate,
      ).toLocaleDateString();
    } else {
      userVM.customerCount = 0;
      userVM.eventCount = 0;
      userVM.firstEventDate = "Žádný let";
      userVM.lastEventDate = "Žádný let";
    }

    return userVM;
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

.chart-container {
  flex-grow: 1;
  min-height: 0;
  /* height: 200px; */
}
.chart-container div {
  position: relative;
  height: 100%;
}
</style>
