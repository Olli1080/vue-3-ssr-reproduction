import { createDefaultApp } from './shared/app'

const { router, app } = createDefaultApp();

router.isReady().then(() => {
    app.mount('#app', true);
})
