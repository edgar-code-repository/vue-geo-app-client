<template>
  <div class="container">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">Edit Continent</div>
        <div class="panel-body">
          <form name="continent-form" id="continent-form" v-on:submit.prevent="saveContinent" >
            <div class="alert alert-danger" v-if="flagError">
              {{ error }}
            </div>
            <div class="form-group">
              <label htmlFor="name">Name:</label>
              <input  type="text" 
                      class="form-control" 
                      name="name" 
                      id="name" 
                      v-model.trim="continent_name" />
            </div>
            <br/>
            <input type="submit" value="Save" class="btn btn-primary" />&nbsp;
            <router-link to="/">
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
  name: "EditContinent",
  data() {
    return {
      continentId: this.$route.params.continentId,
      continent_name: '',
      error: "",
      flagError: false
    };
  },
  created() {
    axios
      .get("http://localhost:5501/continents/" + this.continentId)
      .then(response => {
        this.continent_name = response.data.name;
        this.flagError = false;
        this.error = "";
      })
      .catch(errorPost => {
        this.flagError = true;
        this.error = errorPost.message;
      });
  },
  methods: {
    saveContinent() {
      if (this.continent_name.length == 0) {
        this.flagError = true;
        this.error = "Must enter name";
        return;
      }
      else {
        const selectedContinent = {
          id: this.continentId,
          name: this.continent_name
        }

        axios
          .put("http://localhost:5501/continents/" + this.continentId, selectedContinent)
          .then(response => {
            this.flagError = false;
            this.error = "";
            this.$router.push("/continents");
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
