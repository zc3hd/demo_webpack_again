<template>
  <div class="main_app">
    <!-- 左边区域 -->
    <div class="left">
      <!-- 所有信息 -->
      <div class="all_info">
        <img src="./img/6.gif" alt="" @click='conf.cpt_normol_show=true'>
      </div>

    </div>
    <!-- 右边区域 -->
    <div class="right">
      <!-- 实时终端接入曲线 -->
      <div class="item shi_shi" v-if="conf.cpt_normol_show">
        <cpt_normol></cpt_normol>
      </div>
    </div>



    <!-- 中间区域 -->
    <div class="main">
      <div class="main_box">
        <div class="ele_cpt">
          <!-- <mid_ele_cpt></mid_ele_cpt> -->
        </div>
        <div class="main_cpt">
          <cpt_JSimg></cpt_JSimg>
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
