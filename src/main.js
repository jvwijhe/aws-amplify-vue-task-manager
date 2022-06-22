import { createApp } from 'vue'
import App from './App.vue'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

createApp(App).mount('#app')
