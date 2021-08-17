import Vue from 'vue'
import AppFooter from '@/layout/components/AppFooter/index.vue'
import VabQueryForm from '@/components/VabQueryForm/index.vue'
import VabQueryFormBottomPanel from '@/components/VabQueryForm/VabQueryFormBottomPanel.vue'
import VabQueryFormLeftPanel from '@/components/VabQueryForm/VabQueryFormLeftPanel.vue'
import VabQueryFormRightPanel from '@/components/VabQueryForm/VabQueryFormRightPanel.vue'
import VabQueryFormTopPanel from '@/components/VabQueryForm/VabQueryFormTopPanel.vue'
// 注册全局组件
Vue.component('app-footer', AppFooter)
Vue.component('vab-query-form', VabQueryForm)
Vue.component('vab-query-form-bottom-panel', VabQueryFormBottomPanel)
Vue.component('vab-query-form-left-panel', VabQueryFormLeftPanel)
Vue.component('vab-query-form-right-panel', VabQueryFormRightPanel)
Vue.component('vab-query-form-top-panel', VabQueryFormTopPanel)
