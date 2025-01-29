export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:beforeMount', () => {
        console.log('The application is about to mount')
    });
});
