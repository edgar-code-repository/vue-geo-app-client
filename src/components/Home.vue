<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="thumbnail">
        <router-link to="continents">
          <img src="@/assets/images/continents.jpg" alt="Continents" class="img-size-class" />
          <div class="caption"><p>Continents</p></div>
        </router-link>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="thumbnail">
          <router-link to="countries">
            <img src="@/assets/images/countries.jpg" alt="Countries" class="img-size-class" />
            <div class="caption"><p>Countries</p></div>
          </router-link>
        </div>
      </div>
      <div class="col-md-4">
        <div class="thumbnail">
          <router-link to="cities">
            <img src="@/assets/images/cities.jpg" alt="Cities" class="img-size-class" />
            <div class="caption"><p>Cities</p></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>