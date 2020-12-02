<template>
  <b-table
    :items="eventData"
    :fields="fields"
    hover
    @row-clicked="RowClicked"
    tbody-tr-class="row-clickable"
    :sort-by="'meetDate'"
    sort-desc
  >
  </b-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Event } from "../modules/ApiModel";

@Component({})
export default class Events extends Vue {
  @Prop({ required: true }) events: Event[];
  fields = [
    {
      key: "eventType",
      label: "Stav",
      sortable: true,
    },
    {
      key: "meetDate",
      label: "Čas setkání",
      sortable: true,
    },
    {
      key: "startDate",
      label: "Čas odletu",
      sortable: true,
    },
    {
      key: "meetPoint",
      label: "Místo setkání",
      sortable: true,
    },
    {
      key: "startPoint",
      label: "Místo Odletu",
      sortable: true,
    },

    {
      key: "pilot",
      label: "Pilot",
      sortable: true,
    },
    {
      key: "escort",
      label: "Doprovod",
      sortable: true,
    },
    {
      key: "customerCount",
      label: "Počet zákazníků",
      sortable: true,
    },
    {
      key: "pilotCount",
      label: "Registrovaných pilotů",
      sortable: true,
    },
    {
      key: "escortCount",
      label: "Registrovaných doprovodů",
      sortable: true,
    },
  ];
  get eventData() {
    return this.events.map((event) => {
      return {
        id:event.id,
        startPoint: event.startPoint,
        meetPoint: event.meetPoint,
        meetDate: event.meetDate,
        startDate: event.startDate,
        pilot: event.pilotObj?.name,
        escort: event.escortObj?.name,
        eventType: event.eventTypeObj?.displayString,
        customerCount: event.customerCount,
        pilotCount: event.registeredPilotIds.length,
        escortCount: event.registeredEscortIds.length,
      };
    });
  }
  RowClicked(record: Event) {
    const route = this.$router.resolve(`event/${record.id}`);
    window.open(route.href, "_blank");
  }
}
</script>
