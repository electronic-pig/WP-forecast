<template>
	<div class="card-container">
		<div class="fan-card">
			<el-row :gutter="20">
				<el-col :span="13">
					<div class="fan-card-content">
						<p class="fan-card-title">风机设备信息</p>
						<div class="info-item">
							<span class="label">风机ID：</span>
							<span><el-tag class="value">{{ fanId }}</el-tag></span>
						</div>
						<div class="info-item">
							<span class="label">设备型号：</span>
							<span><el-tag class="value">{{ deviceModel }}</el-tag></span>
						</div>
						<div class="info-item">
							<span class="label">风机地址：</span>
							<span><el-tag class="value">{{ location }}</el-tag></span>
						</div>
						<div class="info-item">
							<span class="label">运行状态：</span>

							<el-icon v-if="isNormal" color="#0aeb46" size="25px">
								<CircleCheck />
							</el-icon>
							<span class="value" v-if="isNormal" style="color:#0aeb46 ;">正常</span>

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
				<el-col :span="11">
					<div style="display: flex;align-items: center;justify-content: center;">
						<img v-if="isNormal" src="@/assets/image/normal.gif" style="width: 200px;margin-top: 10px;">
						<img v-if="isAbnormal" src="@/assets/image/abnormal.gif" style="width: 250px;">
						<img v-if="isFault" src="@/assets/image/fault.gif" style="width: 250px;">
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
  
<script>
export default {
	props: {
		fanId: String,
		deviceModel: String,
		location: String,
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
};
</script>
  
<style scoped>
.card-container {
	border: 2px solid var(--theme--color);
	border-radius: 15px;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-container:hover {
	transform: scale(1.01);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.fan-card {
	height: 230px;
	width: 100%;
	border-radius: 15px;
}

.fan-card-title {
	font-size: x-large;
	font-weight: bold;
	margin: 10px auto 10px 10px;
}

.fan-card-content {
	display: flex;
	flex-direction: column;
}

.info-item {
	margin: 10px;
	display: flex;
	align-items: center;
}

.label {
	font-size: larger;
	font-weight: bold;
}

.value {
	margin-left: 10px;
	font-size: larger;
}
</style>
  