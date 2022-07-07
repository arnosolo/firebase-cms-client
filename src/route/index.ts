import { createRouter, createWebHashHistory } from "vue-router"

import HomePage from '../views/HomePage.vue'
import SettingPage from '../views/SettingPage.vue'
import NotFound from '../views/NotFound.vue';
import ArticlePage from '../views/ArticlePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/setting', component: SettingPage },
  { path: '/article/:id', component: ArticlePage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }