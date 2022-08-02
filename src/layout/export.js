import Vue from 'vue'
import AppFooter from '@/layout/components/AppFooter/index.vue'
import VabQueryForm from '@/components/VabQueryForm/index.vue'
import VabQueryFormBottomPanel from '@/components/VabQueryForm/VabQueryFormBottomPanel.vue'
import VabQueryFormLeftPanel from '@/components/VabQueryForm/VabQueryFormLeftPanel.vue'
import VabQueryFormRightPanel from '@/components/VabQueryForm/VabQueryFormRightPanel.vue'
import VabQueryFormTopPanel from '@/components/VabQueryForm/VabQueryFormTopPanel.vue'

import { version } from '../../package.json'
// console.log(process.env.BASE_URL)
document.writeln(
  `<script>console.info('%cBase api 🚀 ${process.env.VUE_APP_BASE_API}','background-color:black;padding:8px 20px;border-radius:8px;font-size:16px;color:white;')</script>`,
  `<script>console.info('%cBase url 🛸 ${process.env.BASE_URL}','background-color:black;padding:8px 20px;border-radius:8px;font-size:16px;color:white;')</script>`,
  `<script>console.info('%cVersion 💯 ${version}','background-color:black;padding:8px 20px;border-radius:8px;font-size:16px;color:white;')</script>`,
  `<script>console.info('%cRelease time 🕒 ${process.env.VUE_APP_UPDATE_TIME}','background-color:black;padding:8px 20px;border-radius:8px;font-size:16px;color:white;')</script>`
)

// 注册全局组件
Vue.component('app-footer', AppFooter)
Vue.component('vab-query-form', VabQueryForm)
Vue.component('vab-query-form-bottom-panel', VabQueryFormBottomPanel)
Vue.component('vab-query-form-left-panel', VabQueryFormLeftPanel)
Vue.component('vab-query-form-right-panel', VabQueryFormRightPanel)
Vue.component('vab-query-form-top-panel', VabQueryFormTopPanel)
