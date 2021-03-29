import { createSSRApp, Component, createApp } from 'vue'
import { createBundledRouter } from './router'
import { App } from '@vue/runtime-core'
import { Router } from 'vue-router'
import app from '../components/App.vue'

function createBundledApp(root: Component) {
    const app = __IS_SSR__ ? createSSRApp(root) : createApp(root);
    const router = createBundledRouter()
    app.use(router);

    const out: BundledApp = {
        app: app,
        router: router,
    };
    return out;
}

export interface BundledApp {
    app: App<Element>;
    router: Router;
}

function createDefaultApp() {
    return createBundledApp(app);
}

export { createBundledApp, createDefaultApp };