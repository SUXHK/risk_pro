import Vue from 'vue'
import AFTableColumn from 'af-table-column'

// 定义字体比例
const fontRate = {
  CHAR_RATE: 1.2, // 汉字比率 1.1
  NUM_RATE: 0.75, // 数字 0.65
  OTHER_RATE: 0.9 // 除汉字和数字以外的字符的比率 0.8
}
const fontSize = 16
// 注册组件
Vue.use(AFTableColumn, { fontRate, fontSize })
// Vue.use(AFTableColumn)
