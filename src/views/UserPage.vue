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
    const escortCount = this.pastEvents.filter(
      (a) => a.escortId == this.user.id,
    ).length;
    const pilotCount = this.pastEvents.filter((a) => a.pilotId == this.user.id)
      .length;
    return {
      labels: ["Jako doprovod", "Jako pilot"],
      datasets: [
        {
          data: [escortCount, pilotCount],
        },
      ],
    };
  }

  get weekDayCounts(): {} {
    const daysOfWeek = this.pastEvents.map((a) =>
      new Date(a.startDate).getDay(),
    );

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
    const months = this.pastEvents.map((a) => new Date(a.startDate).getMonth());

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
    this.pastEvents.forEach((event) => {
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
