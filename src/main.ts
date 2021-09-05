import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/css/base.css'
import G from "./global";
createApp(App)
    .use(router)
    .use(Antd)
    .use(G)
    .mount('#app')
