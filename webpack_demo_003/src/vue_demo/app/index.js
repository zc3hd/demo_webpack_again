// ==================================================
// zuo左边
// const left_all_info = resolve => require([
//   '../left_1_all_info/index.vue'
// ], resolve);

// const left_cors_run_info = resolve => require([
//   '../left_2_cors_run_info/index.vue'
// ], resolve);

// const left_cors_data_info = resolve => require([
//   '../left_3_cors_data_info/index.vue'
// ], resolve);


// ==================================================
// mid
const mid_main_cpt = resolve => require([
  '../mid_main/index.vue'
], resolve);

const mid_ele_cpt = resolve => require([
  '../mid_ele/index.vue'
], resolve);


// ==================================================
// right
// const right_suanfa_user_info = resolve => require([
//   '../right_1_suanfa_user/index.vue'
// ], resolve);

// const right_oneWeek_user = resolve => require([
//   '../right_2_oneWeek_user/index.vue'
// ], resolve);

// const right_server_state = resolve => require([
//   '../right_3_server_state/index.vue'
// ], resolve);






export default {
  components: {
    // left_all_info: left_all_info,
    // left_cors_run_info: left_cors_run_info,
    // left_cors_data_info: left_cors_data_info,

    // mid_main_cpt:mid_main_cpt,
    mid_ele_cpt:mid_ele_cpt,

    // right_suanfa_user_info: right_suanfa_user_info,
    // right_oneWeek_user: right_oneWeek_user,
    // right_server_state: right_server_state,
  },
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {
      },
      // api
      api: {},


    }
  },
  mounted: function() {
    var me = this;


    me.cc_init();

    // 响应
    me._resize();
  },
  methods: {
    //
    cc_init: function() {},



    // 表格的自动适应
    _resize: function(argument) {
      var me = this;

      $(window).on('resize', function(argument) {


        echarts.init(document.getElementById('top_info_sn')).resize();
        echarts.init(document.getElementById('cors_status')).resize();


        echarts.init(document.getElementById('sn')).resize();
        echarts.init(document.getElementById('weekNum')).resize();
        // 服务器状态适应
        for (var box = 0; box < $('#server_box>.pie_box').length; box++) {
          echarts.init(document.getElementById('pie_' + box)).resize();
        }


        echarts.init(document.getElementById('earth')).resize();

      });
    },
  },
}
