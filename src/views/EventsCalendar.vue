<template>
    <b-container fluid>
        <h2>Kalendář letů</h2>
        <!-- <b-calendar locale="cs" selected-variant="primary" :date-info-fn="getEventsDates" no-highlight-today  hide-header no-key-nav ></b-calendar>-->

        <b-row>
            <b-col>
                <div class="events-info">
                    <h4>
                        <strong>Lety {{ selectedDate.toLocaleDateString() }}</strong>
                    </h4>
                    <div class="event-data" v-for="item in eventsInDate" :key="item.id">
                        <p><strong>Čas odletu: {{new Date(item.startDate,).toLocaleTimeString()}}</strong></p>
                        <p>Místo setkání: {{ item.meetPoint }}</p>
                        <p>Přihlášených pilotů: {{ item.registeredPilotIds.length }}</p><p>Přihlášených doprovodů: {{ item.registeredEscortIds.length }}</p>
                        <p><b-link v-bind:to="`event/${item.id}`">Další informace o letu</b-link></p>
                        <div>
                            <b-button variant="primary">Přhlásit se jako pilot</b-button>
                            <b-button variant="secondary">Přihlásit se jako doprovod</b-button>
                        </div>
                    </div>
                </div>
            </b-col>
            <b-col>
                <v-date-picker
                    v-model="selectedDate"
                    :attributes="attrs"
                ></v-date-picker>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
    GetEvents,
    getEventsInDate,
    Event,
    GetEvent,
} from "../modules/ApiModel";

@Component({})
export default class EventsCalendar extends Vue {
    selectedDate = new Date();
    eventsInDate: Event[] = [];
    eventsDates: Date[] = [];
    async created() {
        this.LoadData();
    }
    @Watch("selectedDate")
    async LoadData() {
        this.eventsInDate = await getEventsInDate(this.selectedDate);
        this.eventsDates = await GetEvents().then(events =>
            events.map(event => new Date(event.startDate)),
        );   
    }
    get attrs() {
        return [
            {
                highlight: {
                    color: "blue",
                    fillMode: "outline",
                },
                dates: this.eventsDates,
            },
        ];
    }
}
</script>
<style>
button {
    margin-right: 10px;
}
.events-info {
    border: 1px solid #cbd5e0;
    max-width: 70%;
    margin-left: 30%;
    min-height: 600px;
    border-radius: 10px;
    text-align: left;
}
.event-data {
    padding: 25px;
}
h2 {
    text-align: left;
    margin: 50px 125px;
}
a:hover {
    text-decoration: none;
}
h4 {
    margin: 30px 0 0 25px;
}

.vc-day-content {
    width: 80px !important;
    height: 80px !important;
}
/*.vc-weekday,
.vc-day {
    padding: 10px;
}*/
.vc-header,
.vc-arrows-container {
    padding: 20px 5px !important;
}
</style>
