import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'lib-flexible/flexible'

//注册axios, ajax方案，用于请求数据
import axios from 'axios'
import VueAxios from 'vue-axios'

// 导入vant框架的组件
import {
  Icon,
  Tabbar,
  TabbarItem,
  Search,
  NavBar,
  Toast,
  Empty,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Grid, 
  GridItem, 
  Rate ,
  Divider,
  Button,
  List,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Sidebar,
  SidebarItem,
  Form,
  Field,
  Popup,
  Switch,
} from 'vant';

// 全局注册
Vue
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(NavBar)
  .use(Toast)
  .use(Empty)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(Rate)
  .use(Divider )
  .use(Button )
  .use(List)
  .use(Cell)
  .use(CellGroup)
  .use(Collapse)
  .use(CollapseItem)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Switch)

//注册axios, ajax方案，用于请求数据
Vue.use(VueAxios, axios)

// 设置请求的基础路径
// axios.defaults.baseURL = 'http://novel.kele8.cn'

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
