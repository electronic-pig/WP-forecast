<template>
  <el-container>
    <el-aside width="auto">
      <AsideVue :is-collapse="isCollapse" :active-index="activeIndex" />
    </el-aside>
    <el-container>
      <el-main class="main-ctx">
        <el-header class="platform-header">
          <el-row align="middle">
            <i class="iconfont icon-caidan" @click="goCollapse" />
            <TabLogin />
          </el-row>
        </el-header>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <el-backtop target=".main-ctx" :bottom="40" :visibility-height="50" :right="27" />
        <!-- 首页内容 -->
        <!-- 标题 -->
        <p class="title">短期预报功率对比</p>
        <!-- 函数图像上部功能区 -->
        <div class="contentArea">
          各种选项……
        </div>
        <!-- 函数图像区域 -->
        <div class="contentArea" style="margin-top: 10px;">
          这里是函数图像……
          <!-- 函数图像demo -->
          <div class="functiondemo"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import "@/assets/css/app.css";
import AsideVue from "@/components/AsideVue";
import TabLogin from "@/components/TabLogin";
// 导入function-plot.js作为函数图像的展示，也可以用其他的，只是看可不可以用这个_暂时有问题
// import functionPlot from"@/utils/function-plot.js"
// import functionPlot from "../node_modules/function-plot/dist/function-plot.js"


export default {
  name: "MainFrame",
  components: {
    AsideVue,
    TabLogin,
  },
  data() {
    return {
      isCollapse: false,
      scrollTop: "",
      activeIndex: this.$route.path,
    };
  },
  mounted() {
    window.onresize = () => {
      this.isCollapse = document.documentElement.clientWidth <= 1100;
    };

    /* 暂时有问题
    window.onload = () =>{
    
      // 画图所用的参数
      let option_plot = {
        // target表名在哪个元素对象中画出函数图像
        target: "#functiondemo",
        // 预定的宽度
        width:1370,
        // 高度设置为200
        height:200,
        // 初始显示的y的范围
        yAxis: { domain: [-1, 1] },
        // 设置初始显示x的范围
        xAxis: { domain: [ 0, 200]},
        // 是否画出网格
        grid: true,
        // 画图所需要的点位数据
        data: [
            {
                // points：为点位数据，点位数据的格式为[[1, 1],[2, 1],[2, 2],[1, 2],[1, 1]]的形式
                points: [[1, 1],[2, 1],[2, 2],[1, 2],[1, 1]],
                // 函数的呈现形式，‘points’代表是以点的形式表达
                fnType: 'points',
                // 图像的表达形式，‘scatter’为散点图，‘polyline’为折线图
                graphType: 'polyline'
            }
        ]
      }
    functionPlot(option_plot)
  
  }
  */
    document.body.style.overflow = "hidden";
  },
  updated() {
    this.activeIndex = this.$route.path
  },
  methods: {
    goCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  }
};
</script>

<style scoped>
.el-main {
  --el-main-padding: 0px 20px 0 20px;
  height: auto;
  width: 100%;
  overflow-x: hidden;
}

.main-ctx {
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.platform-header {
  left: -20px;
  width: 105%;
}

.title{
  font-size: 16px;
  font-weight: bold;
}

/* 函数图像上部功能区样式 */
.contentArea{
  border: 2px solid #6593cf;
  padding: 10px;
}
</style>