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
      </el-header>
      <el-main>
        <div class="card-container">
          <TemperatureCard />
          <HumidityCard />
          <PressureCard />
          <WindspeedCard />
        </div>
        <div class="history-container">
          <HistoryChart />
        </div>
        <div class="cardTable">
          <div class="sortTable-container">
            <SortTable />
          </div>
          <div class="compareCard-container">
            <CompareCard />
          </div>
        </div>
        <div class="recent-container">
          <RecentChart />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
  
<script>
import AsideVue from "@/components/AsideVue.vue";
import TabTime from "@/components/TabTime.vue";
import TemperatureCard from '@/components/DataAnalysisComponents/TemperatureCard.vue';
import HumidityCard from "@/components/DataAnalysisComponents/HumidityCard.vue";
import PressureCard from "@/components/DataAnalysisComponents/PressureCard.vue";
import WindspeedCard from "@/components/DataAnalysisComponents/WindspeedCard.vue";
import HistoryChart from "@/components/DataAnalysisComponents/HistoryChart.vue"
import SortTable from "@/components/DataAnalysisComponents/SortTable.vue";
import CompareCard from "@/components/DataAnalysisComponents/CompareCard.vue";
import RecentChart from "@/components/DataAnalysisComponents/RecentChart.vue";
export default {
  components: {
    AsideVue,
    TabTime,
    TemperatureCard,
    HumidityCard,
    PressureCard,
    WindspeedCard,
    HistoryChart,
    SortTable,
    CompareCard,
    RecentChart
  },
  data() {
    return {
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
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-container {
  margin-top: 10px;
  display: block;
  height: 450px;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.history-container:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.cardTable {
  display: flex;
  margin-top: 10px;
}

.sortTable-container {
  margin-right: 10px;
  display: block;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  flex: 7;
}

.sortTable-container:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.compareCard-container {
  display: block;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  flex: 3;
}

.compareCard-container:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recent-container {
  margin-top: 10px;
}
</style>
