<template>
  <div class="container">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">Add Continent</div>
        <div class="panel-body">
          <form name="continent-form" id="continent-form" v-on:submit.prevent="addContinent" >
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
  name:'AddContinent',
  data() {
    return {
      continent_name: '',
      error: "",
      flagError: false
    };
  },
  methods: {
    addContinent() {
      if (this.continent_name.length == 0) {
        this.flagError = true;
        this.error = "Must enter name";
        return;
      }
      else {
        const newContinent = {
          name: this.continent_name
        }

        axios
          .post(process.env.VUE_APP_CONTINENTS_API_URL + "/", newContinent)
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



