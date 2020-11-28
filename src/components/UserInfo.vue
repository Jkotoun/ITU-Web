<template>
  <b-table-lite :items="userData" thead-class="d-none"> </b-table-lite>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { User } from "../modules/ApiModel";

@Component({})
export default class UserInfo extends Vue {
  @Prop({ required: true }) user: User;
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
    ];
  }
}
</script>
