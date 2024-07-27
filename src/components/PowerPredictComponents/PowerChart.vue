<template>
	<div class="chart-container">
		<div ref="chart" style="width: 100%; height: 100%; margin-top: 10px;"></div>
	</div>
</template>

  
<script>
import * as echarts from 'echarts';
export default {
	data() {
		return {
			myChart: null,
			app: { count: 11 },
			categories: [],
			data: [],
			option: {
				title: {
					text: '预测实时功率'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#283b56'
						}
					}
				},
				legend: {},
				toolbox: {
					show: true,
					feature: {
						dataView: { readOnly: false },
						restore: {},
						saveAsImage: {}
					}
				},
				dataZoom: {
					show: false,
					start: 0,
					end: 100
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: true,
						data: []
					}
				],
				yAxis: [
					{
						type: 'value',
						scale: true,
						name: 'W',
						max: 50000,
						min: 0,
						boundaryGap: [0.2, 0.2]
					}
				],
				series: [
					{
						name: '功率',
						type: 'line',
						data: []
					}
				]
			}
		};
	},
	props: {
		selectedWindTurbine: {
			type: String, // Assuming selectedWindTurbine is of type String
			required: true // You can set it to false if it's optional
		}
	},
	watch: {
		selectedWindTurbine() {
			this.HandleChange();
		}
	},
	mounted() {
		this.myChart = echarts.init(this.$refs.chart);
		this.initializeData();
		this.updateData();
	},
	methods: {
		HandleChange() {
			setTimeout(() => {
				this.initializeData();
			}, 1500); // 1.5秒后执行
		},
		initializeData() {
			this.categories = this.generateCategories();
			this.data = this.generateData();

			this.option.xAxis[0].data = this.categories;
			this.option.series[0].data = this.data;

			this.myChart.setOption(this.option);
		},
		generateCategories() {
			let now = new Date();
			let res = [];
			let len = 10;
			while (len--) {
				res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
				now = new Date(+now - 2000);
			}
			return res;
		},
		generateData() {
			let rawData = [];
			let smoothData = [];
			let len = 10;

			// Generate raw data
			while (len--) {
				rawData.push(Math.round(Math.random() * 50000));
			}

			// Calculate moving average to smooth the data
			const windowSize = 3;  // Adjust the window size as needed
			for (let i = 0; i < rawData.length; i++) {
				let sum = 0;
				let count = 0;

				for (let j = i - Math.floor(windowSize / 2); j <= i + Math.floor(windowSize / 2); j++) {
					if (j >= 0 && j < rawData.length) {
						sum += rawData[j];
						count++;
					}
				}

				const avg = sum / count;
				smoothData.push(avg);
			}

			return smoothData;
		},
		updateData() {
			setInterval(() => {
				let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
				this.data.shift();
				this.data.push(Math.round(Math.random() * 50000));
				this.categories.shift();
				this.categories.push(axisData);
				this.myChart.setOption({
					xAxis: [
						{ data: this.categories }
					],
					series: [
						{ data: this.data }
					]
				});
			}, 4000);
		}
	}
};
</script>
  
<style scoped>
.chart-container {
	flex: 1;
	display: block;
	border: 2px solid var(--theme--color);
	border-radius: 15px;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.chart-container:hover {
	transform: scale(1.01);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
