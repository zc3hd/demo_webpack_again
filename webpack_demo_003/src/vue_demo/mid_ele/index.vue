<template>
  <div class="mid_ele">
  	<div class="ipt">
  		<el-date-picker v-model="conf.str" type="date" placeholder="sel date"></el-date-picker>
  	</div>
  </div>
</template>
<script>
import js from './index.js';
export default js;
</script>
<style lang="less" scoped>
@import './index.less';
</style>
