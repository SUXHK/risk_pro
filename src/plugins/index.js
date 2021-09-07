import Vue from 'vue'
import '@/plugins/axios'
import '@/plugins/element.js'
import '@/plugins/dayjs'
import '@/plugins/lodash'
import '@/assets/icons/index.js'
import '@/plugins/af-table-column'
// import '@/plugins/v-fit-columns'
import 'normalize.css/normalize.css'
import * as filters from '@/utils/filters'
import '@/config/permission'

import GlobalPromptStyle from '@/utils/GlobalPromptStyle'
Vue.use(GlobalPromptStyle)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
