import { RouteRecordRaw } from 'vue-router';

let headerRoutes: RouteRecordRaw[] = [

    {
        path: "/",
        component: () => import('../components/main/home.vue'),
        meta:
        {
            title: "Link1"
        }
    },
    {
        path: "/second",
        component: () => import('../components/main/second.vue'),
        meta:
        {
            title: "Link2",
        }
    }
]

let miscRoutes: RouteRecordRaw[] = [
    {
        path: "/:catchAll(.*)",
        component: () => import('../components/404.vue'),
        meta:
        {
            title: "404 Error",
        }
    }
]
export { headerRoutes }

export function allRoutes() {
    return miscRoutes.concat(headerRoutes)
}