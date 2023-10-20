<template>
    <el-container>
        <el-aside class="el-aside" width="auto">
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

        </el-main>
    </el-container>
</template>
  
<script>
import "@/assets/css/app.css";
import AsideVue from "@/components/AsideVue";
import TabTime from "@/components/TabTime";


export default {
    name: "PowerPredict",
    components: {
        AsideVue,
        TabTime,
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
</style>