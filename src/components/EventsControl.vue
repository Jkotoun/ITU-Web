<!--Autor: Jiří Vlasák -->
<template>
  <b-row>
    <b-col>
      <label
        style="font-size: 1.25rem; line-height: 1.5"
        for="example-datepicker"
        >Lety novější než:</label
      >
      <b-form-datepicker
        id="example-datepicker"
        v-model="value.entriesDate"
        locale="cs"
        reset-button
      ></b-form-datepicker>
    </b-col>
    <b-col>
      <b-form-group label-size="lg" label="Stav letů:">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="value.eventTypes"
          :options="eventTypeOptions"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class EventsControl extends Vue {
  @Prop({ required: true }) value: {};

  eventTypeOptions = [
    { text: "Naplánované", value: "1" },
    { text: "Potvrzené", value: "2" },
    { text: "Uskutečněné", value: "3" },
    { text: "Zrušené", value: "4" },
  ];
}
</script>