<template>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" text-color="black" background-color="rgb(247,246,242)"
    :default-active="activeIndex" active-text-color="#FFFFFF">
    <div class="platform">
      <img class="platform-logo" :src="require('@/assets/image/logo/logo.png')" alt="logo" @click="GoPowerPredict">
      <div v-if="!isCollapse" id="platform-title">
        <a class="platform-title" @click="goShow">风电功率预测</a>
      </div>
    </div>

    <el-divider content-position="center">
      <span v-show="!isCollapse" class="divider-title">功能区</span>
    </el-divider>

    <el-menu-item index="/PowerPredict" @click="GoPowerPredict">
      <el-icon>
        <DataAnalysis />
      </el-icon>
      <template #title>功率预测</template>
    </el-menu-item>

    <el-menu-item index="/WeatherData" @click="GoWeatherData">
      <el-icon>
        <Histogram />
      </el-icon>
      <template #title>气象数据</template>
    </el-menu-item>

    <el-menu-item index="/HistoryList" @click="GoHistoryList">

      <el-icon>
        <Clock />
      </el-icon>

      <template #title>历史数据</template>

    </el-menu-item>
  </el-menu>
</template>

<script>
import {
  GoPowerPredict,
  GoWeatherData,
  GoHistoryList
} from "@/utils/gosomewhere.js";
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: String,
      default: '/PowerPredict'
    }
  },
  methods: {
    GoPowerPredict,
    GoWeatherData,
    GoHistoryList,

    goShow() {
      this.$message.success('欢迎来到本平台')
    }
  },
};
</script>

<style lang="less">
.el-menu {
  position: relative;
  height: 100vh;
  top: 0;
  bottom: 0;
  text-align: center;
  font-family: Microsoft JhengHei UI, sans-serif;

  .el-menu-item {
    padding: 0;
    border-radius: 5px;
    color: var(--theme--color);
    z-index: 1;
    font-size: 16px;
  }

  .el-menu-item:hover {
    background-color: var(--theme--color);
    color: #ecf4ff !important;
  }

  .el-menu-item :hover::after {
    width: 100%;
    background: var(--theme--color);
  }

  .el-menu-item ::after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 5px;
    transition: 0.25s;
    z-index: -1;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 140px;
  min-height: 400px;
}

.is-active {
  background-color: var(--theme--color);
  color: #ecf4ff !important;
}

.platform {
  padding-top: 14px;
  text-align: center;
  color: var(--theme--color);
  height: 80px;
  width: auto;
  overflow: hidden;

  .platform-logo {
    color: var(--theme--color);
    width: 45px;
  }

  .platform-title {
    color: var(--theme--color);
    font-family: Microsoft JhengHei UI, sans-serif;
    font-size: 21px;
  }
}

.divider-title {
  display: block;
  line-height: 24.4px;
  overflow: hidden;
  width: 70px;
  color: rgb(140, 157, 182)
}

#platform-title {
  position: relative;
  font-size: 20px;
  font-weight: 1000;
  cursor: pointer;
}

#platform-title::after {
  content: "";
  width: 0;
  height: 3px;
  background: var(--theme--color);
  position: absolute;
  top: 100%;
  left: 50%;
  right: 50%;
  transition: all 0.5s;
}

#platform-title:hover:after {
  left: 7%;
  right: 7%;
  width: 85%;
}

.el-menu .el-divider__text {
  background-color: rgb(247, 246, 242);
}
</style>
 
 