<template>
  <b-container fluid>
    <h1 class="my-4">Lety</h1>
    <b-table
      :items="events"
      hover
      @row-clicked="RowClicked"
      tbody-tr-class="row-clickable"
    >
    </b-table>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetEvents, Event } from "../modules/ApiModel";

@Component
export default class Events extends Vue {
  public events: Event[] = [];

  async created() {
    this.LoadData();
  }

  async LoadData() {
    this.events = await GetEvents();
  }

  RowClicked(record: Event) {
    const route = this.$router.resolve(`event/${record.id}`);
    window.open(route.href, "_blank");
  }
}
</script>

