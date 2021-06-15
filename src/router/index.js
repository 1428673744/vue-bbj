//引入并声明使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import mainData from '@/utils/mainData'
Vue.use(VueRouter)

const routes=[{
    path:'/',
    redirect:'/home'
},
]
//动态生成路由数据
mainData.forEach(item=>{
    routes.push({
        path:item.path,
        name:item.name,
        meta:{title:item.name},
        component:()=>import('@/pages/'+item.component)//匹配后添加不同的组件
    })
})
const router = new VueRouter({
    mode: 'history',
    linkActiveClass:'selected',
    routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if(localStorage.getItem('Authorization')===null||localStorage.getItem('Authorization')===''){
      localStorage.setItem('Authorization', 'nologin')
    }
    if (to.path === '/login'||to.path === '/home'||to.path === '/register'||to.path === '/pwdfind') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
      if (token ==='nologin') {//判断token里面的值是否改变
        next('/login');
      } else {
        next();
      }
    }
  });
export default router
