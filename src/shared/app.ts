import { createSSRApp, Component, createApp } from 'vue'
import { App } from '@vue/runtime-core'
import app from '../components/main/home.vue'

function createBundledApp(root: Component) {
    const app = __IS_SSR__ ? createSSRApp(root) : createApp(root);

    const out: BundledApp = {
        app: app
    };
    return out;
}

export interface BundledApp {
    app: App<Element>;
}

function createDefaultApp() {
    return createBundledApp(app);
}

export { createBundledApp, createDefaultApp };