webpackJsonp([0],{41:function(e,t,a){"use strict";function i(e){a(50)}Object.defineProperty(t,"__esModule",{value:!0});var n=a(43),o=a(48),s=a(15),r=i,u=s(n.a,o.a,!1,r,"data-v-224fae1a",null);t.default=u.exports},43:function(e,t,a){"use strict";var i=a(45);t.a=i.a},45:function(e,t,a){"use strict";t.a={data:function(){return{conf:{dev_img_url:"/vue_demo/mid_main",build_img_url:"."}}},mounted:function(){var e=this;console.log(conf),e._make()},methods:{_make:function(){var e=this,t=echarts.init(document.getElementById("earth")),a="";a=conf.build?e.conf.build_img_url:e.conf.dev_img_url,t.setOption({globe:{globeRadius:70,globeOuterRadius:60,environment:a+"/img/map_wl.jpg",baseTexture:a+"/img/map.jpg",heightTexture:a+"/img/map_wl.jpg",displacementScale:.1,displacementQuality:"medium",shading:"realistic",realisticMaterial:{roughness:.5,metalness:0,textureTiling:1},postEffect:{enable:!1},viewControl:{autoRotate:!0},light:{main:{intensity:1,shadow:!0,shadowQuality:"ultra"},ambientCubemap:{texture:a+"/img/pisa.hdr",exposure:1,diffuseIntensity:1,specularIntensity:1}},layers:[{texture:a+"/img/map_wl.jpg"}]}})}},components:{}}},46:function(e,t,a){t=e.exports=a(14)(),t.push([e.i,"[data-v-224fae1a]{padding:0;margin:0;white-space:nowrap}body[data-v-224fae1a],html[data-v-224fae1a]{width:100%;height:100%;font-family:Microsoft Yahei;overflow:hidden}.mid_main_box[data-v-224fae1a]{width:100%;height:100%;background-color:#fff}",""])},48:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"mid_main_box",attrs:{id:"earth"}})},n=[],o={render:i,staticRenderFns:n};t.a=o},50:function(e,t,a){var i=a(46);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(16)("a704071a",i,!0,{})}});