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
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'

VueMarkdownEditor.use(vuepressTheme,{
    Prism,
});
VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
})
createApp(App)
    .use(router)
    .use(Antd)
    .use(VueMarkdownEditor)
    .use(G)
    .mount('#app')
