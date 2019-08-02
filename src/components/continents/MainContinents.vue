<template>
  <div class="container" v-if="flagError">
    <div class="row">
      <div class="panel panel-danger">
        <div class="panel-heading">Error</div>
        <div class="panel-body">
          {{ error }}            
          <br><br>
          <router-link to="/">
            <input type="button" value="Main" class="btn btn-primary" />&nbsp;
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <div class="row">
      <div class="panel panel-success">
        <div class="panel-heading">Continents</div>
        <div class="panel-body">
          <table class="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="continentItem in continentsList" v-bind:key="continentItem.id">
              <td>{{ continentItem.name }}</td>
              <td><input type="button" value="Edit" class="btn btn-warning" @click="editContinent(continentItem.id)" /></td>
              <td><input type="button" value="Delete" class="btn btn-danger" @click="deleteContinent(continentItem.id)" /></td>
            </tr>              
            </tbody>
          </table>
          <br>
          <router-link to="/addContinent">
            <input type="button" value="Add" class="btn btn-primary" />&nbsp;
          </router-link>
          <router-link to="/countries">
            <input type="button" value="Countries" class="btn btn-primary" />&nbsp;
          </router-link>
          <router-link to="/cities">
            <input type="button" value="Cities" class="btn btn-primary" />&nbsp;
          </router-link>
          <router-link to="/">
            <input type="button" value="Main" class="btn btn-primary" />&nbsp;
          </router-link>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainContinents",
  data() {
    return {
      continentsList: [],
      error: "",
      flagError: false
    };
  },
  created() {
    this.loadContinents();
  },
  methods: {
    loadContinents() {
      axios
        .get(process.env.VUE_APP_CONTINENTS_API_URL)
        .then(response => {
          this.continentsList = response.data;
          this.flagError = false;
        })
        .catch(errorGet => {
          this.flagError = true;
          this.error = errorGet.message;
        });
    },
    deleteContinent(continentId) {
      if (confirm("Are you sure you want to delete selected continent?")) {
        const apiUrl = process.env.VUE_APP_CONTINENTS_API_URL + "/" + continentId;
        axios
          .delete(apiUrl)
          .then(response => {
            this.flagError = false;
            this.error = "";
            this.loadContinents();
          })
          .catch(errorDelete => {
            this.flagError = true;
            this.error = errorDelete.message;
          });
      }
      return;
    },
    editContinent(continentId) {
      this.$router.push("/editContinent/" + continentId);
    }
  }
};

</script>
