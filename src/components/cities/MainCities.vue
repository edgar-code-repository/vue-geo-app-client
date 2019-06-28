<template>
  <div class="container" v-if="flagError">
    <div class="row">
      <div class="panel panel-danger">
        <div class="panel-heading">Error</div>
        <div class="panel-body">
          {{ error }}            
          <br /><br />
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
                <td>{{ cityItem.country.name }}</td>
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
      flagError: false
    };
  },
  created() {
    this.loadCities();
  },
  methods: {
    loadCities() {
      axios
        .get("http://localhost:5501/cities")
        .then(response => {
          this.citiesList = response.data;
          this.flagError = false;
        })
        .catch(errorGet => {
          this.flagError = true;
          this.error = errorGet.message;
        });
    },
    deleteCity(cityId) {
      if (confirm("Are you sure you want to delete selected city?")) {
        const apiUrl =
          "http://localhost:5501/cities/" +
          cityId;

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
