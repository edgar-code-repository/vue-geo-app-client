<template>
  <div class="container">
    <div class="row">
        <div class="panel panel-default" >
          <div class="panel-heading">Edit City</div>
          <div class="panel-body">
            <form name="city-form" id="city-form" v-on:submit.prevent="saveCity" >
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
  name: "EditCity",
  data() {
    return {
      flagError: false,
      error: "",
      city_id: this.$route.params.cityId,
      city_name: "",
      country_selected: "-1",
      countriesList: []
    }
  },
  created() {
    axios.get("http://localhost:5501/countries")
      .then(response => {
        this.countriesList = response.data;
        this.flagError = false;
        this.error = "";
      })
      .catch(errorGet => {
        this.flagError = true;
        this.error = errorGet.message;
      });

    axios.get("http://localhost:5501/cities/" + this.city_id)
      .then(response => {
        this.city_name = response.data.name;
        this.country_selected = response.data.country.id;
        this.flagError = false;
        this.error = "";
      })
      .catch(errorGet => {
        this.flagError = true;
        this.error = errorGet.message;
      });
  },
  methods: {
    saveCity() {
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
        const selectedCity = {
          name: this.city_name
        }

        const apiUrl = "http://localhost:5501/countries/" + this.country_selected + "/cities/" + this.city_id;
        
        axios.put(apiUrl, selectedCity)
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
