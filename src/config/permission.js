import router from '@/router'
// import store from '@/store'
// import Cookies from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/GetPageTitle'

// const a = Cookies.get('Theme')
// if (a) {
//   const { style } = JSON.parse(a)
//   if (style) {
//     console.log(style)
//     store.dispatch('settings/getThemeSetting', {
//       key: 'themeStyle',
//       value: style
//     })
//   }
// }

NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
}) // NProgress
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // if (to.path === '/login') return next()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
      // MessageBox.alert(' 登录时效已过期，请重新重新登录。', '提示', {
      //   confirmButtonText: '确定',
      //   type: 'error',
      //   closeOnPressEscape: false,
      //   showClose: false
      // }).then(() => {
      //   next('/login')
      // })
      // // next('/login')
      // return
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // console.log(to.path)
      console.log(from.path)
      if (from.path === '/') {
        next(`/login`)
        NProgress.done()
      } else {
        MessageBox.alert(' 登录时效已过期，请重新重新登录。', '提示', {
          confirmButtonText: '确定',
          type: 'error',
          closeOnPressEscape: false,
          showClose: false
        }).then(() => {
          Message.warning({
            showClose: true,
            dangerouslyUseHTMLString: true,
            duration: '0',
            message: `<strong>系统提示： </strong> 登录时效过期，请重新登录`
          })
          // other pages that do not have permission to access are redirected to the login page.
          next(`/login`)
          NProgress.done()
        })
        return NProgress.done()
      }
    }
  }
  // next()
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// console.log(store.dispatch('settings/getThemeSetting'))

// console.log(store)
// const a = Cookies.get('Theme')
// if (a) {
//   const { style } = JSON.parse(a)
//   if (style) {
//     settings.themeStyle = style
//   }
// }
