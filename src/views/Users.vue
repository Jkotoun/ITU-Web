<template>
  <b-container fluid>
    <h1 class="my-4">Uživatelé</h1>
    <b-table
      :items="users"
      hover
      @row-clicked="RowClicked"
      tbody-tr-class="row-clickable"
    >
    </b-table>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetUsers, User } from "../modules/ApiModel";

@Component
export default class Users extends Vue {
  public users: User[] = [];

  async created() {
    this.LoadData();
  }

  async LoadData() {
    this.users = await GetUsers();
  }

  RowClicked(record: User, index: number) {
    const route = this.$router.resolve(`user/${record.id}`);
    window.open(route.href, "_blank");
  }
}
</script>

<style>
.row-clickable {
  cursor: pointer;
}
</style>
