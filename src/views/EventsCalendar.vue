<template>
    <b-container fluid>
        <h1 class="calendar-heading">Kalendář letů</h1>
        <b-row>
            <b-col>
                <div class="events-info">
                    <h4>
                        <strong>Lety {{ selectedDate.toLocaleDateString() }}</strong>
                    </h4>
                    <!--<b-skeleton-img v-if="!loaded" aspect="1.2:1"></b-skeleton-img>-->
                    <div class="text-center spinner-container" v-if="!loaded">
                        <b-spinner variant="primary" label="Spinning"></b-spinner>
                    </div>
                    <div class="visible_data" v-else>
                        <div class="event-data" v-if="eventsInDate.length == 0"><p>Žádné lety nejsou pro tento den naplánovány</p></div>
                        <div class="event-data" v-for="item in eventsInDate" :key="item.id">
                            <p><strong>Čas odletu: {{new Date(item.startDate).toLocaleTimeString()}}</strong></p>
                            <p>Místo setkání: {{ item.meetPoint }}</p>
                            <p>Přihlášených pilotů: {{ item.registeredPilotIds.length }}</p><p>Přihlášených doprovodů: {{ item.registeredEscortIds.length }}</p>
                            <p><b-link v-bind:to="`event/${item.id}`">Další informace o letu</b-link></p>
                    
                        
                        <div v-show="loggedUser!='null'">
                                <b-button v-if="!loggedAs(item.registeredPilotIds)" :disabled="loggedAs(item.registeredEscortIds)" variant="primary" @click="regEventAs(item.id, 0)">Přhlásit se jako pilot</b-button>
                                <b-button v-if="loggedAs(item.registeredPilotIds)" variant="danger"  @click="logoutAs(item.id, 0)">Odhlásit z pozice pilot</b-button>
                                <b-button v-if="!loggedAs(item.registeredEscortIds)" :disabled="loggedAs(item.registeredPilotIds)" variant="primary"  @click="regEventAs(item.id, 1)" >Přihlásit se jako doprovod</b-button>
                                <b-button v-if="loggedAs(item.registeredEscortIds)"  variant="danger"  @click="logoutAs(item.id, 1)">Odhlásit se z pozice doprovod</b-button>
                            </div>

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
    role,
    regAsPilotOrEscort,
    logoutAsPilotOrEscort
} from "../modules/ApiModel";

@Component({})
export default class EventsCalendar extends Vue {
    selectedDate = new Date();
    eventsInDate: Event[] = [];
    eventsDates: Date[] = [];
    loggedUser = String(sessionStorage.getItem("logged_user"));
    reload = false
    loaded = false
   async created() {
        this.LoadData();
    }
    @Watch("selectedDate")@Watch("reload")
    async LoadData() {
        this.loaded = false
         Promise.all([getEventsInDate(this.selectedDate), GetEvents()]).then(([dateEvents, events]) => {
            this.eventsInDate = dateEvents;
            this.eventsDates = events.map(event => new Date(event.meetDate));
            this.loggedUser = String(sessionStorage.getItem("logged_user"));
            this.reload = false;
            this.loaded = true        
         });

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
    async regEventAs(eventId: number, role: role)
    {
        await regAsPilotOrEscort(role, eventId,parseInt(this.loggedUser));
        this.reload = true;
    }
    async logoutAs(eventId: number, role: role)
    {
        await logoutAsPilotOrEscort(role, eventId, parseInt(this.loggedUser));
        this.reload = true;
    }
    loggedAs(usrIds: number[]): boolean
    {
        if(this.loggedUser !== "null")
        {
            const usrId: number = parseInt(this.loggedUser); 
           // console.log(parseInt(this.loggedUser));
            for(let i = 0;i<usrIds.length;i++)
            {
                if(usrIds[i] == usrId)
                {
                    return true;
                }
            }
            //return usrIds.includes(parseInt(this.loggedUser));
        }  
        return false
    }
}
</script>
<style>
.spinner-container
{
    padding:100px 0
}
.spinner-border
{
    width:4rem;
    height:4rem;
}

.calendar-heading
{
    padding:40px 0
}
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
