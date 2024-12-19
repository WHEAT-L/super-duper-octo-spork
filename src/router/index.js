import Vue from 'vue'
import VueRouter from 'vue-router'
import MiJiaoIndex from '@/views/MiJiaoIndex.vue'
import MiJiaoFenlei from '@/views/MiJiaoFenlei.vue'
import MiJiaoMiQuan from '@/views/MiJiaoMiQuan.vue'
import MiJiaoGouWuChe from '@/views/MiJiaoGouWuChe.vue'
import MiJiaoWoDe from '@/views/MiJiaoWoDe.vue'
import ShopBuy from '@/views/ShopBuy.vue'
import LoGin from '@/views/LoGin.vue'
import SetUp from '@/views/SetUp.vue'
import SearchView from '@/views/SearchView.vue'


import store from "@/store";
import { Toast } from 'vant'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MiJiaoIndex
  },
  {
    path: '/fenlei',
    name: 'fenlei',

    component: MiJiaoFenlei
  },
  {
    path: '/miquan',
    name: 'miquan',

    component: MiJiaoMiQuan
  },
  {
    path: '/gouwuche',
    name: 'MiJiaoGouWuChe',

    component: MiJiaoGouWuChe,
    meta: {
      needLogin: true,
      // show: false
    },
  },
  {
    path: '/wode',
    name: 'wode',

    component: MiJiaoWoDe,
    meta: {
      needLogin: true,
    },
  },
  {
    path: '/ShopBuy',
    name: 'ShopBuy',
    component: ShopBuy,
    meta: { show: false }
  },
  {
    path: '/LoGin',
    name: 'LoGin',
    component: LoGin,
    meta: { show: false }

  },
  {
    path: '/setup',
    name: 'setup',
    component: SetUp,
   
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
   
  }
]

const router = new VueRouter({

  routes
})

router.beforeEach((to, from, next) => {


  let isLogin = store.state.Tokens;


  console.log("当前页面是否需要登录", to.meta.needLogin, "登录状态", isLogin);

  if (to.meta.needLogin && !isLogin) {

    Toast("请先登录");

    console.log("需要登录", "目标页面是", to.fullPath);
    // next({

    router.push({
      path: "/LoGin",
      query: {
        target: to.fullPath,
      }
    })
    // });

  } else {

    next();

  }
});

export default router
