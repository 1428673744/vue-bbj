import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import store from '@/store'
import '/src/assets/iconfont/iconfont.css'
export const eventBus = new Vue();

Vue.use(VueAxios, axios)
Vue.prototype.$qs = qs;
Vue.config.productionTip = false//关闭生产提示
axios.defaults.baseURL ="http://localhost:8080"

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this //安装事件总线
  },
  render: h => h(App),
  router, //我们所有的组件内部都可以使用this.$router和this.$route
  store
}).$mount('#app')


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

  //禁止手动修改localstorage
  window.addEventListener("storage",(e)=>{
    localStorage.setItem(e.key,e.oldValue)
  });