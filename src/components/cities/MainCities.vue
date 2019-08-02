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
        <div class="panel-heading">Cities</div>
        <div class="panel-body">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cityItem in citiesList" v-bind:key="cityItem.id">
                <td>{{ cityItem.name }}</td>
                <td>{{ cityItem.countryName }}</td>
                <td><input type="button" value="Edit" class="btn btn-warning" @click="editCity(cityItem.id)" /></td>
                <td><input type="button" value="Delete" class="btn btn-danger" @click="deleteCity(cityItem.id)" /></td>
              </tr>              
            </tbody>
          </table>
          <br />
          <router-link to="/addCity">
            <input type="button" value="Add" class="btn btn-primary" />&nbsp;
          </router-link>
          <router-link to="/continents">
            <input type="button" value="Continents" class="btn btn-primary" />&nbsp;
          </router-link>
          <router-link to="/countries">
            <input type="button" value="Countries" class="btn btn-primary" />&nbsp;
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
  name: "MainCities",
  data() {
    return {
      citiesList: [],
      error: "",
      flagError: false,
      isLoading: true
    };
  },
  created() {
    this.isLoading = true;
    this.loadCities();
  },
  methods: {
    loadCities() {
      this.isLoading = true;
      axios
        .get(process.env.VUE_APP_CITIES_API_URL)
        .then(response => {
          this.citiesList = response.data;
          let listLength = this.citiesList.length;
          let counter = 0;
          
          this.citiesList.forEach((city) => {
            axios
              .get(process.env.VUE_APP_COUNTRIES_API_URL + "/" + city.country)
              .then(responseCountry => {
                counter++;
                city.countryName = responseCountry.data.name;
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
          this.error = errorGet.message;
        });
    },
    deleteCity(cityId) {
      if (confirm("Are you sure you want to delete selected city?")) {
        const apiUrl = process.env.VUE_APP_CITIES_API_URL + "/" + cityId;
        axios
          .delete(apiUrl)
          .then(response => {
            this.flagError = false;
            this.error = "";
            this.loadCities();
          })
          .catch(errorDelete => {
            this.flagError = true;
            this.error = errorDelete.message;
          });
      }
      return;
    },
    editCity(cityId) {
      this.$router.push("/editCity/" + cityId);
    }    
  }
};
</script>
