(function(t){function e(e){for(var a,s,c=e[0],r=e[1],u=e[2],l=0,m=[];l<c.length;l++)s=c[l],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&m.push(n[s][0]),n[s]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);d&&d(e);while(m.length)m.shift()();return i.push.apply(i,u||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],a=!0,s=1;s<o.length;s++){var r=o[s];0!==n[r]&&(a=!1)}a&&(i.splice(e--,1),t=c(c.s=o[0]))}return t}var a={},n={app:0},i=[];function s(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"ebd45ed4"}[t]+".js"}function c(e){if(a[e])return a[e].exports;var o=a[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.e=function(t){var e=[],o=n[t];if(0!==o)if(o)e.push(o[2]);else{var a=new Promise((function(e,a){o=n[t]=[e,a]}));e.push(o[2]=a);var i,r=document.createElement("script");r.charset="utf-8",r.timeout=120,c.nc&&r.setAttribute("nonce",c.nc),r.src=s(t);var u=new Error;i=function(e){r.onerror=r.onload=null,clearTimeout(l);var o=n[t];if(0!==o){if(o){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,o[1](u)}n[t]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:r})}),12e4);r.onerror=r.onload=i,document.head.appendChild(r)}return Promise.all(e)},c.m=t,c.c=a,c.d=function(t,e,o){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(o,a,function(e){return t[e]}.bind(null,a));return o},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var r=window["webpackJsonp"]=window["webpackJsonp"]||[],u=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var d=u;i.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"04c6":function(t,e,o){"use strict";o("8aca")},"1b0b":function(t,e,o){"use strict";o("caa1")},"331f":function(t,e,o){t.exports=o.p+"img/busIcon.d8ae5f3f.svg"},"3e45":function(t,e,o){},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var a=o("7a23");function n(t,e){var o=Object(a["A"])("router-view");return Object(a["t"])(),Object(a["d"])(o)}var i=o("6b0d"),s=o.n(i);const c={},r=s()(c,[["render",n]]);var u=r,l=(o("ba8c"),o("d3b7"),o("3ca3"),o("ddb0"),o("6c02")),d={class:"flex flex-col h-screen max-h-screen"},m=Object(a["g"])("div",{id:"map",class:"h-full"},null,-1);function h(t,e,o,n,i,s){var c=Object(a["A"])("Bus");return Object(a["t"])(),Object(a["f"])("div",d,[m,Object(a["j"])(c,{choiceItem:i.choiceItem},null,8,["choiceItem"])])}o("d81d"),o("99af"),o("159b");var f=o("e11e"),p=o.n(f),b=(o("0de5"),function(t){return Object(a["w"])("data-v-df1e72d0"),t=t(),Object(a["u"])(),t}),g={id:"infoCard",ref:"gesture"},O={key:0,class:"info"},v={class:"font-bold text-2xl title"},j={class:"text-base text-gray-800 title"},S=Object(a["h"])('<div class="absolute right-10 top-6 text-center" data-v-df1e72d0><svg class="text-2xl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-df1e72d0><path d="M16.5455 4C14.6364 4 12.9545 4.93333 12 6.4C11.0455 4.93333 9.36364 4 7.45455 4C4.45455 4 2 6.4 2 9.33333C2 14.6222 12 20 12 20C12 20 22 14.6667 22 9.33333C22 6.4 19.5455 4 16.5455 4Z" fill="#FF4A55" stroke="#FF4A55" data-v-df1e72d0></path></svg><p class="text-sm" data-v-df1e72d0>收藏</p></div><div class="absolute right-24 top-6 text-center" data-v-df1e72d0><svg class="text-2xl" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-df1e72d0><path d="M9.33069 20.3481L1.65187 12.6693C0.782711 11.8002 0.782711 10.1998 1.65187 9.33069L9.33069 1.65187C10.1998 0.782711 11.8002 0.782711 12.6693 1.65187L20.3481 9.33069C21.2173 10.1998 21.2173 11.8002 20.3481 12.6693L12.6693 20.3481C11.8002 21.2173 10.1998 21.2173 9.33069 20.3481Z" fill="#377BFF" stroke="#377BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-df1e72d0></path><path d="M7.25 13.5V11C7.25 10.2625 7.7675 9.75 8.5 9.75H14.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-df1e72d0></path><path d="M12.252 7.24405L14.7559 9.74801L12.252 12.252" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-df1e72d0></path></svg><p class="text-sm" data-v-df1e72d0>路線</p></div><hr class="pt-4 mt-4" data-v-df1e72d0><h1 class="font-bold text-base pb-3" data-v-df1e72d0>即將抵達本站公車</h1>',4),x={key:0,class:"carousel__item rounded-2xl"},T={class:"p-3 text-left"},w=b((function(){return Object(a["g"])("i",{class:"fas fa-bus font-bold mr-1"},null,-1)})),y={class:"font-bold title"},C={class:"text-left text-gray-800 text-sm p-1"},E=b((function(){return Object(a["g"])("hr",{class:"mt-2"},null,-1)})),k={key:0},I=b((function(){return Object(a["g"])("p",{class:"mt-4"},"再過",-1)})),B={key:0,class:"text-left text-red-500 text-2xl font-bold Sfpro"},A=b((function(){return Object(a["g"])("span",{class:"text-base px-1"},"分鐘",-1)})),N={key:1,class:"text-left text-black text-2xl font-bold Sfpro"},_=b((function(){return Object(a["g"])("span",{class:"text-base px-1"},"分鐘",-1)})),D={class:"text-left"},L={key:1},Z={class:"text-left text-red-500 text-2xl font-bold Sfpro mt-8"},M=b((function(){return Object(a["g"])("span",{class:"text-base px-1"},null,-1)}));function z(t,e,o,n,i,s){var c=Object(a["A"])("Slide"),r=Object(a["A"])("Carousel"),u=Object(a["A"])("Route");return Object(a["t"])(),Object(a["f"])("div",g,[t.choiceItem?(Object(a["t"])(),Object(a["f"])("div",O,[Object(a["g"])("h1",v,Object(a["C"])(t.choiceItem.StopName.Zh_tw||"NULL"),1),Object(a["g"])("p",j,Object(a["C"])(t.choiceItem.StopAddress),1),S,Object(a["j"])(r,{settings:t.settings,breakpoints:t.breakpoints},{default:Object(a["G"])((function(){return[(Object(a["t"])(!0),Object(a["f"])(a["a"],null,Object(a["z"])(t.realtime,(function(e){return Object(a["t"])(),Object(a["d"])(c,{key:e,onClick:function(o){return t.busCardhandle(e)}},{default:Object(a["G"])((function(){return[t.realtime?(Object(a["t"])(),Object(a["f"])("div",x,[Object(a["g"])("div",T,[w,Object(a["g"])("span",y,Object(a["C"])(e.RouteName.Zh_tw||"NULL"),1),Object(a["g"])("p",C,"往"+Object(a["C"])(e.endstop||"NULL"),1),E,0==e.StopStatus?(Object(a["t"])(),Object(a["f"])("div",k,[I,e.EstimateTime<10?(Object(a["t"])(),Object(a["f"])("p",B,[Object(a["i"])(Object(a["C"])(e.EstimateTime),1),A])):(Object(a["t"])(),Object(a["f"])("p",N,[Object(a["i"])(Object(a["C"])(e.EstimateTime),1),_])),Object(a["g"])("p",D,"即抵達"+Object(a["C"])(t.choiceItem.StopName.Zh_tw||"NULL"),1)])):Object(a["e"])("",!0),0!=e.StopStatus?(Object(a["t"])(),Object(a["f"])("div",L,[Object(a["g"])("p",Z,[Object(a["i"])(Object(a["C"])(e.EstimateTime),1),M])])):Object(a["e"])("",!0)])])):Object(a["e"])("",!0)]})),_:2},1032,["onClick"])})),128))]})),_:1},8,["settings","breakpoints"]),Object(a["g"])("button",{onClick:e[0]||(e[0]=function(e){return t.ss=!t.ss}),style:{"z-index":"9999"}},"開關"),Object(a["j"])(u,{chooseBusCard:t.chooseBusCard,ss:t.ss},null,8,["chooseBusCard","ss"])])):Object(a["e"])("",!0)],512)}o("25f0");var P=o("0b81"),R=(o("4001"),function(t){return Object(a["w"])("data-v-8718d75a"),t=t(),Object(a["u"])(),t}),H={id:"router"},F={class:"row"},q={key:0,id:"BusData",class:"list-group padding"},$={key:0,class:"time"},J={key:1,class:"time"},U={class:"stopname"},G=R((function(){return Object(a["g"])("div",{class:"line"},null,-1)}));function X(t,e,o,n,i,s){return Object(a["t"])(),Object(a["f"])("div",H,[Object(a["g"])("div",F,[i.goEstimatedTime?(Object(a["t"])(),Object(a["f"])("div",q,[(Object(a["t"])(!0),Object(a["f"])(a["a"],null,Object(a["z"])(i.goEstimatedTime,(function(t){return Object(a["t"])(),Object(a["f"])("div",{class:"busroute",key:t},[t.EstimateTime?(Object(a["t"])(),Object(a["f"])("p",$,Object(a["C"])(t.EstimateTime),1)):(Object(a["t"])(),Object(a["f"])("p",J,"尚未發車")),Object(a["g"])("p",U,Object(a["C"])(t.StopName.Zh_tw),1)])})),128))])):Object(a["e"])("",!0),G])])}o("4e82");var V=o("bc3a"),Y=o.n(V),K=o("6c2d"),W="http://ogala.ga:1111/log",Q={log:function(t){return console.log(t),Y.a.post(W,t).catch((function(){}))},getAuthorizationHeader:function(){var t="69121a1d8f714a5faa4f54c512bb459e",e="nYALaDjx1Au-PYCnZOnL-InFIZI",o=(new Date).toGMTString(),a=new K["a"]("SHA-1","TEXT");a.setHMACKey(e,"TEXT"),a.update("x-date: "+o);var n=a.getHMAC("B64"),i='hmac username="'+t+'", algorithm="hmac-sha1", headers="x-date", signature="'+n+'"';return{Authorization:i,"X-Date":o}}},tt={props:["chooseBusCard","ss"],data:function(){return{goEstimatedTime:[],backEstimatedTime:[],stopSequence:[],routeHeadsign:[]}},mounted:function(){var t=this;this.getStopSequence(),this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/".concat(this.chooseBusCard,"?$filter=RouteName%2FZh_tw%20eq%20'").concat(this.chooseBusCard,"'&$format=JSON"),headers:Q.getAuthorizationHeader()}).then((function(e){t.goEstimatedTime=[],e.data.forEach((function(e){0==e.Direction?t.goEstimatedTime.push(e):t.backEstimatedTime.push(e)})),t.goEstimatedTime=t.fixTime(t.goEstimatedTime),t.sortJSONData(t.goEstimatedTime,0)})).catch((function(t){return console.log("error",t)}))},methods:{getStopSequence:function(){var t=this;this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/Taipei/".concat(this.chooseBusCard,"?$filter=RouteName%2FZh_tw%20eq%20'").concat(this.chooseBusCard,"'&$format=JSON"),headers:Q.getAuthorizationHeader()}).then((function(e){t.stopSequence=[],e.data.forEach((function(e){var o=[],a=[];e["Stops"].forEach((function(t){o.push(t["StopUID"]),a.push(t["StopName"]["Zh_tw"])}));var n=[o,a];t.stopSequence.push(n)}))})).catch((function(t){return console.log("error",t)}))},sortJSONData:function(t,e){var o,a,n=this;return t.sort((function(t,i){return o=n.stopSequence[e][0].indexOf(t["StopUID"]),a=n.stopSequence[e][0].indexOf(i["StopUID"]),o<a?-1:o>a?1:0}))},fixTime:function(t){return t.forEach((function(t){if(t["EstimateTime"]<3600&&t["EstimateTime"]>60){var e=Math.floor(t["EstimateTime"]/60);e<10&&(e="0"+e.toString()),t["EstimateTime"]=e+"分"}else t["EstimateTime"]<60?t["EstimateTime"]="進站中":1==t.StopStatus?t["EstimateTime"]="尚未發車":2==t.StopStatus?t["EstimateTime"]="交管不停靠":3==t.StopStatus?t["EstimateTime"]="末班車已過":4==t.StopStatus&&(t["EstimateTime"]="今日未營運")})),console.log("校正時間",t),t}},watch:{ss:function(){console.log("我是SS");var t=document.getElementById("router");this.ss?t.style.display="none":t.style.display="block",console.log(this.ss)}}};o("abbb");const et=s()(tt,[["render",X],["__scopeId","data-v-8718d75a"]]);var ot=et,at=o("c8b5"),nt=o.n(at),it=Object(a["k"])({name:"Bus",props:["choiceItem"],components:{Carousel:P["a"],Slide:P["b"],Route:ot},data:function(){return{hammer:null,ss:!1,timer:"",settings:{itemsToShow:2,snapAlign:"start",transition:150},breakpoints:{700:{itemsToShow:4,snapAlign:"center"},1024:{itemsToShow:8,snapAlign:"center"}},realtime:[],chooseBusCard:"18"}},created:function(){this.getBusRealTime(),this.timer=setInterval(this.getBusRealTime(),3e4)},mounted:function(){this.init(),this.getallBusName()},methods:{busCardhandle:function(t){this.chooseBusCard=t.RouteName.Zh_tw,console.log("巴士卡",this.chooseBusCard),this.ss=!1,this.ss=!0},init:function(){this.hammer=new nt.a(this.$refs.gesture),this.hammer.get("swipe").set({direction:nt.a.DIRECTION_VERTICAL}),this.hammer.on("swipedown",(function(){var t=document.getElementById("infoCard");t.style.bottom="-450px"}))},getBusRealTime:function(){var t=this;console.log("選擇站點ID",this.choiceItem.StationID),this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/PassThrough/Station/".concat(this.choiceItem.StationID,"?$format=JSON"),headers:Q.getAuthorizationHeader()}).then((function(e){t.realtime=e.data,t.getBusDestination(),console.log("站點預估到達資訊",t.realtime)})).catch((function(t){return console.log("error",t)}))},getBusDestination:function(){var t=this;this.realtime.forEach((function(e){t.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taipei/".concat(e.RouteName.Zh_tw,"?$filter=RouteName%2FZh_tw%20eq%20'").concat(e.RouteName.Zh_tw,"'&$format=JSON"),headers:Q.getAuthorizationHeader()}).then((function(t){if(console.log("取得路線資訊",t.data),1==e.Direction?e["endstop"]=t.data[0].DepartureStopNameZh:0==e.Direction&&(e["endstop"]=t.data[0].DestinationStopNameZh),1==e.StopStatus)e["EstimateTime"]="尚未發車";else if(2==e.StopStatus)e["EstimateTime"]="交管不停靠";else if(3==e.StopStatus)e["EstimateTime"]="末班車已過";else if(4==e.StopStatus)e["EstimateTime"]="今日未營運";else{if(e["EstimateTime"]<60)return;var o=Math.floor(e["EstimateTime"]/60);o<10&&(o="0"+o.toString()),e["EstimateTime"]=o}})).catch((function(t){return console.log("error",t)}))}))},getallBusName:function(){this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/City/Taipei?$format=JSON",headers:Q.getAuthorizationHeader()}).then((function(t){var e=t.data,o=0,a="";e.forEach((function(t){t["StopName"]["Zh_tw"].length>o&&(o=t["StopName"]["Zh_tw"].length,a=t["StopName"]["Zh_tw"])})),console.log("最長的名字",o,a)}))}},watch:{choiceItem:function(){this.getBusRealTime();var t=document.getElementById("infoCard");t.style.bottom="0px"}}});o("04c6");const st=s()(it,[["render",z],["__scopeId","data-v-df1e72d0"]]);var ct=st,rt={name:"Home",components:{Bus:ct},data:function(){return{choiceItem:"",geo:[25.045,121.536],mymap:null,gettingLocation:null,busData:null,busIcon:p.a.icon({iconUrl:o("331f"),iconSize:[23,23],iconAnchor:[13,24],popupAnchor:[-3,-76]}),userIcon:p.a.icon({iconUrl:o("75d1"),iconSize:[48,48],iconAnchor:[13,24],popupAnchor:[-3,-76]})}},mounted:function(){this.init()},beforeCreate:function(){document.body.className="home"},created:function(){var t=this;"geolocation"in navigator&&(this.gettingLocation=!0,navigator.geolocation.getCurrentPosition((function(e){t.gettingLocation=!1,t.geo=[e.coords.latitude,e.coords.longitude],console.log(t.geo),t.getBusStopData(t.geo[0],t.geo[1])}),(function(e){t.gettingLocation=!1,t.errorStr=e.message})))},methods:{init:function(){this.mymap=p.a.map("map",{center:this.geo,zoom:12,zoomControl:!1,tap:!1}),p.a.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=2ebbece2-a602-41ff-96c6-745a4f4b46bb",{maxZoom:20,zoom:17,attribution:'&copy; <a href="https://2021.thef2e.com/works">我們就是要組隊</a> contributors'}).addTo(this.mymap),p.a.control.locate({position:"bottomright",icon:"location",drawCircle:!1,flyTo:!0,locateOptions:{enableHighAccuracy:!0},markerClass:p.a.marker,markerStyle:{icon:this.userIcon}}).addTo(this.mymap).start()},getBusStopData:function(t,e){var o=this;console.log(t,e),this.busData?console.log("已有站牌資料"):(console.log("取得站牌API資料"),this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$spatialFilter=nearby(".concat(t,",").concat(e,",800)&$format=JSON"),headers:Q.getAuthorizationHeader()}).then((function(t){o.busData=t.data,o.setMarker()})).catch((function(t){return console.log("error",t)})))},setMarker:function(){var t=this,e=this;this.choiceItem=this.busData[0],console.log(this.choiceItem),this.busData.forEach((function(o){p.a.marker([o.StopPosition.PositionLat,o.StopPosition.PositionLon],{icon:t.busIcon,title:o.StopName.Zh_tw,markerClass:"test"}).addTo(t.mymap).on("click",(function(){e.choiceItem="",e.choiceItem=o}))}))}}};o("1b0b");const ut=s()(rt,[["render",h]]);var lt=ut,dt=[{path:"/",name:"Home",component:lt,meta:{title:"W3 公車"}},{path:"/about",name:"About",component:function(){return o.e("about").then(o.bind(null,"f820"))}}],mt=Object(l["a"])({history:Object(l["b"])("/"),base:"index.html",routes:dt});mt.beforeEach((function(t,e,o){document.title="".concat(t.meta.title),o()}));var ht=mt,ft=o("130e");Object(a["c"])(u).use(ht).use(ft["a"],Y.a).mount("#app")},"75d1":function(t,e,o){t.exports=o.p+"img/userIcon.07a8e763.svg"},"8aca":function(t,e,o){},abbb:function(t,e,o){"use strict";o("3e45")},ba8c:function(t,e,o){},caa1:function(t,e,o){}});
//# sourceMappingURL=app.85598119.js.map