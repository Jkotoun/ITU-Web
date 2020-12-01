<template>
  <b-container fluid>
    <h1 class="my-4">Statistiky</h1>
    <b-row class="my-5">
      <b-col>
        <div>
          <label for="example-datepicker">Choose a date</label>
          <b-form-datepicker
            id="example-datepicker"
            v-model="value"
          ></b-form-datepicker>
          <p>Value: '{{ value }}'</p>
        </div>
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
        <Events class="info" :events="events" />
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

  get weekDayCounts(): {} {
    return Stats.weekDayCounts(this.events);
  }

  get monthsCounts(): {} {
    return Stats.monthsCounts(this.events);
  }

  get userEvents(): {} {
    return Stats.userEvents(this.events, this.users);
  }
}
</script>

<style scoped>
.info {
  margin: 1.4em 0;
}
</style>
