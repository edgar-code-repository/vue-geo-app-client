<template>
  <div class="container">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">Add Country</div>
        <div class="panel-body">
          <form
            name="country-form"
            id="country-form"
            v-on:submit.prevent="addCountry"
          >
            <div class="alert alert-danger" v-if="flagError">
              {{ error }}
            </div>
            <div class="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="name"
                v-model.trim="country_name"
              />
            </div>
            <div class="form-group">
              <label htmlFor="name">Continent:</label>
              <select
                class="form-control"
                name="continent"
                id="continent"
                v-model="continent_selected"
              >
                <option value="-1">Select Continent</option>
                <option
                  v-bind:key="continent.id"
                  v-for="continent in continentsList"
                  v-bind:value="continent.id"
                >
                  {{ continent.name }}
                </option>
              </select>
            </div>
            <br />
            <input type="submit" value="Save" class="btn btn-primary" />&nbsp;

            <router-link to="/countries">
              <input type="button" value="Cancel" class="btn btn-success" />
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
  name: "AddCountry",
  data() {
    return {
      flagError: false,
      error: "",
      continentsList: [],
      country_name: "",
      continent_selected: "-1"
    };
  },
  created() {
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
  methods: {
    addCountry() {
      if (this.country_name.length == 0) {
        this.flagError = true;
        this.error = "Must enter name";
        return;
      }
      if (this.continent_selected == -1) {
        this.flagError = true;
        this.error = "Must indicate continent";
        return;
      } else {
        const newCountry = {
          name: this.country_name,
          continent: this.continent_selected
        };

        const apiUrl = process.env.VUE_APP_COUNTRIES_API_URL + "/";
        axios
          .post(apiUrl, newCountry)
          .then(response => {
            this.flagError = false;
            this.error = "";
            this.$router.push("/countries");
          })
          .catch(errorPost => {
            this.flagError = true;
            this.error = errorPost.message;
          });
      }
    }
  }
};
</script>
