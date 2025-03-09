<template>
  <ul class="card" :style="{ marginTop: showWorkTab ? '0' : '10px' }">
    <li class="console-box-2" v-for="(item, index) in dataList" :key="index">
      <span class="des custom-text subtitle">{{ item.des }}</span>
      <div>
        <span class="number box-title">{{ formatNumber(item.num) }}</span>
        <span class="change" :style="{ color: item.change.indexOf('+') === -1 ? 'red' : '#52c41a' }">
          {{ item.change }}
        </span>
      </div>
      <component :is="item.icon" class="iconfont" :style="{ background: item.color }"></component>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  dataList: Array,
})

const formatNumber = (num) => {
  return num.toLocaleString()
}

</script>

<style scoped lang="less">
.card {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-left: 0;

  li {
    position: relative;
    box-sizing: border-box;
    width: 24%; 
    height: 90px;
    padding: 0 18px;
    background: @art-main-bg-color;
    border-radius: 14px;
    border: 1px solid #dcdfe6;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @icon-size: 46px;

    .iconfont {
      position: absolute;
      top: 0;
      right: 15px;
      bottom: 0;
      width: @icon-size;
      height: @icon-size;
      margin: auto;
      overflow: hidden;
      font-size: 20px;
      line-height: @icon-size;
      color: #fff !important;
      text-align: center;
      background-color: #2c90ff;
      border-radius: 12px;
    }

    .des {
      display: block;
      height: 14px;
      margin-top: 20px;
      font-size: 13px;
      font-weight: 500;
      line-height: 14px;
    }

    > div {
      display: flex;
      align-items: center;

      .number {
        display: block;
        margin-top: 5px;
        font-size: 28px;
        font-weight: 400;
      }

      .change {
        display: block;
        margin: 13px 0 0 10px;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
}
</style>


