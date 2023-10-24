<template>
    <el-row type="flex" justify="center" style="color: rgb(75, 124, 189);" class="animate">
        <el-col :span="3"><span id="subtitle">功率预测</span></el-col>
        <el-col :span="5"><span id="subtitle">数据分析</span></el-col>
        <el-col :span="2"><img id="logo" :src="require('@/assets/image/logo/logo.gif')" title="点击前往功能区" /></el-col>
        <el-col :span="5"><span id="subtitle">定点预测</span></el-col>
        <el-col :span="3"><span id="subtitle">风机管理</span></el-col>
    </el-row>
</template>
<script>
export default {
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

#logo {
    margin-top: 20px;
    height: 100px;
    cursor: pointer;
}

#subtitle {
    font-size: 22px;
    position: relative;
    display: inline;
    padding-bottom: 3px;
    letter-spacing: 2px;
    cursor: pointer;
}

#subtitle::after {
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

#subtitle:hover:after {
    left: 0%;
    right: 0%;
    width: 100%;
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

.animate {
    animation: slideInFromBottom 1s ease forwards;
}
</style>