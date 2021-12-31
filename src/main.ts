import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/css/base.css'
import G from "./global";

//md编辑组件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

//md预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css';


//引入所有语言包
import '@kangc/v-md-editor/lib/theme/style/github.css'
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';


VueMarkdownEditor.use(vuepressTheme,{
    Prism,
    extend(md:any){
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    },
});
VMdPreview.use(vuepressTheme,{
    Prism
})
createApp(App)
    .use(router)
    .use(Antd)
    .use(VueMarkdownEditor)
    .use(VMdPreview)
    .use(G)
    .mount('#app')
