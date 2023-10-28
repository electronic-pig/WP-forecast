<template>
    <el-container>
        <el-aside width="auto">
            <AsideVue :is-collapse="isCollapse" :active-index="activeIndex" />
        </el-aside>
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
            <div class="map-container">
                <BaiduMap />
            </div>
            <div class="card-container">
                <DataCard />
            </div>
            <div class="chart-container">
                <div class="left-chart">
                    <PredictChart />
                </div>
                <div class="right-chart">
                    <PWChange />
                </div>
            </div>
            <div class="frame-container">
                <iframe src="https://globalwindatlas.info/zh/area/China/Sichuan" width="100%" height="800px"></iframe>
            </div>
        </el-main>
    </el-container>
</template>
  
<script>
import AsideVue from "@/components/AsideVue";
import TabTime from "@/components/TabTime";
import BaiduMap from "@/components/MapPredict/BaiduMap"
import DataCard from "@/components/MapPredict/DataCard";
import PredictChart from "@/components/MapPredict/PredictChart"
import PWChange from "@/components/MapPredict/PWChange";
export default {
    name: "MapPredict",
    components: {
        AsideVue,
        TabTime,
        BaiduMap,
        DataCard,
        PredictChart,
        PWChange
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
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.platform-header {
    left: -20px;
    width: 105%;
}

.map-container {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 1%;
    justify-content: center;
}

.card-container {
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
    justify-content: center;
}

.chart-container {
    display: flex;
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.left-chart {
    flex: 7;
    margin-right: 10px;
}

.right-chart {
    flex: 3;
    margin-left: 10px;
}

.frame-container {
    padding: 1%;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 40px;
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.collapse {
    margin-right: 30px;
}

.collapse:hover {
    color: var(--theme--color);
    cursor: pointer;
}</style>