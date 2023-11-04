<template>
  <el-container>
    <el-aside width="auto">
      <AsideVue :is-collapse="isCollapse" :active-index="activeIndex" />
    </el-aside>
    <el-container>
      <el-header>
        <el-icon class="collapse" v-if="!isCollapse" :size="35">
          <Fold @click="goCollapse" />
        </el-icon>
        <el-icon class="collapse" v-if="isCollapse" :size="35">
          <Expand @click="goCollapse" />
        </el-icon>
        <TabTime />
        <el-select v-model="selectedWindTurbine" class="select">
          <el-option v-for="turbine in windTurbines" :key="turbine" :label="turbine" :value="turbine"></el-option>
        </el-select>
      </el-header>
      <el-main>
        <div class="top-container">
          <TemperatureChart />
          <BackgroundWindmill />
          <WindSpeedChart />
        </div>
        <div class="middle-container">
          <PowerChart style="margin-right: 10px;" :selectedWindTurbine="selectedWindTurbine" />
          <LoadChart :selectedWindTurbine="selectedWindTurbine" />
        </div>
        <div class="bottom-container">
          <CompareChart :selectedWindTurbine="selectedWindTurbine" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template> 

<script>
import AsideVue from "@/components/AsideVue.vue";
import TabTime from "@/components/TabTime.vue";
import BackgroundWindmill from "@/components/PowerPredictComponents/BackgroundWindmill.vue";
import TemperatureChart from "@/components/PowerPredictComponents/TemperatureChart.vue"
import WindSpeedChart from "@/components/PowerPredictComponents/WindSpeedChart.vue";
import PowerChart from "@/components/PowerPredictComponents/PowerChart.vue";
import LoadChart from "@/components/PowerPredictComponents/LoadChart.vue";
import CompareChart from "@/components/PowerPredictComponents/CompareChart.vue";

export default {
  components: {
    AsideVue,
    TabTime,
    BackgroundWindmill,
    TemperatureChart,
    WindSpeedChart,
    PowerChart,
    LoadChart,
    CompareChart,
  },
  data() {
    return {
      windTurbines: ['风机1', '风机2', '风机3', '风机4', '风机5', '风机6', '风机7', '风机8', '风机9', '风机10'],
      selectedWindTurbine: '风机1',  // 默认选中风机01
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
.select {
  margin-left: auto;
  margin-right: 10px;
}

.top-container {
  display: flex;
  justify-content: space-between;
}

.middle-container {
  margin: 20px 0;
  display: flex;
  height: 360px;
  justify-content: space-between;
}

.bottom-container {
  margin-top: 20px;
  display: block;
  height: 450px;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.bottom-container:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>