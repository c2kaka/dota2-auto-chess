import Vue from "vue";
import Router from "vue-router";
import ListContainer from "./views/ListContainer";
import CategoryEdit from "./views/CategoryEdit";
import CategoryList from "./views/CategoryList";
import ItemEdit from "./views/ItemEdit";
import ItemList from "./views/ItemList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: ListContainer,
      children: [
        { path: "/categories/create", component: CategoryEdit },
        { path: "/categories/list", component: CategoryList },
        { path: "/categories/edit/:id", component: CategoryEdit, props: true },
        { path: "/items/create", component: ItemEdit },
        { path: "/items/list", component: ItemList },
        { path: "/items/edit/:id", component: ItemEdit, props: true }
      ]
    }
  ]
});
