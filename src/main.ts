import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/css/base.css'
import G from "./global";
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

//引入所有语言包
import '@kangc/v-md-editor/lib/theme/style/github.css'

VueMarkdownEditor.use(vuepressTheme,{
    Prism,
    extend(md:any){
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    },
});
createApp(App)
    .use(router)
    .use(Antd)
    .use(VueMarkdownEditor)
    .use(G)
    .mount('#app')
