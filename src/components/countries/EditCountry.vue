<template>
  <div class="container">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">Edit Country</div>
        <div class="panel-body">
          <form
            name="country-form"
            id="country-form"
            v-on:submit.prevent="saveCountry"
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
  name: "EditCountry",
  data() {
    return {
      flagError: false,
      error: "",
      continentsList: [],
      country_id: this.$route.params.countryId,
      country_name: "",
      continent_selected: "-1"
    };
  },
  created() {
    axios
      .get("http://localhost:5501/continents")
      .then(response => {
        this.continentsList = response.data;
        this.flagError = false;
      })
      .catch(errorGet => {
        this.flagError = true;
        this.error = errorGet.message;
      });

    axios
      .get("http://localhost:5501/countries/" + this.country_id)
      .then(response => {
        this.country_name = response.data.name;
        this.continent_selected = response.data.continent.id;
        this.flagError = false;
        this.error = "";
      })
      .catch(errorPost => {
        this.flagError = true;
        this.error = errorPost.message;
      });
  },
  methods: {
    saveCountry() {
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
        const selectedCountry = {
          id: this.country_id,
          name: this.country_name
        };

        const apiUrl =
          "http://localhost:5501/continents/" +
          this.continent_selected +
          "/countries/" +
          this.country_id;

        axios
          .put(apiUrl, selectedCountry)
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
}
</script>
