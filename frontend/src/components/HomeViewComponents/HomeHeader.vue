<template>
    <el-row type="flex" justify="center" style="color: rgb(75, 124, 189);" class="animate">
        <el-col :span="3"><span class="subtitle" @click="routerToPowerPredict">功率预测</span></el-col>
        <el-col :span="5"><span class="subtitle" @click="routerToDataAnalysis">数据分析</span></el-col>
        <el-col :span="2"><img class="logo" src="@/assets/image/logo/logo.gif" /></el-col>
        <el-col :span="5"><span class="subtitle" @click="routerToMapPredict">定点预测</span></el-col>
        <el-col :span="3"><span class="subtitle" @click="routerToTurbineManage">风机管理</span></el-col>
    </el-row>
</template>
<script>
export default {
    methods: {
        routerToPowerPredict() {
            const loadingInstance = this.$loading({
                text: '努力加载中...', // 可以设置加载时显示的文本
            });
            setTimeout(() => {
                loadingInstance.close(); // 关闭 loading
            }, 1500);
            setTimeout(() => {
                this.$router.push('/PowerPredict'); // Redirect to the desired route
            }, 1000);

        },
        routerToDataAnalysis() {
            const loadingInstance = this.$loading({
                text: '努力加载中...', // 可以设置加载时显示的文本
            });
            setTimeout(() => {
                loadingInstance.close(); // 关闭 loading
            }, 1500);
            setTimeout(() => {
                this.$router.push('/DataAnalysis'); // Redirect to the desired route
            }, 1000);

        },
        routerToMapPredict() {
            const loadingInstance = this.$loading({
                text: '努力加载中...', // 可以设置加载时显示的文本
            }); setTimeout(() => {
                loadingInstance.close(); // 关闭 loading
            }, 1500);
            setTimeout(() => {
                this.$router.push('/MapPredict'); // Redirect to the desired route
            }, 1000);

        },
        routerToTurbineManage() {
            const loadingInstance = this.$loading({
                text: '努力加载中...', // 可以设置加载时显示的文本
            });
            setTimeout(() => {
                loadingInstance.close(); // 关闭 loading
            }, 1500);
            setTimeout(() => {
                this.$router.push('/TurbineManage'); // Redirect to the desired route
            }, 1000);

        },
    }
}
</script>
<style scoped>
.el-col {
    line-height: 130px;
    text-align: center;
    height: 150px;
    font-weight: bold;
    font-family: SimHei sans-serif;
}

.logo {
    margin-top: 20px;
    height: 100px;
    cursor: pointer;
}

.subtitle {
    font-size: 22px;
    position: relative;
    display: inline;
    padding-bottom: 3px;
    letter-spacing: 2px;
    cursor: pointer;
}

.subtitle::after {
    content: "";
    width: 0px;
    height: 3px;
    background: #007ee6;
    position: absolute;
    top: 100%;
    left: 50%;
    right: 50%;
    transition: all 0.5s;
}

.subtitle:hover:after {
    left: 0%;
    right: 0%;
    width: 100%;
}

.animate {
    animation: slideInFromBottom 1s ease forwards;
}

@keyframes slideInFromBottom {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>