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
                <BaiduMap />
                <DataCard style="margin-top: 10px;" />
                <div class="chart-container">
                    <PredictChart style="flex: 7;margin-right: 10px;" />
                    <PWChange style="flex: 3;" />
                </div>
                <div class="frame-container">
                    <iframe src="https://globalwindatlas.info/zh/area/China/Sichuan" width="100%" height="800px"></iframe>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script>
import AsideVue from "@/components/AsideVue.vue";
import TabTime from "@/components/TabTime.vue";
import BaiduMap from "@/components/MapPredictComponents/BaiduMap.vue"
import DataCard from "@/components/MapPredictComponents/DataCard.vue";
import PredictChart from "@/components/MapPredictComponents/PredictChart.vue"
import PWChange from "@/components/MapPredictComponents/PWChange.vue";
export default {
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
.chart-container {
    display: flex;
    margin-top: 10px;
}

.frame-container {
    padding: 1%;
    margin-top: 10px;
    border: 2px solid var(--theme--color);
    border-radius: 15px;
}
</style>