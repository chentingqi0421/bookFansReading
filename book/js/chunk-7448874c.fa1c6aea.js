(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7448874c"],{"4de5":function(t,a,e){},"6a6a":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"search"},[e("van-nav-bar",{attrs:{fixed:!0,title:"搜索","right-text":"书城","left-text":"返回","left-arrow":""},on:{"click-left":t.goBack,"click-right":t.goHome}}),e("div",{staticClass:"nav"},[e("div",{staticClass:"nav-s"},[e("van-search",{attrs:{"show-action":"",placeholder:"请输入小说名",shape:"round",autofocus:"true"},on:{search:t.onSearch,input:function(a){return t.confirmSearch()}},scopedSlots:t._u([{key:"action",fn:function(){return[e("div",{on:{click:t.onSearch}},[t._v("搜索")])]},proxy:!0}]),model:{value:t.value,callback:function(a){t.value=a},expression:"value"}})],1)]),e("div",{staticClass:"content"},[e("div",{staticClass:"hot"},[e("div",{staticClass:"hot-head clearfix"},[e("div",{staticClass:"hot-title fl"},[t._v("搜索热词")]),e("div",{staticClass:"hot-more fr",on:{click:t.randomArr}},[e("span",[t._v("换一批")]),e("span",[e("van-icon",{attrs:{name:"replay"}})],1)])]),e("ul",{staticClass:"hot-label clearfix"},t._l(t.hotwords,(function(a,s){return e("li",{key:s,on:{click:function(e){return t.sHot(a.word)}}},[t._v(" "+t._s(a.word)+" ")])})),0)])]),e("div",{staticClass:"history-box"},[e("div",{staticClass:"history-head clearfix"},[e("div",{staticClass:"history-title fl"},[t._v("搜索历史")]),e("div",{staticClass:"history-right fr clearfix"},[e("div",{staticClass:"fl history-text",on:{click:t.removeRecord}},[t._v("删除历史")]),e("div",{staticClass:"fr history-icon"},[e("van-icon",{attrs:{name:"delete"}})],1)])]),e("ul",{staticClass:"history-label clearfix"},t._l(t.searchHistory,(function(a,s){return e("li",{key:s},[t._v(" "+t._s(a.title)+" ")])})),0)]),e("ul",{directives:[{name:"show",rawName:"v-show",value:t.iShow,expression:"iShow"}],staticClass:"search-list"},t._l(t.searchListData,(function(a,s){return e("li",{key:s,on:{click:function(e){return t.cList(a)}}},[e("van-icon",{attrs:{name:"orders-o"}}),t._v(" "+t._s(a.title)+" ")],1)})),0)],1)},r=[],o=(e("4de5"),{data:function(){return{value:"",allSearchData:"",hotwords:"",length:8,searchListData:[],iShow:!1,searchHistory:[]}},created:function(){null==localStorage.getItem("searchHistory")&&localStorage.setItem("searchHistory",JSON.stringify({data:[]})),this.searchWord(),this.upRecord()},methods:{goBack:function(){this.$router.go(-1)},goHome:function(){this.$router.push({path:"/main/home"})},onSearch:function(){this.$router.push({name:"Relevant",query:{title:this.value}});for(var t=JSON.parse(localStorage.getItem("searchHistory")),a=!0,e=0;e<t.data.length;e++)if(t.data[e].title==this.value){a=!1;break}a&&(t.data.push({title:this.value}),localStorage.setItem("searchHistory",JSON.stringify(t)),this.upRecord())},searchWord:function(){var t=this;this.axios({method:"GET",url:"http://novel.kele8.cn/search-hotwords"}).then((function(a){var e=[];t.allSearchData=a.data.searchHotWords;for(var s=0;s<t.length;s++)e.push(t.allSearchData[s]);t.hotwords=e})).catch((function(a){t.$toast.clear()}))},randomArr:function(){this.allSearchData.sort((function(){return Math.random()-.5}));for(var t=[],a=0;a<this.length;a++)t.push(this.allSearchData[a]);this.hotwords=t},confirmSearch:function(){var t=this;""!=this.value?this.axios({method:"GET",url:"http://novel.kele8.cn/search",params:{keyword:this.value}}).then((function(a){t.iShow=!0;var e=a.data.books.length>10?10:a.data.books.length;t.searchListData=[];for(var s=0;s<e;s++)t.searchListData.push(a.data.books[s])})).catch((function(a){t.$toast.clear()})):this.iShow=!1},cList:function(t){this.$router.push({name:"Relevant",query:{title:t.title}})},sHot:function(t){this.value=t,this.confirmSearch()},upRecord:function(){this.searchHistory=JSON.parse(localStorage.getItem("searchHistory")).data},removeRecord:function(){localStorage.setItem("searchHistory",JSON.stringify({data:[]})),this.searchHistory=[]}},components:{}}),i=o,c=e("2877"),n=Object(c["a"])(i,s,r,!1,null,null,null);a["default"]=n.exports}}]);
//# sourceMappingURL=chunk-7448874c.fa1c6aea.js.map