
// console.log(a_obj.A);
require.ensure([], function(require) {
  var a = require('./a.js');
  console.log(a);
}, 'a');



import Test from './test_data.js';

// 模拟的行业数据
var hangye_data = Test.hangye_data;


// 接入统计
var cors_sum_data = Test.cors_sum_data;
var fuwu_gl_data = Test.fuwu_gl_data;
var fuwu_nh_data = Test.fuwu_nh_data;
var fuwu_hy_data = Test.fuwu_hy_data;
var fuwu_data = Test.fuwu_data;

var cors_fuwu_data = Test.cors_fuwu_data;

// zuo左边
const left_all_info = resolve => require([
  '../left_1_all_info/index.vue'
], resolve);

// import left_all_info from '../left_1_all_info/index.vue';
import left_cors_run_info from '../left_2_cors_run_info/index.vue';
import left_cors_data_info from '../left_3_cors_data_info/index.vue';


// right
import right_suanfa_user_info from '../right_1_suanfa_user/index.vue';
import right_oneWeek_user from '../right_2_oneWeek_user/index.vue';
import right_server_state from '../right_3_server_state/index.vue';

export default {
  components: {
    left_all_info: left_all_info,
    left_cors_run_info: left_cors_run_info,
    left_cors_data_info: left_cors_data_info,

    right_suanfa_user_info: right_suanfa_user_info,
    right_oneWeek_user: right_oneWeek_user,
    right_server_state: right_server_state,
  },
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {


        // ===========================================middle
        // =============================
        // 服务质量刷新时间
        hangye_fuwu_time: 3000,
        // 服务质量数据限制
        hangye_fuwu_limit: 20,

        // =============================
        // 基站报警信息列表
        cors_alarm_time: 3000,
        // 数据的界限
        cors_alarm_limit: 50,


        // =============================
        // 数据源--基站接入数据刷新时间
        cors_num_time: 60000,

        // 点击事件只加载一次
        cors_num_ev_key: true,






        // ===========================================right

        // =============================
        // 服务器状态
        server_time: 1000,
        // 3秒一个轮播
        server_inter_time: 3000,

        // 饼图的颜色
        server_pie_item_colors: [
          //
          {
            val: "#00DAAC",
            key: '正常',
          },
          //
          {
            val: "rgb(255,168,0)",
            key: '预警',
          },
          //
          {
            val: "red",
            key: '报警',
          },
        ],

      },


      // 报警信息的数组
      info_arr: [],
      info_key: true,
      // 时间的载体
      info_time: {
        date: null,
        h: null,
        m: null,
        s: null,
        obj: null,
        str: '',
      },


      // api
      api: {
        // 行业下拉选
        sel_hy: {
          url: '/product/type/findFirstForSelect.do',
        },


        // ==============================left
        // 顶部实时信息
        top_info: {
          url: '/home/findSummary.do',
        },


        //基站数据有效率
        allLossData: {
          url: '/multipath/findAllLossData.do'
        },
        //基站数据延迟
        allDelay: {
          url: '/obs/analay/findAllDelay.do'
        },










        // ===============================middle
        //行业服务实时质量
        hy_fw_zhiliang: {
          url: '/module/alert/findOne.do',
        },


        // 基站报警日志
        alarm: {
          url: '/station/alert/findOne.do',
        },
        //基站接入统计
        stationNumStat: {
          url: '/station/findStationNumStat.do'
        },




        // ==============================right--done
        //
        sn_time: {
          url: '/userinfo/findUserNumByType.do',
        },
        //一周终端统计
        hy_sn_week: {
          url: '/user/info/stat/find7DaysByProductType.do',
        },

        //服务器状态
        serverStat: {
          url: '/server/findServerStat.do'
        },
      },


    }
  },
  mounted: function() {
    var me = this;


    me._pre_sel_hy(function() {

      me.cc_init();

      // 响应
      me._resize();
    });
  },
  methods: {
    // 加载行业的分类
    _pre_sel_hy: function(cb) {
      var me = this;
      // console.log(me);

      var str = '';
      hangye_data.forEach(function(ele, index) {
        if (index == 0) {
          str += `
                  <div class="item_box ac" val="${ele.id}" style='width:${100/hangye_data.length}%;'>
                    <div class="item">${ele.name}</div>
                  </div>`;
        }
        //
        else {
          str += `
                  <div class="item_box" val="${ele.id}" style='width:${100/hangye_data.length}%;'>
                    <div class="item">${ele.name}</div>
                  </div>`;
        }

      });

      $('#fuwu_zhil_sel').html(str);


      cb && cb();
    },
    //
    cc_init: function() {
      var me = this;
      // ========================================left





      // ========================================right








      // ========================================middle
      // 各行业的服务质量的实时体
      me.hangye_fuwu_obj = {
        // 点击的关键字
        key: null,
      };
      // 行业的服务质量
      me._hangye_fuwu_sel();


      // 基站报警实时
      me.cors_alarm_obj = {
        time: '',
      };
      me._cors_alarm_init();


      // 全国服务源源--基站数据柱状图
      me.source_cors_obj = {
        ec: echarts.init(document.getElementById('cors_num')),
        // 颜色
        color: ['#766AFF', '#f55980', '#8b63d6'],
      };
      me._source_cors_init();
    },




    // ===============================================





    // ================================================
    // 全国数据源--基站数据柱状图
    _source_cors_init: function() {
      var me = this;
      FN.ajax(me.api.stationNumStat)
        .done(function(data) {
          if (data.ret == 0) {
            cors_sum_data = data.data;
            // cors_sum_data = cors_sum_data;


            me.source_cors_obj.ec.setOption({
              color: me.source_cors_obj.color,
              tooltip: {
                trigger: 'axis'
              },
              grid: {
                left: '2px',
                right: '5px',
                top: '15px',
                bottom: "8px",
                containLabel: true
              },
              xAxis: {
                type: 'category',
                splitLine: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: "#000"
                  }
                },
                data: cors_sum_data.key,
              },
              dataZoom: [{
                type: 'inside'
              }],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              yAxis: {
                type: 'value',
                splitLine: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: "#000"
                  }
                }
              },
              series: {
                type: 'bar',
                // 文字
                label: {
                  show: true,
                  position: 'top',
                },
                data: cors_sum_data.val
              }
            });

            // 点击事件
            if (me.conf.cors_num_ev_key) {
              me.conf.cors_num_ev_key = false;
              var zoomSize = 6;
              me.source_cors_obj.ec.on('click', function(params) {
                me.source_cors_obj.ec.dispatchAction({
                  type: 'dataZoom',
                  startValue: cors_sum_data.key[Math.max(params.dataIndex - zoomSize / 2, 0)],
                  endValue: cors_sum_data.key[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                });


              });
            }


            setTimeout(function() {
              // **************************************模拟数据
              // cors_sum_data.val.forEach(function(ele, index) {
              //   cors_sum_data.val[index] = Math.floor(Math.random() * 500);

              //   // console.log(ele);
              // });
              // **********************************************
              me._source_cors_init();
            }, me.conf.cors_num_time);

          }
        })
    },


    // ================================================
    // 行业服务质量实时体
    _hangye_fuwu_sel: function() {
      var me = this;

      // 选择事件
      var key = null;
      $('#fuwu_zhil_sel')
        .on('click', '.item_box', function(e) {
          key = $(e.currentTarget).hasClass('ac');
          if (key) {
            return;
          }
          $('#fuwu_zhil_sel>.item_box').removeClass('ac');
          $(e.currentTarget).addClass('ac');

          // 找到ID
          me.hangye_fuwu_obj.key = $('#fuwu_zhil_sel>.ac').attr("val");

          // 初始化
          $('#hangye_fuwu_list').html('');

        });


      // 记录ID--进行第一次选择
      me.hangye_fuwu_obj.key = $('#fuwu_zhil_sel>.ac').attr("val");
      me._hangye_fuwu_init();

    },
    // 行业服务质量的初始化
    _hangye_fuwu_init: function() {
      var me = this;
      // 选择数据

      me.api.hy_fw_zhiliang.data = {
        str: me.hangye_fuwu_obj.key,
      }
      FN.ajax(me.api.hy_fw_zhiliang)
        .done(function(data) {
          // console.log(data);
          if (data.ret == 0) {
            // 存在数据
            if (data.data != '') {

              fuwu_data = data.data;
              // 添加数据
              $('#hangye_fuwu_list').prepend(`
                    <div class="one">
                      <span class="item item_20">
                        <span class="name">名称：</span>
                        <span class="name_str">${fuwu_data.name}</span>
                      </span>
                      <span class="item item_30">
                        <span class="name">细分服务：</span>
                        <span class="name_str">${fuwu_data.fuwu}</span>
                      </span>
                      <span class="item item_25">
                        <span class="name">服务基准分：</span>
                        <span class="name_str">${fuwu_data.limit}</span>
                      </span>
                      <span class="item item_25">
                        <span class="name">当前分数：</span>
                        <span class="name_str sp">
                          ${fuwu_data.fenshu}
                          <span class="key ${(fuwu_data.fenshu>=fuwu_data.limit?'up':'down')}"></span>
                        </span>
                      </span>
                    </div>
                    `);

              // 减少数据
              if ($('#hangye_fuwu_list>.one').length >= me.conf.hangye_fuwu_limit) {
                $('#hangye_fuwu_list>.one').last().remove();
              }
              $('#hangye_fuwu_list').niceScroll({
                cursorcolor: '#ccc',
                // autohidemode: false,
                cursorborder: '1px solid #ccc'
              });

            }


          }

          setTimeout(function() {
            // *********************************************模拟改变
            // fuwu_data.fenshu = Math.floor(Math.random() * 100);
            // *****************************************************

            me._hangye_fuwu_init();
          }, me.conf.hangye_fuwu_time);
        })
    },



    // ================================================
    // 一周行业终端数
    // 初始化数据
    _hangye_sn_init: function() {
      var me = this;

      // me.api.hy_sn_week.data = { type: 1 };
      FN.ajax(me.api.hy_sn_week)
        .done(function(data) {
          if (data.ret == 0) {
            // console.log(data);
            one_week_data = data.data;

            // 数据处理
            var series = [];
            one_week_data.val.forEach(function(ele, index) {
              series.push({
                name: me.hangye_sn_obj.legend[index],
                type: 'line',
                // 文字
                label: {
                  show: true,
                  position: 'top',
                },
                data: ele,
                lineStyle: {
                  width: 3,
                },
              });
            });


            me.hangye_sn_obj.ec.setOption({
              color: me.hangye_sn_obj.color,
              tooltip: {
                trigger: 'axis'
              },
              grid: {
                left: '2px',
                right: '5px',
                top: '15px',
                bottom: "8px",
                containLabel: true
              },
              xAxis: {
                type: 'category',
                splitLine: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: "#000"
                  }
                },
                data: one_week_data.key,
              },
              legend: {
                type: 'plain',
                data: me.hangye_sn_obj.legend,
                textStyle: {
                  color: "#000",
                  fontSize: 10
                },
                orient: 'horizontal',
                top: 5,
                right: 10,
                padding: 0,
                itemHeight: 5,
              },
              dataZoom: [{
                type: 'inside'
              }],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              yAxis: {
                type: 'value',
                minInterval: 1,
                boundaryGap: [0, 0.01],
                splitLine: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: "#000"
                  }
                }
              },
              series: series
            });
          }
        })
    },

    // ==============================================
    // 小导航切换
    _nav_resize: function() {
      var me = this;
      var step = FN.dom_width('._nav_one') - FN.dom_width('._nav_one>.main') - 3;
      $('._nav_one>.main>.left_r')
        .css('border-width', `0px 0px ${FN.dom_height('._nav_one>.main')}px ${step}px`)
        .css('left', `-${step-1}px`);
      $('._nav_one>.main>.right_r')
        .css('border-width', `${FN.dom_height('._nav_one>.main')}px ${step}px 0px 0px`)
        .css('right', `-${step-1}px`);
    },
    // 表格的自动适应
    _resize: function(argument) {
      var me = this;
      // 小导航自适应
      me._nav_resize();

      $(window).on('resize', function(argument) {
        // 小选择
        me._nav_resize();

        // 设备终端实时
        me.sn_obj.ec.resize();
        // 一周行业接入终端数
        me.hangye_sn_obj.ec.resize();


        // 数据源基站接入统计
        me.source_cors_obj.ec.resize();
        // 基站状态信息实时
        me.cors_status_obj.ec.resize();


        // 顶部的EC体
        me.top_info_sn_obj.ec.resize();

        // 服务器状态适应
        for (var box = 0; box < $('#server_box>.pie_box').length; box++) {
          echarts.init(document.getElementById('pie_' + box)).resize();
        }
      });
    },


    // ==============================================


    // ===========================================
    // 滚动日志
    _cors_alarm_init: function(argument) {
      var me = this;
      FN.ajax(me.api.alarm)
        .done(function(data) {
          // 有数据的时候
          if (data.data != '') {
            cors_fuwu_data = data.data;
            // 从前面加数据
            $('#cors_alarm_box').prepend(`
                  <div class="one">
                    <span class="item">
                      <span class="name">站名：</span>
                      <span class="name_str">${cors_fuwu_data.stationName}</span>
                    </span>

                    <span class="item item_20">
                      <span class="name"></span>
                      <span class="name_str ${cors_fuwu_data.status==0?'OFF':'ON'}">${cors_fuwu_data.status==0?'OFF':'ON'}</span>
                    </span>

                    <span class="item item_40">
                      <span class="name">时间：</span>
                      <span class="name_str">
                        ${FN.formatterDateDay(cors_fuwu_data.time,true)?FN.formatterDateDay(cors_fuwu_data.time,true):'/'}
                      </span>
                    </span>

                  </div>
                  `);

            //

            //                 <span class="item">
            //   <span class="name">状态：</span>
            //   <span class="name_str">${cors_fuwu_data.info}</span>
            // </span>


          }

          if ($('#cors_alarm_box .one').length >= me.conf.cors_alarm_limit) {
            $('#cors_alarm_box .one').last().remove();
          }

          //
          $('#cors_alarm_box').niceScroll({
            cursorcolor: '#ccc',
            // autohidemode: false,
            cursorborder: '1px solid #ccc'
          });

          setTimeout(function(argument) {


            // *********************************************模拟改变

            // if (Math.random() > 0.5) {
            //   cors_fuwu_data.info = "离线";
            //   cors_fuwu_data.status = "OFF";
            //   cors_fuwu_data.time = cors_fuwu_data.time + Math.floor(1000000000000 * Math.random());
            // } else {
            //   cors_fuwu_data.info = "在线";
            //   cors_fuwu_data.status = "ON";
            //   cors_fuwu_data.time = cors_fuwu_data.time - Math.floor(1000000000000 * Math.random());
            // }
            // *****************************************************




            me._cors_alarm_init();
          }, me.conf.cors_alarm_time)
        })
    },
  },
}
