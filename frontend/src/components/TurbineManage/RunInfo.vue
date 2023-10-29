<template>
	<div class="card-container">
		<div class="fan-card">
			<div class="fan-card-content">
				<el-row>
					<el-col :span="8">
						<p class="fan-card-title">风机运行数据</p>
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
					<el-col :span="8" style="margin-top: 36px;">
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
							<span class="label">日照<br>强度：</span>
							<span><el-tag class="value">{{ sunlightIntensity }}</el-tag></span>
						</div>
						<div class="info-item">
							<span class="label">湿度：</span>
							<span><el-tag class="value">{{ humidity }}</el-tag></span>
						</div>
					</el-col>
					<el-col :span="8">
						<div style="margin-top: 10px;">
							<img src="@/assets/image/windmill.gif" style="width: 100%">
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
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
