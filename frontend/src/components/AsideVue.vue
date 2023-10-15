<template>
  <el-menu class="el-menu-vertical" :collapse="isCollapse" background-color="rgb(247,246,242)"
    :default-active="activeIndex">
    <div class="platform">
      <router-link to="/PowerPredict">
        <img class="platform-logo" :src="require('@/assets/image/logo/logo.gif')" alt="logo">
      </router-link>
      <div v-if="!isCollapse" id="platform-title">
        <a class="platform-title" @click="goShow">风电功率预测</a>
      </div>
    </div>

    <el-divider content-position="center">
      <span class="divider-title" v-show="!isCollapse">功能区</span>
    </el-divider>

    <router-link to="/PowerPredict" style="text-decoration: none;">
      <el-menu-item class="el-menu-item" index="/PowerPredict">
        <el-icon>
          <DataAnalysis />
        </el-icon>
        <template #title>功率预测</template>
      </el-menu-item>
    </router-link>

    <router-link to="/DataAnalysis" style="text-decoration: none;">
      <el-menu-item class="el-menu-item" index="/DataAnalysis">
        <el-icon>
          <Histogram />
        </el-icon>
        <template #title>数据分析</template>
      </el-menu-item>
    </router-link>

    <router-link to="/IndustryTrending" style="text-decoration: none;">
      <el-menu-item class="el-menu-item" index="/IndustryTrending">
        <el-icon>
          <TrendCharts />
        </el-icon>
        <template #title>行业动态</template>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
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
    goShow() {
      this.$message.success('欢迎来到本平台')
    }
  },
};
</script>

<style lang="less">
.el-menu-vertical {
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

.el-menu-vertical:not(.el-menu--collapse) {
  width: 140px;
  min-height: 400px;
}

.el-menu-vertical .el-divider__text {
  background-color: rgb(247, 246, 242);
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
</style>
 
 