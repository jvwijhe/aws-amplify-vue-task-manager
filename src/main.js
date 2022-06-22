// import { createApp } from 'vue'
// // tailwind
// import './css/index.css'
// import "@aws-amplify/ui-vue/styles.css";


// import App from './App.vue'

// import Amplify, { Auth } from 'aws-amplify';

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);
// Auth.configure(awsExports);
// createApp(App).mount('#app')





// import { createApp } from 'vue';
// import App from './App.vue';
// import AmplifyVue from '@aws-amplify/ui-vue';

// // tailwind
// import './css/index.css'
// import "@aws-amplify/ui-vue/styles.css";

// const app = createApp(App);
// app.use(AmplifyVue);
// app.mount('#app');


import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'

// // tailwind
// import './css/index.css'
// import "@aws-amplify/ui-vue/styles.css";

import {
  applyPolyfills,
  defineCustomElements
} from '@aws-amplify/ui-components/loader';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// // tailwind
import './css/index.css'
import "@aws-amplify/ui-vue/styles.css";

applyPolyfills().then(() => {
  defineCustomElements(window);
});

const app = createApp(App);
app.config.isCustomElement = tag => tag.startsWith('amplify-');
// app.use(store).use(router)
app.mount('#app');
