<template>
  <div class="main_app">
    <!-- 左边区域 -->
    <div class="left">
      <!-- 所有信息 -->
      <div class="all_info">
        <left_all_info></left_all_info>
      </div>
      <!--  基站实时接入统计 -->
      <div class="item jie_ru_info_time">
        <left_cors_run_info></left_cors_run_info>
      </div>

      <!-- 基站信息统计 -->
      <div class="item cors_info">
        <left_cors_data_info></left_cors_data_info>
      </div>
    </div>


    <!-- 右边区域 -->
    <div class="right">
      <!-- 实时终端接入曲线 -->
      <div class="item shi_shi">
        <right_suanfa_user_info></right_suanfa_user_info>
      </div>
      <!--一周 终端接入 -->
      <div class="item yi_zhou">
        <right_oneWeek_user></right_oneWeek_user>
      </div>

      <!-- 服务器信息 -->
      <div class="fu_wuqi" id="fu_wuqi">
        <right_server_state></right_server_state>
      </div>

    </div>


    <!-- 中间区域 -->
    <div class="main">
      <!-- 上 -->
      <div class="top">
        <div class="map_box">
          <div class="title">全国基站分布</div>
          <!-- <iframe width="100%" height="100%" frameborder="0" src="../main_cors_ol/index.html"></iframe> -->
        </div>
      </div>
      <!-- 中间项目 -->
      <div class="mid">
        <!-- 站点状态信息 -->
        <div class="p_box cors_status_info">
          <div class="box">
            <!-- 顶部切换栏 -->
            <div class="top">
              <!-- 标题 -->
              <div class="info">
                站点状态信息
              </div>
            </div>
            <div class='list' id="cors_alarm_box">
            </div>
          </div>
        </div>
        <!-- 服务源统计 -->
        <div class="p_box jie_ru_info">
          <div class="box">
            <!-- 顶部切换栏 -->
            <div class="top">
              <!-- 标题 -->
              <div class="one_info">
                服务源统计
              </div>
            </div>
            <!-- ec -->
            <div class='ec' id="cors_num"></div>
          </div>
        </div>
      </div>
      <!-- 服务质量 -->
      <div class="fuwu_zhiliang">
        <div class="box">
          <!-- 顶部切换栏 -->
          <div class="top">
            <div class="top_box" id="fuwu_zhil_sel">
              <!-- <div class="item_box ac" val="yx">
                <div class="item">数据有效率</div>
              </div>

              <div class="item_box" val="ys">
                <div class="item">接入延时</div>
              </div> -->
            </div>
          </div>
          <!-- ec list -->
          <div class='list' id="hangye_fuwu_list">
            <!-- 1 -->
            <!-- <div class="one">
                <span>G1高速</span>
                <span class="_2">服务延迟</span>
                <span class="_3">6s</span>
                <span class="status_3">C等级</span>
                <span class="status_3">服务报警</span>
              </div> -->
            <!-- 2 -->
            <!-- <div class="one">
                <span>G1高速</span>
                <span class="_2">服务延迟</span>
                <span class="_3">6s</span>
                <span class="status_2">B等级</span>
                <span class="status_2">服务报警</span>
              </div> -->
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import app from './index.js';
export default app;
</script>
<style lang="less">
@import './index.less';
</style>
