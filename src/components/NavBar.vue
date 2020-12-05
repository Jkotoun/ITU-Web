<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand to="/">Balónovač3000</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Kalendář letů</b-nav-item>
          <b-nav-item to="/Events">Lety</b-nav-item>

          <b-nav-item to="/Users">Uživatelé</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="LoggedUser!==null" v-bind:to="`/user/${LoggedUser}`">Beneš</b-nav-item>
          <b-nav-item v-if="LoggedUser!==null" @click="logout()">Odhlásit se</b-nav-item>
          <b-nav-item v-else to="/login">Přihlásit se</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>



<script lang="ts">
import { Component,  Vue, Watch, Prop } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {

    LoggedUser: string|null = null

    reload = false
    async created()
    {
        this.LoadData();
       
    }
    @Watch("reload")@Watch("$route")
    async LoadData()
    {
      this.LoggedUser = sessionStorage.getItem("logged_user");
      this.reload = false
    }

    logout()
    {
      sessionStorage.removeItem("logged_user");
      this.reload = true
    }
}
</script>
