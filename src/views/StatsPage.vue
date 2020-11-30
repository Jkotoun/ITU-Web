<template>
  <b-container fluid>
    <h1 class="my-4">Statistiky</h1>
    <b-row class="my-5">
      <b-col>
        <div>
          <b-row>
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
            <b-col cols="6">
              <h3>Zákazníci v měsících</h3>
              <BarGraph v-if="loaded" :data="monthCustomers" />
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>Seznam letů</h2>
        <Events class="info" :events="event" />
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
} from "../modules/ApiModel";
import UserInfo from "../components/UserInfo.vue";
import Events from "../components/Events.vue";
import BarGraph from "../components/BarGraph.vue";

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

  events: Event[] = [];
  loaded = false;

  async created() {
    this.LoadData();
  }

  async LoadData() {
    GetEvents().then((events) => {
      this.events = events;
      this.eventCount = this.events.length;
      this.customerCount = this.events
        .map((a) => a.customerCount)
        .reduce((a, b) => a + b);
      this.loaded = true;
    });
  }

  get weekDayCounts(): {} {
    const daysOfWeek = this.events.map((a) => new Date(a.startDate).getDay());

    const daysCount = Array(7).fill(0);
    for (let i = 0; i < daysOfWeek.length; i++) {
      daysCount[daysOfWeek[i]] += 1;
    }
    const days = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
    return {
      labels: days,
      datasets: [
        {
          data: daysCount,
        },
      ],
    };
  }

  get monthsCounts(): {} {
    const months = this.events.map((a) => new Date(a.startDate).getMonth());

    const monthsCounts = Array(12).fill(0);
    for (let i = 0; i < months.length; i++) {
      monthsCounts[months[i]] += 1;
    }
    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          data: monthsCounts,
        },
      ],
    };
  }

  get monthCustomers(): {} {
    const monthsCounts = Array(12).fill(0);
    this.events.forEach((event) => {
      monthsCounts[new Date(event.startDate).getMonth()] += event.customerCount;
    });

    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          data: monthsCounts,
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
