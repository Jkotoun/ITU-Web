<template>
  <b-container fluid>
    <h1 class="my-4">Lety</h1>
    <b-row>
      <b-col lg="6" offset-lg="3">
        <EventsControl v-model="controlsValue" />
      </b-col>
    </b-row>

    <b-tabs>
      <b-tab title="Statistiky">
        <b-row class="my-5">
          <b-col>
            <div>
              <b-row>
                <b-col lg="4">
                  <h3>Lety ve dnech</h3>
                  <BarGraph v-if="loaded" :data="weekDayCounts" />
                </b-col>
                <b-col lg="4">
                  <h3>Lety na zaměstnance</h3>
                  <BarGraph v-if="loaded" :data="userEvents" />
                </b-col>
                <b-col lg="4">
                  <h3>Lety v měsících</h3>
                  <BarGraph v-if="loaded" :data="monthsCounts" />
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Seznam letů">
        <b-col>
          <Events v-if="loaded" class="info" :events="filteredEvents" />
        </b-col>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User, Event, GetEvents, GetUsers } from "../modules/ApiModel";
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
export default class StatsPage extends Vue {
  eventCount = 0;
  customerCount = 0;

  users: User[] = [];
  events: Event[] = [];
  loaded = false;
  controlsValue = {
    entriesDate: "",
    eventTypes: ["1", "2", "3"],
  };

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
        a.startDate > this.controlsValue.entriesDate &&
        this.controlsValue.eventTypes.includes(a.eventType.toString()),
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
