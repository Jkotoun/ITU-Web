<template>
  <b-container fluid>
    <h1 class="my-4">Lety</h1>
    <EventsControl v-model="controlsValue" />

    <Events :events="filteredEventsData"></Events>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetEvents, Event } from "../modules/ApiModel";
import Events from "../components/Events.vue";
import EventsControl from "../components/EventsControl.vue";

@Component({
  components: {
    Events,
    EventsControl,
  },
})
export default class EventsPage extends Vue {
  eventsData: Event[] = [];
  loaded = false;
  controlsValue = {
    entriesDate: "",
    eventTypes: ["1", "2", "3"],
  };

  async created() {
    this.LoadData();
  }

  async LoadData() {
    this.eventsData = await GetEvents();
    this.loaded = true;
  }

  get filteredEventsData(): Event[] {
    return this.eventsData.filter(
      a =>
        a.startDate > this.controlsValue.entriesDate &&
        this.controlsValue.eventTypes.includes(a.eventType.toString()),
    );
  }
}
</script>

