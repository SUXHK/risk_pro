import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// import Home from '../views/Home.vue'

// import Layout from '@/layout'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// const originalPush = VueRouter.prototype.push
// // 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalPush.call(this, location, onResolve, onReject)
//   }
//   return originalPush.call(this, location).catch(err => err)
// }

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    // meta: { title: '首页' },
    component: () =>
      import(/* webpackChunkName: "Risk-Home" */ '@/layout/index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        redirect: '/mid/identity',
        component: () =>
          import(
            /* webpackChunkName: "Risk-User" */ '@/layout/EmptyLayout.vue'
          ),
        // meta: { title: '首页' },
        children: [
          {
            path: 'dashboard',
            meta: { title: '仪表盘' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-User" */ '@/views/dashboard/dashboard.vue'
              )
          }
        ]
      },
      // 特约商户信息
      {
        path: '/mid',
        name: 'mid',
        redirect: '/mid/identity',
        component: () =>
          import(
            /* webpackChunkName: "Risk-Home" */ '@/layout/EmptyLayout.vue'
          ),
        meta: { title: '特约商户信息' },
        children: [
          {
            path: 'identity',
            meta: { title: '身份信息记录', bizAlias: 'fsm' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-Mid" */ '@/views/mid/identity.vue'
              )
          }
        ]
      },
      {
        path: '/midTrans',
        name: 'midTrans',
        redirect: '/midTrans/bankCard',
        component: () =>
          import(
            /* webpackChunkName: "Risk-Home" */ '@/layout/EmptyLayout.vue'
          ),
        meta: { title: '特约商户交易流水' },
        children: [
          {
            path: 'bankCard',
            meta: { title: '银行卡线下收单业务流水', bizAlias: 'fbctj' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTrans" */ '@/views/midTrans/bankCard.vue'
              )
          },
          {
            path: 'offlineScan',
            meta: { title: '线下扫码支付业务流水', bizAlias: 'fostj' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTrans" */ '@/views/midTrans/offlineScan.vue'
              )
          },
          {
            path: 'online',
            meta: {
              title: '网络支付业务（不含线下扫码支付）流水',
              bizAlias: 'foptj'
            },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTrans" */ '@/views/midTrans/online.vue'
              )
          },
          {
            path: 'prepaidCard',
            meta: { title: '预付卡业务流水', bizAlias: 'fpctj' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTrans" */ '@/views/midTrans/prepaidCard.vue'
              )
          }
        ]
      },
      {
        path: '/provisions',
        name: 'provisions',
        redirect: '/provisions/customerTransJnl',
        component: () =>
          import(
            /* webpackChunkName: "Risk-Home" */ '@/layout/EmptyLayout.vue'
          ),
        meta: { title: '备付金性质账户清单与流水' },
        children: [
          {
            path: 'customerTransJnl',
            meta: { title: '客户备付金性质账户流水信息', bizAlias: 'fcptj' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-Provisions" */ '@/views/provisions/customerTransJnl.vue'
              )
          },
          {
            path: 'customerAccount',
            meta: { title: '客户备付金性质账户信息', bizAlias: 'fcpma' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-Provisions" */ '@/views/provisions/customerAccount.vue'
              )
          }
        ]
      },
      {
        path: '/outsourcing',
        name: 'outsourcing',
        redirect: '/outsourcing/identity',
        component: () =>
          import(
            /* webpackChunkName: "Risk-Home" */ '@/layout/EmptyLayout.vue'
          ),
        meta: { title: '外包服务机构（代理商）信息' },
        children: [
          {
            path: 'identity',
            meta: { title: '外包服务机构身份信息', bizAlias: 'fcesm' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-Outsourcing" */ '@/views/outsourcing/identity.vue'
              )
          }
        ]
      },
      {
        path: '/midTransSum',
        name: 'midTransSum',
        redirect: '/midTransSum/bankCard',
        component: () =>
          import(
            /* webpackChunkName: "Risk-Home" */ '@/layout/EmptyLayout.vue'
          ),
        meta: { title: '特约商户交易流水汇总' },
        children: [
          {
            path: 'bankCard',
            meta: { title: '银行卡线下收单业务流水汇总', bizAlias: 'fbctjs' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTransSum" */ '@/views/midTransSum/bankCard.vue'
              )
          },
          {
            path: 'offlineScan',
            meta: { title: '线下扫码支付业务流水汇总', bizAlias: 'fostjs' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTransSum" */ '@/views/midTransSum/offlineScan.vue'
              )
          },
          {
            path: 'online',
            meta: {
              title: '网络支付业务（不含线下扫码支付）流水汇总',
              bizAlias: 'foptjs'
            },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTransSum" */ '@/views/midTransSum/online.vue'
              )
          },
          {
            path: 'prepaidCard',
            meta: { title: '预付卡业务流水', bizAlias: 'fpctjs' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-MidTransSum" */ '@/views/midTransSum/prepaidCard.vue'
              )
          }
        ]
      },
      {
        path: '/paymentAccount',
        name: 'paymentAccount',
        redirect: '/paymentAccount/identity',
        component: () =>
          import(
            /* webpackChunkName: "Risk-Home" */ '@/layout/EmptyLayout.vue'
          ),
        meta: { title: '特约商户信息' },
        children: [
          {
            path: 'enterprise',
            meta: { title: '单位支付账户查询', bizAlias: 'fepma' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-PaymentAccount" */ '@/views/paymentAccount/enterprise.vue'
              )
          },
          {
            path: 'personal',
            meta: { title: '个人支付账户查询', bizAlias: 'fppma' },
            component: () =>
              import(
                /* webpackChunkName: "Risk-PaymentAccount" */ '@/views/paymentAccount/personal.vue'
              )
          }
        ]
      }
      // {
      //   path: '/system',
      //   name: 'system',
      //   redirect: '/system/mgr',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "Risk-Home" */ '@/layout/EmptyLayout.vue'
      //     ),
      //   meta: { title: '系统管理' },
      //   children: [
      //     {
      //       path: 'mgr',
      //       meta: { title: '用户管理', affix: true },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/mgr.vue'
      //         )
      //     },
      //     {
      //       path: 'role',
      //       meta: { title: '角色管理' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/role.vue'
      //         )
      //     },
      //     {
      //       path: 'dept',
      //       meta: { title: '部门管理' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/dept.vue'
      //         )
      //     },
      //     {
      //       path: 'menu',
      //       meta: { title: '菜单管理' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/menu.vue'
      //         )
      //     },
      //     {
      //       path: 'dict',
      //       meta: { title: '字典管理' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/dict.vue'
      //         )
      //     },
      //     {
      //       path: 'log',
      //       meta: { title: '业务日志' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/log.vue'
      //         )
      //     },
      //     {
      //       path: 'loginLog',
      //       meta: { title: '登录日志' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/loginLog.vue'
      //         )
      //     },
      //     {
      //       path: 'druid',
      //       meta: { title: '监控管理' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/druid.vue'
      //         )
      //     },
      //     {
      //       path: 'notice',
      //       meta: { title: '通知管理' },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "Risk-Mgr" */ '@/views/system/notice.vue'
      //         )
      //     }
      //   ]
      // },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () =>
      import(/* webpackChunkName: "Risk-Login" */ '@/views/login/index.vue')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '404' },
    component: () =>
      import(/* webpackChunkName: "Risk-Notfount" */ '@/views/404/index.vue')
  }
]

// const router = new VueRouter({
//   routes
// })

const createRouter = () =>
  new VueRouter({
    routes: constantRoutes
  })

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const token = store.getters.token
//   if (!token) return next('/login')
//   next()
// })
export default router
