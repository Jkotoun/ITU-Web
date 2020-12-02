
<template>
    <b-container fluid>
        <h2 class="my-4">Let číslo {{event.id}}</h2>
        <b-row class="my-4">
            <b-col>
                <b-table-lite :items="EventData" thead-class="d-none"></b-table-lite>
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
   // registeredPilots: User[] = [];
    async created()
    {
        this.LoadData();
    }
    @Watch("$route")
    async LoadData()
    {
        const eventId = parseInt(this.$route.params.id);
        this.event = await GetEvent(eventId);
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