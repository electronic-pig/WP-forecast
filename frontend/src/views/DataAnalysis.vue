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
          </el-row>
        </el-header>
        <div class="card-container">
          <div></div>
          <TemperatureCard />
          <div></div>
          <HumidityCard />
          <div></div>
          <PressureCard />
          <div></div>
          <WindspeedCard />
          <div></div>
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
import "@/assets/css/app.css";
import AsideVue from "@/components/AsideVue";
import TabTime from "@/components/TabTime";
import TemperatureCard from '@/components/DataAnalysis/TemperatureCard.vue';
import HumidityCard from "@/components/DataAnalysis/HumidityCard.vue";
import PressureCard from "@/components/DataAnalysis/PressureCard.vue";
import WindspeedCard from "@/components/DataAnalysis/WindspeedCard.vue";
import HistoryChart from "@/components/DataAnalysis/HistoryChart.vue"
import SortTable from "@/components/DataAnalysis/SortTable.vue";
import CompareCard from "@/components/DataAnalysis/CompareCard.vue";
import RecentChart from "@/components/DataAnalysis/RecentChart.vue";
export default {
  name: "DataAnalysis",
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
.main-ctx {
  --el-main-padding: 0px 20px 0px 20px;
  height: 100vh;
  /* 限制高度为视口高度 */
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
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

.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-container {
  margin: 20px 0px 10px 5px;
  display: block;
  height: 450px;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.history-container:hover {
  transform: scale(1.01);
  /* 鼠标悬浮时放大1.01倍 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
}

.sortTable-container {
  margin: 20px 10px 20px 5px;
  display: block;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  flex: 7;
}

.sortTable-container:hover {
  transform: scale(1.01);
  /* 鼠标悬浮时放大1.01倍 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
}

.compareCard-container {
  padding: 10px;
  margin: 20px 0px 20px 10px;
  display: block;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  flex: 3;
}

.compareCard-container:hover {
  transform: scale(1.01);
  /* 鼠标悬浮时放大1.01倍 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
}

.cardTable {
  display: flex;
}

.recent-container {
  padding: 10px;
  margin: 20px 10px 20px 10px;
  display: block;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.recent-container {
  transform: scale(1.01);
  /* 鼠标悬浮时放大1.01倍 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
}
</style>
