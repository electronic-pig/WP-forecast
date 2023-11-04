<template>
	<div class="dashboard">
		<div v-for="(item, index) in data" :key="index">
			<el-card style="border-radius: 15px;height: 140px;">
				<div class="dashboard-item" alt="icon-image">
					<div class="left-content">
						<div class="title">平均{{ item.title }}</div>
						<div class="value">{{ item.value }}{{ unit[index] }}</div>
						<div class="difference"
							:class="{ 'positive': item.difference >= 0, 'negative': item.difference < 0 }">
							<el-icon v-if="item.difference >= 0">
								<Top />
							</el-icon>
							<el-icon v-else>
								<Bottom />
							</el-icon>
							{{ (Math.abs(item.difference)).toFixed(1) }}{{ unit[index] }}<span
								style="color: #666; ">&nbsp;较年平均{{ item.title
								}}</span>
						</div>
					</div>
					<div class="right-content">
						<img :src="`/src/assets/icon/${item.icon}`" alt="My Image" />
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [
				{ title: '功率', value: 50499, average: 42450, difference: 0, icon: 'caihong.png' },
				{ title: '气温', value: 14.2, average: 12.7, difference: 0, icon: 'jubuduoyun.png' },
				{ title: '风速', value: 9.1, average: 10.3, difference: 0, icon: 'fengxiang.png' },
				{ title: '气压', value: 1014.7, average: 1013.2, difference: 0, icon: 'wendu.png' },
				{ title: '湿度', value: 15, average: 22, difference: 0, icon: 'yudi.png' },
			],
			unit: ["W", "℃", "m/s", "hPa", "%"],
		};
	},
	mounted() {
		this.calculateDifferences();
	},
	methods: {
		calculateDifferences() {
			this.data.forEach(item => {
				item.difference = item.value - item.average;
			});
		},
	},
};
</script>
  
<style scoped>
.dashboard {
	display: flex;
	flex-direction: column;
}

.dashboard-item {
	display: flex;
	justify-content: space-between;
}

.title {
	font-weight: bold;
	color: #666;
	font-size: 14px;
}

.value {
	font-size: 28px;
	font-weight: 600;
	margin-top: 10px;
}

.difference {
	margin-top: 5px;
	display: flex;
	align-items: center;
	font-size: 18px;
}

.positive {
	color: #CC0000;
}

.negative {
	color: #009900;
}

.left-content {
	flex: 2;
}

.right-content {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
  