import Vue from "vue";
import Router from "vue-router";

import Home from "./components/Home.vue";

import MainContinents from "./components/continents/MainContinents.vue";
import AddContinent from "./components/continents/AddContinent";
import EditContinent from "./components/continents/EditContinent";

import MainCountries from "./components/countries/MainCountries.vue";
import AddCountry from "./components/countries/AddCountry";
import EditCountry from "./components/countries/EditCountry";

import MainCities from "./components/cities/MainCities.vue";
import AddCity from "./components/cities/AddCity";
import EditCity from "./components/cities/EditCity";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/continents", name: "continents", component: MainContinents },
    { path: "/addContinent", name: "addContinent", component: AddContinent },
    { path: "/editContinent/:continentId", name: "editContinent", component: EditContinent },
    { path: "/countries", name: "countries", component: MainCountries },
    { path: "/addCountry", name: "addCountry", component: AddCountry },
    { path: "/editCountry/:countryId", name: "editCountry", component: EditCountry },
    { path: "/cities", name: "cities", component: MainCities },
    { path: "/addCity", name: "addCity", component: AddCity },
    { path: "/editCity/:cityId", name: "editCity", component: EditCity }
  ]
});
