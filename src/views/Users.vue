<template>
  <b-container fluid>
    <h1 class="my-4">Uživatelé</h1>
    <b-table
      :items="users"
      :fields="fields"
      hover
      @row-clicked="RowClicked"
      tbody-tr-class="row-clickable"
      :sort-by="'id'"
      sort-desc
    >
    </b-table>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetUsers, User } from "../modules/ApiModel";

@Component
export default class Users extends Vue {
  users: User[] = [];
  fields = [
    {
      key: "id",
      label: "Id",
      sortable: true,
    },
    {
      key: "name",
      label: "Jméno",
      sortable: true,
    },
    {
      key: "phone",
      label: "Telefon",
      sortable: true,
    },
    {
      key: "email",
      label: "E-mail",
      sortable: true,
    },
  ];

  async created() {
    this.users = await GetUsers();
  }

  RowClicked(record: User) {
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
