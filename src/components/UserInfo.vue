<template>
  <b-table-lite :items="userData" thead-class="d-none"> </b-table-lite>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { User } from "../modules/ApiModel";

@Component({})
export default class UserInfo extends Vue {
  @Prop({ required: true }) user: any;
  get userData() {
    return [
      {
        Key: "Jméno",
        Value: this.user.name,
      },
      {
        Key: "Telefon",
        Value: this.user.phone,
      },
      {
        Key: "E-mail",
        Value: this.user.email,
      },
      {
        Key: "Pozice",
        Value: this.user.typeObj?.displayString,
      },
      {
        Key: "Celkem letů",
        Value: this.user.eventCount,
      },
      {
        Key: "Celkem zákazníků",
        Value: this.user.customerCount,
      },
      {
        Key: "První let",
        Value: this.user.firstEventDate,
      },
      {
        Key: "Poslední let",
        Value: this.user.lastEventDate,
      },
    ];
  }
}
</script>
