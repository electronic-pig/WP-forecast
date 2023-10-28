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
            <!-- <div class="select-menu"> -->
                <el-menu :default-active="currentFanId" mode="horizontal" :ellipsis="false" @select="handleMenuClick">
                    <el-menu-item index="add">新增风机</el-menu-item>
                    <el-menu-item v-for="fan in fans" :key="fan.id" :index="fan.id">
                        {{ fan.name }}
                    </el-menu-item>
                </el-menu>
            <!-- </div> -->
            <!-- <AlarmTable :id="currentFanId" />
            <HistoryDataTable :id="currentFanId" /> -->
        </el-main>
    </el-container>
</template>
  
<script>
import "@/assets/css/app.css";
import AsideVue from "@/components/AsideVue";
import TabTime from "@/components/TabTime";
// import AlarmTable from "@/components/TurbineManage/AlarmTable"
// import HistoryDataTable from "@/components/TurbineManage/HistoryDataTable"
export default {
    name: "PowerPredict",
    components: {
        AsideVue,
        TabTime,
        // AlarmTable,
        // HistoryDataTable
    },
    data() {
        return {
            isCollapse: false,
            activeIndex: this.$route.path,
            currentFanId: "1",
            fans: [
                { id: 1, name: '风机1' },
                { id: 2, name: '风机2' },
                { id: 3, name: '风机3' },
                { id: 4, name: '风机4' },
                { id: 5, name: '风机5' },
                { id: 6, name: '风机6' },
            ]
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
        handleMenuClick(index) {
            if (index === 'add') {
                this.showAddForm = true;
            } else {
                this.currentFanId = index;
            }
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
.select-menu{
    width: 30px;
    height: 100%;
}
.collapse:hover {
    color: var(--theme--color);
    cursor: pointer;
}
</style>