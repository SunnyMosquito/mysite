(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["category"],{"1e00":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"category"},[n("app-header"),n("section",{staticClass:"content wrap"},[n("h2",[t._v(t._s(this.$route.params.categoryName))]),t.postList.length<1?n("h3",[t._v("什么也没有...")]):t._e(),n("ul",t._l(t.postList,function(e,a){return n("li",{key:a},[n("router-link",{attrs:{to:"/posts/"+e.id+"/"}},[t._v(t._s(e.title))])],1)}),0)]),n("app-footer")],1)},o=[],r=n("be94"),i=n("418b"),s=n("e870"),c=n("2f62"),u={name:"category",data:function(){return{postList:[]}},components:{AppHeader:i["a"],AppFooter:s["a"]},computed:Object(r["a"])({},Object(c["c"])(["categoryList"])),created:function(){this.getPostData(this.$route.params.categoryName)},watch:{$route:function(){this.postList=[],this.getPostData(this.$route.params.categoryName)}},methods:Object(r["a"])({},Object(c["b"])(["SET_CATEGORY_LIST"]),{getPostData:function(t){t||this.$router.push("/");var e="api/posts/?category=".concat(t);this.categoryList.hasOwnProperty(t)?this.postList=this.categoryList[t]:this.axios.get(e).then(function(e){this.SET_CATEGORY_LIST({name:t,data:e.data.results}),this.postList=e.data.results}.bind(this)).catch(function(t){alert(t),this.$router.push("/")}.bind(this))}})},l=u,f=(n("f5eb"),n("2877")),h=Object(f["a"])(l,a,o,!1,null,"1e68767e",null);h.options.__file="Category.vue";e["default"]=h.exports},"1e2d":function(t,e,n){},3381:function(t,e,n){"use strict";var a=n("3700"),o=n.n(a);o.a},3700:function(t,e,n){},"418b":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{ref:"header",staticClass:"header wrap",on:{click:t.hideSubMenu}},[n("div",{staticClass:"logo"},[n("h1",[n("router-link",{attrs:{to:"/"}},[t._v("蚊子的个人博客")])],1)]),n("nav",{staticClass:"nav"},[n("ul",[n("li",[n("router-link",{attrs:{to:"/"}},[t._v("主页")])],1),n("li",[n("a",{class:{"router-link-exact-active":-1!=t.$route.path.indexOf("category")},on:{click:function(e){return e.stopPropagation(),t.toggleSubMenu(e)}}},[t._v("分类")]),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.ifSubMenuShow,expression:"ifSubMenuShow"}],staticClass:"submenu"},t._l(t.categories,function(e,a){return n("li",{key:a},[n("router-link",{attrs:{to:"/category/"+e.name}},[t._v(t._s(e.name))])],1)}),0)]),n("li",[n("router-link",{attrs:{to:"/archive"}},[t._v("归档")])],1),n("li",[n("router-link",{attrs:{to:"/message"}},[t._v("留言")])],1),n("li",[n("router-link",{attrs:{to:"/about"}},[t._v("关于我")])],1)])])])},o=[],r=n("be94"),i=n("2f62"),s={name:"appHeader",data:function(){return{ifSubMenuShow:!1}},created:function(){this.getCategories()},mounted:function(){},destroyed:function(){},components:{},computed:Object(r["a"])({},Object(i["c"])(["categories"])),methods:Object(r["a"])({},Object(i["b"])(["SET_CATEGORIES"]),{getCategories:function(){var t="/api/categorys/";this.categories.length<1&&this.axios.get(t).then(function(t){this.SET_CATEGORIES(t.data)}.bind(this)).catch(function(t){alert(t)}.bind(this))},toggleSubMenu:function(){this.ifSubMenuShow=!this.ifSubMenuShow},hideSubMenu:function(){this.ifSubMenuShow=!1}})},c=s,u=(n("3381"),n("2877")),l=Object(u["a"])(c,a,o,!1,null,"0f6e0179",null);l.options.__file="AppHeader.vue";e["a"]=l.exports},"6dec":function(t,e,n){},be94:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var a=n("ade3");function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){Object(a["a"])(t,e,n[e])})}return t}},c8c6:function(t,e,n){"use strict";var a=n("1e2d"),o=n.n(a);o.a},e870:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"footer"},[n("a",{attrs:{href:"http://www.miitbeian.gov.cn"}},[t._v("互联网ICP备案：粤ICP备18061554号")])])}],r={name:"appFooter",data:function(){return{}}},i=r,s=(n("c8c6"),n("2877")),c=Object(s["a"])(i,a,o,!1,null,"36341819",null);c.options.__file="AppFooter.vue";e["a"]=c.exports},f5eb:function(t,e,n){"use strict";var a=n("6dec"),o=n.n(a);o.a}}]);
//# sourceMappingURL=category.b74d9af4.js.map