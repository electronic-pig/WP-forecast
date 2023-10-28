<template>
    <div class="card-container">
        <el-card class="fan-card" :body-style="{ padding: '20px' }">
            <div class="fan-card-header">风机运行数据</div>
            <div class="fan-card-content">
                <el-row>
                    <!-- Left Column -->
                    <el-col :span="8">
                        <div class="info-item">
                            <span class="label">风速：</span>
                            <span><el-tag class="value">{{ windSpeed }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">风向：</span>
                            <span><el-tag class="value">{{ windDirection }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">温度：</span>
                            <span><el-tag class="value">{{ temperature }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">压强：</span>
                            <span><el-tag class="value">{{ pressure }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">转数：</span>
                            <span><el-tag class="value">{{ rotationSpeed }}</el-tag></span>
                        </div>
                    </el-col>
                    <!-- Right Column -->
                    <el-col :span="8">
                        <div class="info-item">
                            <span class="label">电压：</span>
                            <span><el-tag class="value">{{ voltage }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">电流：</span>
                            <span><el-tag class="value">{{ current }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">功率：</span>
                            <span><el-tag class="value">{{ power }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">日照强度：</span>
                            <span><el-tag class="value">{{ sunlightIntensity }}</el-tag></span>
                        </div>
                        <div class="info-item">
                            <span class="label">湿度：</span>
                            <span><el-tag class="value">{{ humidity }}</el-tag></span>
                        </div>
                    </el-col>
                    <el-col span="8">
                        <img src="@/assets/image/windmill.gif" style="width: 250px; height: 250px;">
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>
  
<script>
export default {
    props: {
        windSpeed: String,
        windDirection: String,
        temperature: String,
        pressure: String,
        rotationSpeed: String,
        voltage: String,
        current: String,
        power: String,
        sunlightIntensity: String,
        humidity: String, // Replace runStatus with humidity
    },
    data() {
        return {};
    },
};
</script>
  
<style scoped>
.fan-card {
    width: 100%;
    height: 300px;
}

.fan-card-header {
    font-size: x-large;
    font-weight: bold;
    margin-bottom: 20px;
}

.fan-card-content {
    display: flex;
    flex-direction: column;
}

.info-item {
    margin: 10px;
}

.label {
    font-size: larger;
    font-weight: bold;
}

.value {
    padding: auto;
    margin-left: 10px;
    font-size: larger;
}

.card-container {
    padding: 5px;
    justify-content: center;
    /* width: 80%; */
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-container:hover {
    transform: scale(1.01);
    /* 鼠标悬浮时放大1.01倍 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
}
</style>
