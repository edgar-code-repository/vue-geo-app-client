<template>
  <div class="container" v-if="isLoading">
    <div class="row">
      <div class="panel panel-danger">
        <div class="panel-heading">Countries</div>
        <div class="panel-body">
          <img src="@/assets/images/loading3.gif" alt="Loading" class="img-loading-size-class center-block" />
          <br><br>
          <router-link to="/">
            <input type="button" value="Main" class="btn btn-primary" />&nbsp;
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="container" v-else>
    <div class="row" v-if="error">
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
    <div class="row" v-else>
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
              <td>{{ countryItem.continentName }}</td>
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
      isLoading: true,
      flagError: false
    };
  },
  created() {    
    this.isLoading = true;
    this.loadCountries();
  },
  /*beforeMounted() {
    console.log("before mounted started...");
    this.loadCountries();
    console.log("... before mounted has ended.");
  },*/
  methods: {
    loadCountries() {
      this.isLoading = true;
      axios
        .get(process.env.VUE_APP_COUNTRIES_API_URL)
        .then(response => {
          this.countriesList = response.data;
          let listLength = this.countriesList.length;
          let counter = 0;

          this.countriesList.forEach((country) => {
            axios
              .get(process.env.VUE_APP_CONTINENTS_API_URL + "/" + country.continent)
              .then(responseContinent => {
                counter++;
                country.continentName = responseContinent.data.name;
                this.flagError = false;
                if (counter == listLength) {
                  this.isLoading = false;
                }
              })
              .catch(errorGetById => {
                this.flagError = true;
                this.isLoading = false;
                this.error = errorGetById.message;
              });
          });
        })
        .catch(errorGet => {
          this.flagError = true;
          this.isLoading = false;
          this.error = errorGet.message;
        });
    },
    deleteCountry(countryId) {
      if (confirm("Are you sure you want to delete selected country?")) {
        const apiUrl = process.env.VUE_APP_COUNTRIES_API_URL + "/" + countryId;

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

<style scoped>

</style>


