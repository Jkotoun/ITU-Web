
<template>
    <b-container fluid>
        <h2 class="my-4">Let číslo {{event.id}}</h2>
        <b-row class="my-4">
            <b-col>
                <div class="table_container">
                    <b-skeleton-table v-if="loading"></b-skeleton-table>
                    <b-table-lite :items="EventData" class="event-table" thead-class="d-none" v-else></b-table-lite>
                </div>
            </b-col>
        </b-row>
    </b-container>

</template>


<script lang="ts">


import {Component, Vue, Watch} from "vue-property-decorator";
import {Event, GetEvent, GetUsers} from "../modules/ApiModel";

@Component({})
export default class EventDetailsPage extends Vue
{
    event: Event = {} as Event;
    loading = false
   // registeredPilots: User[] = [];
    async created()
    {
        this.LoadData();
    }
    @Watch("$route")
    async LoadData()
    {
        this.loading = true
        const eventId = parseInt(this.$route.params.id);
        this.event = await GetEvent(eventId);
        this.loading = false
    }


    get EventData()
    {
        return[
            {   
                Key: "Čas setkání",
                Value: (new Date(this.event.meetDate)).toLocaleString()
            },
            {
                Key: "Čas letu",
                Value: (new Date(this.event.startDate)).toLocaleString()
            },
            {
                Key: "Stav letu",
                Value: this.event.eventTypeObj?.displayString
            },
            {
                Key: "Místo setkání",
                Value: this.event.meetPoint
            },
            {
                Key: "Místo odletu",
                Value: this.event.startPoint
            },
            {
                Key: "Poznámky k letu",
                Value: this.event.description
            },
            {
                Key: "Pilot",
                Value: this.event.pilotObj?.name == undefined ? "Nepřiřazen" : this.event.pilotObj.name
            },
            {
                Key: "Doprovod",
                Value: this.event.escortObj?.name == undefined ? "Nepřiřazen" : this.event.escortObj.name
            },
            {
                Key: "Počet zákazníků",
                Value: this.event.customerCount
            },
            {
                Key: "Registrovaní jako pilot",
                Value: this.event.registeredPilotObjArr == undefined ? "Žádný uživatel se neregistroval" : this.event.registeredPilotObjArr.map(pilot => pilot.name).join(", ")
            },
            {
                Key: "Registrovaní jako doprovod",
                Value: this.event.registeredEscortsObjArr == undefined? "Žádný uživatel se neregistroval" :this.event.registeredEscortsObjArr.map(esc => esc.name).join(", ")
            },
            {
                Key:"Kontakt na zákazníka",
                Value: this.event.customerPhone
            },
        ];
    }


}
</script>

<style>
    .table_container
    {
        max-width: 750px;
        margin:0 auto;
        text-align:left;
    }
    .event-table
    {
        width:100%;
        border:1px solid #dee2e6 
    }
    td[aria-colindex="1"]
    {
        font-weight: 600;
    }
</style>