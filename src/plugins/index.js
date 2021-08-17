import Vue from 'vue'
import '@/plugins/axios'
import '@/plugins/registerServiceWorker'
import '@/plugins/element.js'
import '@/plugins/dayjs'
import '@/plugins/lodash'
import '@/assets/icons/index.js'
import 'normalize.css/normalize.css'

import '@/config/permission'

import GlobalPromptStyle from '@/utils/GlobalPromptStyle'
Vue.use(GlobalPromptStyle)
