import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'
import PrimeVue from 'primevue/config';

// Global styles
import './assets/main.css'

// Initialize application variable
let app

// Fire this function any time firebase detect Auth change
projectAuth.onAuthStateChanged(() => {
    // if app is null
    if(!app){
        
        // Create the app, user the router and mount the app to the DOM
        app = createApp(App).use(router).use(PrimeVue).mount('#app')

        
    }  
})

