<template>  
    <b-container>
        <b-form class="login-form" v-on:submit.prevent="onSubmit">
            <b-form-group label="Přihlašovací jméno" label-for="input-name">
                <b-form-input id="input-name" v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group label="Heslo" label-for="input-pwd">
                <b-form-input id="input-pwd" type="password" v-model="password"></b-form-input>
            </b-form-group>
            <p class="error" v-if="error!=''">{{error}}</p>
            <b-button type="submit" variant="primary">Přihlásit se</b-button>
        </b-form>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch} from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
   
   name = ""
   password = ""
   error = ""
    async created()
    {
        this.LoadData();
       
    }
   @Watch("$route")
   async LoadData()
   {
       if(sessionStorage.getItem("logged_user") != "null")
       {
           const route = this.$router.resolve("/");
           window.location.replace(route.href);
       }
   } 
   onSubmit()
   {
       this.error = ""
       if(this.name!="benes" || this.password != "123")
       {
           this.error = "Nesprávné jméno nebo heslo"
       }
       else
       {
           sessionStorage.setItem("logged_user", "1")
           const route = this.$router.resolve("/");
           window.location.replace(route.href);
       }
   }
  
}
</script>

<style>

.login-form 
{
    max-width:400px;
    margin: 0 auto;
    text-align:left;
    padding:50px 0;
}
.login-form .form-group
{
    padding-top:5px
}
.login-form button
{
    width:100%
}
.login-form .error
{
    color: var(--danger)
}

</style>
