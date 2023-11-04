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
                <div class="top-container">
                    <VideoChart />
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script>
import AsideVue from "@/components/AsideVue.vue";
import TabTime from "@/components/TabTime.vue";
import VideoChart from "@/components/KnowledgePageComponents/VideoChart.vue"
export default {
    components: {
        AsideVue,
        TabTime,
        VideoChart,
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
.top-container {
    display: block;
    justify-content: space-between;
}
</style>