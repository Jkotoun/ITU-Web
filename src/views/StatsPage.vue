<template>
  <b-container fluid>
    <h1 class="my-4">Statistiky</h1>
    <b-row class="my-5">
      <b-col col offset="4" cols="2">
        <label for="example-datepicker">Lety novější než:</label>
        <b-form-datepicker
          id="example-datepicker"
          v-model="value"
          locale="cs"
          reset-button
        ></b-form-datepicker>
      </b-col>
      <b-col cols="2">
        <b-form-group label="Stav letů:">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="eventTypes"
            :options="eventTypeOptions"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col>
        <div>
          <b-row>
            <b-col>
              <h3>Lety ve dnech</h3>
              <BarGraph v-if="loaded" :data="weekDayCounts" />
            </b-col>
            <b-col>
              <h3>Lety na zaměstnance</h3>
              <BarGraph v-if="loaded" :data="userEvents" />
            </b-col>
            <b-col>
              <h3>Lety v měsících</h3>
              <BarGraph v-if="loaded" :data="monthsCounts" />
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="loaded">
      <b-col>
        <h2>Seznam letů</h2>
        <Events class="info" :events="filteredEvents" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  GetUser,
  User,
  Event,
  GetUserEvents,
  GetEvents,
  GetUsers,
} from "../modules/ApiModel";
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
export default class StatsPage extends Vue {
  eventCount = 0;
  customerCount = 0;

  users: User[] = [];
  events: Event[] = [];
  loaded = false;
  value = "";
  eventTypes = ["1", "2", "3", "4"];
  eventTypeOptions = [
    { text: "Naplánované", value: "1" },
    { text: "Potvrzené", value: "2" },
    { text: "Uskutečněné", value: "3" },
    { text: "Zrušené", value: "4" },
  ];

  async created() {
    this.LoadData();
  }

  async LoadData() {
    Promise.all([GetUsers(), GetEvents()]).then(([users, events]) => {
      this.events = events;
      this.eventCount = this.events.length;
      this.customerCount = this.events
        .map((a) => a.customerCount)
        .reduce((a, b) => a + b);
      this.users = users;
      this.loaded = true;
    });
  }

  get filteredEvents(): Event[] {
    return this.events.filter(
      (a) =>
        a.startDate > this.value &&
        this.eventTypes.includes(a.eventType.toString()),
    );
  }

  get weekDayCounts(): {} {
    return Stats.weekDayCounts(this.filteredEvents);
  }

  get monthsCounts(): {} {
    return Stats.monthsCounts(this.filteredEvents);
  }

  get userEvents(): {} {
    return Stats.userEvents(this.filteredEvents, this.users);
  }
}
</script>

<style scoped>
.info {
  margin: 1.4em 0;
}
</style>
