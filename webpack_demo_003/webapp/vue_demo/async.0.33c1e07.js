webpackJsonp([0],{47:function(t,o,i){"use strict";function n(t){i(56)}Object.defineProperty(o,"__esModule",{value:!0});var a=i(48),s=i(55),_=i(1),e=n,l=_(a.a,s.a,!1,e,"data-v-197e7f98",null);o.default=l.exports},48:function(t,o,i){"use strict";var n=i(49);o.a=n.a},49:function(t,o,i){"use strict";var n={totalTerminalNum:50,onlineTerminalNum:0,stationNum:100,totalRunstationNum:0,platformNum:0};o.a={data:function(){return{conf:{top_time:1e3,top_sn_arr_limit:60},top_info_sn_obj:{key:null,ec:null,date:null,h:null,m:null,s:null,date_str:"",date_string:"",arr:[],totalTerminalNum:0,onlineTerminalNum:0,zhongd_chi_json:null,zhongd_hui_json:null,stationNum:0,totalRunstationNum:0,cors_chi_json:null,cors_hui_json:null,platformNum:0,platformNum_chi_json:null,platformNum_hui_json:null}}},mounted:function(){this._top_info()},methods:{_top_info:function(){var t=this;n.totalTerminalNum=n.totalTerminalNum+1,n.onlineTerminalNum=Math.floor(Math.random()*n.totalTerminalNum),n.totalRunstationNum=Math.floor(Math.random()*n.stationNum),n.platformNum=Math.floor(Math.random()*n.totalTerminalNum),t.top_info_sn_obj.totalTerminalNum=n.totalTerminalNum,t.top_info_sn_obj.onlineTerminalNum=n.onlineTerminalNum,n.onlineTerminalNum==n.totalTerminalNum?(t.top_info_sn_obj.zhongd_chi_json={right:"-2px"},t.top_info_sn_obj.zhongd_hui_json={width:0}):(t.top_info_sn_obj.zhongd_chi_json={right:(n.totalTerminalNum-n.onlineTerminalNum)/n.totalTerminalNum*100-1+"%"},t.top_info_sn_obj.zhongd_hui_json={width:(n.totalTerminalNum-n.onlineTerminalNum)/n.totalTerminalNum*100+"%"}),t.top_info_sn_obj.stationNum=n.stationNum,t.top_info_sn_obj.totalRunstationNum=n.totalRunstationNum,n.totalRunstationNum==n.stationNum?(t.top_info_sn_obj.cors_chi_json={right:"-2px"},t.top_info_sn_obj.cors_hui_json={width:0}):(t.top_info_sn_obj.cors_chi_json={right:(n.stationNum-n.totalRunstationNum)/n.stationNum*100-1+"%"},t.top_info_sn_obj.cors_hui_json={width:(n.stationNum-n.totalRunstationNum)/n.stationNum*100+"%"}),t.top_info_sn_obj.platformNum=n.platformNum,0==n.platformNum?(t.top_info_sn_obj.platformNum_chi_json={right:"99%"},t.top_info_sn_obj.platformNum_hui_json={width:"100%"}):(t.top_info_sn_obj.platformNum_chi_json={right:"-2px"},t.top_info_sn_obj.platformNum_hui_json={width:0}),setTimeout(function(){t._top_info()},t.conf.top_time)}},components:{}}},50:function(t,o,i){o=t.exports=i(0)(),o.push([t.i,"[data-v-197e7f98]{padding:0;margin:0;white-space:nowrap}.box[data-v-197e7f98]{background:navy;box-shadow:0 0 20px 3px rgba(0,0,0,.03);box-sizing:border-box;padding:10px;padding-left:40px;padding-right:40px}.box>.main_box[data-v-197e7f98],.box[data-v-197e7f98]{width:100%;height:100%}.box>.main_box>.item_one[data-v-197e7f98]{width:100%;height:12%;position:relative;color:#fff}.box>.main_box>.item_one>.info[data-v-197e7f98]{position:absolute;left:0;bottom:0;height:16px;width:50%;font-size:14px;font-weight:600;line-height:16px}.box>.main_box>.item_one>.sum[data-v-197e7f98]{position:absolute;right:20px;bottom:-2px;font-size:30px;height:30px;width:80px;line-height:30px;text-align:right}.box>.main_box>.item_one>.ge[data-v-197e7f98]{position:absolute;right:0;bottom:0;height:16px;width:16px;line-height:16px;font-size:14px}.box>.main_box>.item_two[data-v-197e7f98]{width:100%;height:25%;color:#fff}.box>.main_box>.item_two>.top[data-v-197e7f98]{width:100%;height:50%;position:relative}.box>.main_box>.item_two>.top>.info[data-v-197e7f98]{position:absolute;left:0;bottom:0;height:16px;width:50%;font-size:14px;font-weight:600;line-height:16px}.box>.main_box>.item_two>.top>.sum[data-v-197e7f98]{position:absolute;right:20px;bottom:-2px;font-size:30px;height:30px;width:80px;line-height:30px;text-align:right}.box>.main_box>.item_two>.top>.ge[data-v-197e7f98]{position:absolute;right:0;bottom:0;height:16px;width:16px;line-height:16px;font-size:14px}.box>.main_box>.item_two>.down[data-v-197e7f98]{width:100%;height:50%;position:relative}.box>.main_box>.item_two>.down>.style_line[data-v-197e7f98]{position:absolute;left:50%;top:50%;height:8px;width:100%;transform:translate(-50%,-50%)}.box>.main_box>.item_two>.down>.style_line>.chi[data-v-197e7f98]{position:absolute;right:99%;top:50%;transform:translate(-50%,-50%);height:18px;width:3px;background:url("+i(51)+") 50% no-repeat;background-size:cover;transition:all .5s ease-in}.box>.main_box>.item_two>.down>.style_line>.hui[data-v-197e7f98]{position:absolute;top:0;right:0;height:8px;width:100%;background-color:#123;transition:all .5s ease-in}.box>.main_box>.item_two>.down>.zhong_duan[data-v-197e7f98]{background:url("+i(54)+") 50% no-repeat;background-size:cover}.box>.main_box>.item_two>.down>.cors[data-v-197e7f98]{background:url("+i(52)+") 50% no-repeat;background-size:cover}.box>.main_box>.item_two>.down>.pingtai[data-v-197e7f98]{background:url("+i(53)+") 50% no-repeat;background-size:cover}.box>.main_box>.item_two>.down>.pingtai>.chi[data-v-197e7f98]{right:99%}.box>.main_box>.item_two>.down>.pingtai>.hui[data-v-197e7f98]{width:100%}.box>.main_box>.item_two>.down>.line[data-v-197e7f98]{position:absolute;left:0;bottom:0;height:1px;width:100%;background-color:#123}.box>.main_box>.item_two_last[data-v-197e7f98]{height:26%}",""])},51:function(t,o,i){t.exports=i.p+"imgs/chi.67e1ce3.png"},52:function(t,o,i){t.exports=i.p+"imgs/cors.52315b2.png"},53:function(t,o,i){t.exports=i.p+"imgs/pingtai.215e42f.png"},54:function(t,o,i){t.exports=i.p+"imgs/zhong_duan.842e5bc.png"},55:function(t,o,i){"use strict";var n=function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",{staticClass:"box"},[i("div",{staticClass:"main_box"},[i("div",{staticClass:"item_one"},[i("div",{staticClass:"info"},[t._v("XX 统计总数1")]),t._v(" "),i("div",{staticClass:"sum"},[t._v(t._s(t.top_info_sn_obj.totalTerminalNum))]),t._v(" "),i("div",{staticClass:"ge"},[t._v("个")])]),t._v(" "),i("div",{staticClass:"item_two"},[i("div",{staticClass:"top"},[i("div",{staticClass:"info"},[t._v("XX 统计1")]),t._v(" "),i("div",{staticClass:"sum"},[t._v(t._s(t.top_info_sn_obj.onlineTerminalNum))]),t._v(" "),i("div",{staticClass:"ge"},[t._v("个")])]),t._v(" "),i("div",{staticClass:"down"},[i("div",{staticClass:"style_line zhong_duan"},[i("span",{staticClass:"chi",style:t.top_info_sn_obj.zhongd_chi_json}),t._v(" "),i("span",{staticClass:"hui",style:t.top_info_sn_obj.zhongd_hui_json})]),t._v(" "),i("div",{staticClass:"line"})])]),t._v(" "),i("div",{staticClass:"item_one"},[i("div",{staticClass:"info"},[t._v("XX 统计总数2")]),t._v(" "),i("div",{staticClass:"sum"},[t._v(t._s(t.top_info_sn_obj.stationNum))]),t._v(" "),i("div",{staticClass:"ge"},[t._v("个")])]),t._v(" "),i("div",{staticClass:"item_two"},[i("div",{staticClass:"top"},[i("div",{staticClass:"info"},[t._v("XX 统计2")]),t._v(" "),i("div",{staticClass:"sum"},[t._v(t._s(t.top_info_sn_obj.totalRunstationNum))]),t._v(" "),i("div",{staticClass:"ge"},[t._v("个")])]),t._v(" "),i("div",{staticClass:"down"},[i("div",{staticClass:"style_line cors"},[i("span",{staticClass:"chi",style:t.top_info_sn_obj.cors_chi_json}),t._v(" "),i("span",{staticClass:"hui",style:t.top_info_sn_obj.cors_hui_json})]),t._v(" "),i("div",{staticClass:"line"})])]),t._v(" "),i("div",{staticClass:"item_two item_two_last"},[i("div",{staticClass:"top"},[i("div",{staticClass:"info"},[t._v("AA统计数")]),t._v(" "),i("div",{staticClass:"sum"},[t._v(t._s(t.top_info_sn_obj.platformNum))]),t._v(" "),i("div",{staticClass:"ge"},[t._v("个")])]),t._v(" "),i("div",{staticClass:"down"},[i("div",{staticClass:"style_line pingtai"},[i("span",{staticClass:"chi",style:t.top_info_sn_obj.platformNum_chi_json}),t._v(" "),i("span",{staticClass:"hui",style:t.top_info_sn_obj.platformNum_hui_json})])])])])])},a=[],s={render:n,staticRenderFns:a};o.a=s},56:function(t,o,i){var n=i(50);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(2)("1c735c6d",n,!0,{})}});