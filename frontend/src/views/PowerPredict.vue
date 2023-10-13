<template>
  <el-container>
    <el-aside width="auto">
      <AsideVue :is-collapse="isCollapse" :active-index="activeIndex" />
    </el-aside>
    <el-container>
      <el-main class="main-ctx">
        <el-header class="platform-header">
          <el-row align="middle" style="margin-top: 5px;">
            <el-icon class="collapse" v-if="!isCollapse" :size="35">
              <Fold @click="goCollapse" />
            </el-icon>
            <el-icon class="collapse" v-if="isCollapse" :size="35">
              <Expand @click="goCollapse" />
            </el-icon>
            <TabTime />
            <el-select v-model="selectedWindTurbine" placeholder="请选择风机" class="custom-dropdown">
              <el-option v-for="turbine in windTurbines" :key="turbine" :label="turbine" :value="turbine"></el-option>
            </el-select>
          </el-row>
        </el-header>
        <div class="container">
          <div class="chart-container">
            <TemperatureChart />
          </div>
          <div class="windmill-container">
            <BackgroundWindmill />
          </div>
          <div class="wind-speed_container">
            <WindSpeedChart />
          </div>
        </div>
        <div class="bottom-container">
          <PowerChart class="bottom-left-container"/>
          <PowerChart class="bottom-right-container"/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import "@/assets/css/app.css";
import AsideVue from "@/components/AsideVue";
import TabTime from "@/components/TabTime";
import BackgroundWindmill from "@/components/PowerPredictComponents/BackgroundWindmill";
import TemperatureChart from "@/components/PowerPredictComponents/TemperatureChart"
import WindSpeedChart from "@/components/PowerPredictComponents/WindSpeedChart";
import PowerChart from "@/components/PowerPredictComponents/PowerChart";

export default {
  name: "PowerPredict",
  components: {
    AsideVue,
    TabTime,
    BackgroundWindmill,
    TemperatureChart,
    WindSpeedChart,
    PowerChart
  },
  data() {
    return {
      windTurbines: ['风机01', '风机02', '风机03', '风机04', '风机05', '风机06', '风机07', '风机08', '风机09', '风机10'],
      selectedWindTurbine: '风机01',  // 默认选中风机01
      isCollapse: false,
      activeIndex: this.$route.path,
    };
  },
  mounted() {
    window.onresize = () => {
      this.isCollapse = document.documentElement.clientWidth <= 1100;
    };
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
.main-ctx {
  --el-main-padding: 0px 20px 0px 20px;
  height: auto;
  width: 100%;
  overflow-x: hidden;
}

.platform-header {
  left: -20px;
  width: 105%;
}

.collapse {
  margin-right: 30px;
}

.collapse:hover {
  color: var(--theme--color);
  cursor: pointer;
}

.container {
  margin: auto 5px;
  display: flex;
  justify-content: space-between;
}

.custom-dropdown {
  margin-left: auto;
  margin-right: 40px;
}

.bottom-container {
  margin: 20px 0;
  display: flex;
  height: 360px;
  justify-content: space-between;
}

.bottom-left-container {
  margin-left: 5px;
  margin-right: 10px;
}
.bottom-right-container {
  margin-left: 10px;
}
</style>