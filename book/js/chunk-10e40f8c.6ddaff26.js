(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10e40f8c"],{"178c":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"classify-max"},[a("van-nav-bar",{attrs:{fixed:!0,title:"分类","right-text":"书城","left-text":"返回","left-arrow":""},on:{"click-left":t.goBack,"click-right":t.goHome}}),a("van-tabs",{model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.classify,(function(e){return a("van-tab",{attrs:{title:e.title}},[a("div",{staticClass:"book-box clearfix"},t._l(t.BookClassData[e.gender],(function(o,i){return a("div",{key:i,staticClass:"book-item fl clearfix",class:[i%2==0?"book-left":"book-right"],on:{click:function(a){return t.bookChildren({gender:e.gender,item:o})}}},[a("div",{staticClass:"info fl"},[a("div",{staticClass:"info-title"},[t._v(t._s(o.name))]),a("div",{staticClass:"info-tags"},[t._v(t._s(o.bookCount)+" 本")])]),a("div",{staticClass:"imgPic fr"},t._l(o.bookCover,(function(t,e){return a("img",{key:e,attrs:{src:t,alt:""}})})),0)])})),0)])})),1)],1)},i=[],n=(a("b0c0"),a("6c7e"),{data:function(){return{active:0,classify:[{title:"男生",gender:"male"},{title:"女生",gender:"female"},{title:"出版",gender:"press"},{title:"漫画",gender:"picture"}],BookClassData:{}}},created:function(){this.bookFather()},methods:{goBack:function(){this.$router.go(-1)},goHome:function(){this.$router.push({path:"/main/home"})},bookFather:function(){var t=this;this.axios({method:"GET",url:"http://novel.kele8.cn/categories"}).then((function(e){if(200==e.status){for(var a in e.data)for(var o=0;o<e.data[a].length;o++)for(var i=0;i<e.data[a][o].bookCover.length;i++)e.data[a][o].bookCover[i]="https://statics.zhuishushenqi.com"+e.data[a][o].bookCover[i];t.BookClassData=e.data}})).catch((function(t){}))},bookChildren:function(t){console.log(t),this.$router.push({path:"/classifymin",query:{gender:t.gender,major:t.item.name}})}}}),c=n,r=a("2877"),s=Object(r["a"])(c,o,i,!1,null,"ce56f42a",null);e["default"]=s.exports},"6c7e":function(t,e,a){},b0c0:function(t,e,a){var o=a("83ab"),i=a("9bf2").f,n=Function.prototype,c=n.toString,r=/^\s*function ([^ (]*)/,s="name";o&&!(s in n)&&i(n,s,{configurable:!0,get:function(){try{return c.call(this).match(r)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-10e40f8c.6ddaff26.js.map