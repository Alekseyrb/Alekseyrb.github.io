import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Favorite from "@/views/Favorite.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'main',
        }
    },
    {
        path: '/favorite',
        name: 'Favorite',
        component: Favorite,
        meta: {
            layout: 'favorite',
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active',
});

export default router;