<template>
  <div class="container">
    <div class="row">
        <div class="panel panel-default" >
          <div class="panel-heading">Add City</div>
          <div class="panel-body">
            <form name="city-form" id="city-form" v-on:submit.prevent="addCity" >
              <div class="alert alert-danger" v-if="flagError">
                {{ error }}
              </div>

              <div class="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" class="form-control" name="name" id="name" v-model.trim="city_name" />
              </div>
              <div class="form-group">
                <label htmlFor="name">Country:</label>
                <select class="form-control" name="country" id="country" v-model="country_selected" >
                  <option value="-1" >Select Country</option>
                    <option v-bind:key="country.id" v-for="country in countriesList" v-bind:value="country.id">
                      {{ country.name }}
                    </option>
                </select>
              </div>
              <br/>
              <input type="submit" value="Save" class="btn btn-primary"  />&nbsp;
              <router-link to="/cities">
                <input type="button" value="Cancel" class="btn btn-success"  />                        
              </router-link>
            </form>
          </div>
        </div>
    </div>
  </div>    
</template>

<script>
import axios from "axios";

export default {
  name: "AddCity",
  data() {
      return {
        flagError: false,
        error: "",
        city_name: "",
        country_selected: "-1",
        countriesList: []
      }
  },
  created() {
    axios.get(process.env.VUE_APP_COUNTRIES_API_URL)
      .then(response => {
        this.countriesList = response.data;
        this.flagError = false;
      })
      .catch(errorGet => {
        this.flagError = true;
        this.error = errorGet.message;
      });
  },
  methods: {
    addCity() {
      if (this.city_name.length == 0) {
        this.flagError = true;
        this.error = "Must enter name";
        return;
      }
      
      if (this.country_selected == -1) {
        this.flagError = true;
        this.error = "Must indicate country";
        return;
      }
      else {
        const newCity = {
          name: this.city_name,
          country: this.country_selected
        }

        const apiUrl = process.env.VUE_APP_CITIES_API_URL + "/";
        axios.post(apiUrl, newCity)
          .then(response => {
            this.flagError = false;
            this.error = "";
            this.$router.push("/cities");
          })
          .catch(errorPost => {
            this.flagError = true;
            this.error = errorPost.message;
          });
      }
    }
  }
}
</script>

