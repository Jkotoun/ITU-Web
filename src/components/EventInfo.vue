<template>
  <b-table-lite :items="eventData" :fields="fields"> </b-table-lite>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Event } from "../modules/ApiModel";

@Component({})
export default class EventInfo extends Vue {
  @Prop({ required: true }) events: Event[];
  fields = [
    {
      key: "eventType",
      label: "Stav",
    },
    {
      key: "meetDate",
      label: "Čas setkání",
    },
    {
      key: "startDate",
      label: "Čas odletu",
    },
    {
      key: "meetPoint",
      label: "Místo setkání",
    },
    {
      key: "startPoint",
      label: "Místo Odletu",
    },

    {
      key: "pilot",
      label: "Pilot",
    },
    {
      key: "escort",
      label: "Doprovod",
    },
    {
      key: "customerCount",
      label: "Počet zákazníků",
    },
  ];
  get eventData() {
    return this.events.map((event) => {
      return {
        startPoint: event.startPoint,
        meetPoint: event.meetPoint,
        meetDate: event.meetDate,
        startDate: event.startDate,
        pilot: event.pilotObj?.name,
        escort: event.escortObj?.name,
        eventType: event.eventTypeObj?.displayString,
        customerCount: event.customerCount,
      };
    });
  }
}
</script>
