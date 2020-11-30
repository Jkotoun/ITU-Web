<template>
  <b-container fluid>
    <h1 class="my-4">Lety</h1>

    <Events :events="eventsData"></Events>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetEvents, Event } from "../modules/ApiModel";
import Events from "../components/Events.vue";

@Component({
  components: {
    Events,
  },
})
export default class EventsPage extends Vue {
  eventsData: Event[] = [];
  loaded = false;

  async created() {
    this.LoadData();
  }

  async LoadData() {
    this.eventsData = await GetEvents();
    this.loaded = true;
  }
}
</script>

