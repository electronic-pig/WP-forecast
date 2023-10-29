<template>
  <el-menu id="aside-menu" :collapse="isCollapse" background-color="rgb(247,246,242)" :default-active="activeIndex">
    <div class="platform">
      <router-link to="/">
        <img class="platform-logo" src="@/assets/image/logo/logo.gif" alt="logo">
      </router-link>
      <div v-if="!isCollapse" class="platform-title">
        <a @click="goShow">风电功率预测</a>
      </div>
    </div>

    <el-divider>
      <span class="divider-title" v-show="!isCollapse">功能区</span>
    </el-divider>

    <el-menu-item class="el-menu-item" index="/PowerPredict" @click="showLoading('PowerPredict')">
      <el-icon v-show="isCollapse">
        <DataAnalysis />
      </el-icon>
      <template #title><span class="title"><el-icon>
            <DataAnalysis />
          </el-icon>功率预测</span></template>
    </el-menu-item>

    <el-menu-item class="el-menu-item" index="/DataAnalysis" @click="showLoading('DataAnalysis')">
      <el-icon v-show="isCollapse">
        <Histogram />
      </el-icon>
      <template #title><span class="title"><el-icon>
            <Histogram />
          </el-icon>数据分析</span></template>
    </el-menu-item>

    <el-menu-item class="el-menu-item" index="/MapPredict" @click="showLoading('MapPredict')">
      <el-icon v-show="isCollapse">
        <MapLocation />
      </el-icon>
      <template #title><span class="title"><el-icon>
            <MapLocation />
          </el-icon>定点预测</span></template>
    </el-menu-item>

    <el-menu-item class="el-menu-item" index="/TurbineManage" @click="showLoading('TurbineManage')">
      <el-icon v-show="isCollapse">
        <SetUp />
      </el-icon>
      <template #title><span class="title"><el-icon>
            <SetUp />
          </el-icon>风机管理</span></template>
    </el-menu-item>

    <el-menu-item class="el-menu-item" index="/IndustryTrending" @click="showLoading('IndustryTrending')">
      <el-icon v-show="isCollapse">
        <TrendCharts />
      </el-icon>
      <template #title><span class="title"><el-icon>
            <TrendCharts />
          </el-icon>行业动态</span></template>
    </el-menu-item>

    <el-menu-item class="el-menu-item" index="/KnowledgePage" @click="showLoading('KnowledgePage')">
      <el-icon v-show="isCollapse">
        <Film />
      </el-icon>
      <template #title><span class="title"><el-icon>
            <Film />
          </el-icon>风电科普</span></template>
    </el-menu-item>

    <el-divider content-position="center" style="margin-top: 30px;">
      <span class="divider-title" v-show="!isCollapse">友情链接</span>
    </el-divider>

    <p style="margin-top: 40px;"><a href="https://www.in-en.com/" target="_blank" class="link-title"
        v-show="!isCollapse">国际能源网</a></p>
    <p><a href="https://www.ceic.com/" target="_blank" class="link-title" v-show="!isCollapse">国家能源集团</a><br></p>
    <p><a href="https://wind.in-en.com/" target="_blank" class="link-title" v-show="!isCollapse">国际风力发电网</a></p>
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
    },
    showLoading(page) {
      const loadingInstance = this.$loading({
        target: document.querySelector('.el-menu-item[index="/' + page + '"]'),
        text: '努力加载中...',
      });
      setTimeout(() => {
        loadingInstance.close();
        this.$router.push(page);
      }, 1000);
    }
  },
};
</script>

<style scoped>
.el-menu-item {
  border-radius: 5px;
  color: var(--theme--color);
  z-index: 1;
  font-size: 16px;
}

.el-menu-item:hover {
  background-color: var(--theme--color);
  color: #ecf4ff;
}

.el-menu-item.is-active {
  background-color: var(--theme--color);
  color: #ecf4ff !important;
}

.platform {
  padding: 10px 0;
  color: var(--theme--color);
  height: 80px;
}

.platform-logo {
  width: 60px;
}

.platform-title {
  position: relative;
  font-weight: 1000;
  font-family: Microsoft JhengHei UI, sans-serif;
  font-size: 22px;
  cursor: pointer;
  color: var(--theme--color);
}

.platform-title::after {
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

.platform-title:hover:after {
  left: 8%;
  right: 8%;
  width: 85%;
}

.divider-title {
  display: block;
  line-height: 24px;
  overflow: hidden;
  width: 4em;
  color: rgb(140, 157, 182);
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.link-title {
  color: rgb(140, 157, 182);
  text-decoration: none;
}

.link-title:hover {
  color: var(--theme--color);
  text-decoration: none;
  cursor: pointer;
}
</style>
 
 