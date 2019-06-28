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
        <div class="panel-heading">Countries</div>
        <div class="panel-body">
          <table class="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Continent</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="countryItem in countriesList" v-bind:key="countryItem.id">
              <td>{{ countryItem.name }}</td>
              <td>{{ countryItem.continent.name }}</td>
              <td><input type="button" value="Edit" class="btn btn-warning" @click="editCountry(countryItem.id)" /></td>
              <td><input type="button" value="Delete" class="btn btn-danger" @click="deleteCountry(countryItem.id)" /></td>
            </tr>              
            </tbody>
          </table>
          <br>
          <router-link to="/addCountry">
            <input type="button" value="Add" class="btn btn-primary" />&nbsp;
          </router-link>
          <router-link to="/continents">
            <input type="button" value="Continents" class="btn btn-primary" />&nbsp;
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
  name: "MainCountries",
  data() {
    return {
      countriesList: [],
      error: "",
      flagError: false
    };
  },
  created() {
    this.loadCountries();
  },
  methods: {
    loadCountries() {
      axios
        .get("http://localhost:5501/countries")
        .then(response => {
          this.countriesList = response.data;
          this.flagError = false;
        })
        .catch(errorGet => {
          this.flagError = true;
          this.error = errorGet.message;
        });
    },
    deleteCountry(countryId) {
      if (confirm("Are you sure you want to delete selected country?")) {
        const apiUrl =
          "http://localhost:5501/countries/" +
          countryId;

        axios
          .delete(apiUrl)
          .then(response => {
            this.flagError = false;
            this.error = "";
            this.loadCountries();
          })
          .catch(errorDelete => {
            this.flagError = true;
            this.error = errorDelete.message;
          });
      }
      return;
    },
    editCountry(countryId) {
      this.$router.push("/editCountry/" + countryId);
    }
  }
};
</script>

