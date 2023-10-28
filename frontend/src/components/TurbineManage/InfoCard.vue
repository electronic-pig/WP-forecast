<template>
    <div class="card-container">
    <el-card class="fan-card" :body-style="{ padding: '20px' }">
        <div class="fan-card-header">风机设备信息</div>
        <el-row :gutter="30">
            <el-col span="12">
                <div class="fan-card-content">

                    <div class="info-item">
                        <span class="label">风机ID：</span>
                        <span><el-tag class="value">{{ fanId }}</el-tag></span>
                    </div>
                    <div class="info-item">
                        <span class="label">设备型号：</span>
                        <span><el-tag class="value">{{ deviceModel }}</el-tag></span>
                    </div>
                    <div class="info-item">
                        <span class="label">风机所在地：</span>
                        <span><el-tag class="value">{{ location }}</el-tag></span>
                    </div>
                    <div class="info-item">
                        <span class="label">当前时间：</span>
                        <span><el-tag class="value">{{ currentTime }}</el-tag></span>
                    </div>
                    <div class="info-item">
                        <span class="label">运行状态：</span>
                        <el-icon v-if="isNormal" color="#0aeb46" size="25px">
                            <CircleCheck />
                        </el-icon>
                        <span class="value" v-if="isNormal" style="color:#95eb0a ;">正常</span>

                        <el-icon v-if="isAbnormal" color="#eb9c0a" size="25px">
                            <WarningFilled />
                        </el-icon>
                        <span class="value" v-if="isAbnormal" style="color:#eb9c0a ;">异常</span>
                        <el-icon v-if="isFault" color="#d71106" size="25px">
                            <WarnTriangleFilled />
                        </el-icon>
                        <span class="value" v-if="isFault" style="color:#d71106 ;">故障</span>
                    </div>
                </div>
            </el-col>
            <el-col span="12">
                <img v-if="isNormal" src="@/assets/image/normal.gif" style="width: 200px; height: 200px;">
                <img v-if="isAbnormal" src="@/assets/image/abnormal.gif" style="width: 250px; height: 250px;">
                <img v-if="isFault" src="@/assets/image/fault.gif" style="width: 250px; height: 250px;">
            </el-col>
        </el-row>
    </el-card>
</div>
</template>
  
<script>
export default {
    props: {
        fanId: String,
        deviceModel: String,
        location: String,
        currentTime: String,
        runStatus: String, // 可以是 'normal', 'abnormal', 'fault'
    },
    computed: {
        isNormal() {
            return this.runStatus === 'normal';
        },
        isAbnormal() {
            return this.runStatus === 'abnormal';
        },
        isFault() {
            return this.runStatus === 'fault';
        }
    },
    data() {
        return {
        }
    }
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
  