import { RouteRecordRaw } from 'vue-router';

const defaultLayout = () => import('../components/main/content.vue')

let headerRoutes: RouteRecordRaw[] = [

    {
        path: "/",
        component: () => import('../components/main/home.vue'),
        meta:
        {
            layout: defaultLayout,
            title: "Link1"
        }
    },
    {
        path: "/second",
        component: () => import('../components/main/second.vue'),
        meta:
        {
            layout: defaultLayout,
            title: "Link2",
        }
    }
]

let routes: RouteRecordRaw[] = [
    {
        path: "/:catchAll(.*)",
        component: () => import('../components/404.vue'),
        meta:
        {
            layout: defaultLayout,
            title: "404 Error",
        }
    }
]
export { headerRoutes }

export function allRoutes() {
    return routes.concat(headerRoutes)
}