import { createRouter, createMemoryHistory, createWebHistory } from "vue-router";
import { allRoutes } from './routes'

function createBundledRouter() {
  return createRouter({
    history: __IS_SERVER__ ? createMemoryHistory() : createWebHistory(),
    routes: allRoutes()
  });
}
export { createBundledRouter };