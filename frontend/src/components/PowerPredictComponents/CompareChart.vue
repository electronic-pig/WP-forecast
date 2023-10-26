<template>
	<div class="container">
		<div class="label-container">
			<p class="compare-label">实时数据与预测数据对比图</p>
		</div>
		<div class="dropdowns">
			<span class="input-output-label" style="margin-top: 5px;font-weight: bold;color: #333;">输入：</span>
			<el-select v-model="inputSequenceLength" placeholder="输入序列长度" class="dropdown-left">
				<el-option label="过去7天" value="7"></el-option>
				<el-option label="过去5天" value="5"></el-option>
				<el-option label="过去3天" value="3"></el-option>
			</el-select>
			<span class="input-output-label" style="margin-top: 5px;font-weight: bold;color: #333;">输出：</span>
			<el-select v-model="outputPredictLength" placeholder="输出预测长度" class="dropdown-right">
				<el-option label="未来1天" value="1"></el-option>
				<el-option label="未来2天" value="2"></el-option>
				<el-option label="未来3天" value="3"></el-option>
			</el-select>
		</div>
	</div>
	<div id="main" style="width: 100%; height: 92%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
	data() {
		return {
			chartDom: null,
			myChart: null,
			inputSequenceLength: "7", // 用于存储输入序列长度
			outputPredictLength: "3", // 用于存储输出预测长
			loading: false,
			option: null,
		};
	},
	props: {
		selectedWindTurbine: {
			type: String, // Assuming selectedWindTurbine is of type String
			required: true // You can set it to false if it's optional
		}
	},
	mounted() {
		this.chartDom = document.getElementById('main');
		this.myChart = echarts.init(this.chartDom);
		this.initChartOptions();
		this.updateChart();
		this.myChart.setOption(this.option);
	},
	watch: {
		inputSequenceLength: 'HandleChange',
		outputPredictLength: 'HandleChange',
		selectedWindTurbine() {
			this.HandleChange();
		}
	},
	methods: {
		HandleChange() {
			this.showLoading(),
				setTimeout(() => {
					this.updateChart();
				}, 1500); // 1.5秒后执行 updateChart()
		},
		initChartOptions() {
			this.option = {
				tooltip: {
					trigger: 'axis',
					position: function (pt) {
						return [pt[0], '10%'];
					}
				},
				legend: {
					data: ['实际功率', '预测功率'] // Add legend for the second line
				},
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [], // Will be filled with data in mounted
					axisLabel: {
						formatter: function (value) {
							// 格式化为 年-月-日 时:分
							const date = new Date(value);
							const year = date.getFullYear();
							const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
							const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
							const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
							const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
							return `${year}-${month}-${day} ${hours}:${minutes}`;
						}
					}
				},
				yAxis: {
					type: 'value',
					name: 'W',
					boundaryGap: [0, '100%']
				},
				dataZoom: [
					{
						start: Math.round((Number(this.inputSequenceLength) / (Number(this.inputSequenceLength) + Number(this.outputPredictLength))) * 100) - 5,
						end: Math.round((Number(this.inputSequenceLength) / (Number(this.inputSequenceLength) + Number(this.outputPredictLength))) * 100) + 5
					}
				],
				series: [
					{
						name: '实际功率',
						type: 'line',
						symbol: 'none',
						symbolSize: 40,
						sampling: 'lttb',
						smooth: true,  // 让曲线更加平滑
						itemStyle: {
							color: 'rgb(255, 70, 131)'
						},
						areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(255, 158, 68)'
								},
								{
									offset: 1,
									color: 'rgb(255, 70, 131)'
								}
							])
						},
						data: [] // Will be filled with data in mounted
					},
					{
						name: '预测功率',
						type: 'line',
						symbol: 'none',
						sampling: 'lttb',
						smooth: true,  // 让曲线更加平滑
						itemStyle: {
							color: 'rgb(70, 131, 255)'
						},
						areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(0, 127, 127)'
								},
								{
									offset: 1,
									color: 'rgb(70, 131, 255)'
								}
							])
						},
						data: [] // Will be filled with data in mounted
					}
				]
			};
		},
		updateChart() {
			const now = new Date();

			const firstLineStartDate = new Date(now);
			firstLineStartDate.setDate(now.getDate() - Number(this.inputSequenceLength));
			firstLineStartDate.setHours(0, 0, 0, 0);

			const firstLineEndDate = new Date(now);
			firstLineEndDate.setHours(0, 0, 0, 0);

			const secondLineStartDate = new Date(firstLineStartDate);
			const secondLineEndDate = new Date(now);
			secondLineEndDate.setDate(now.getDate() + Number(this.outputPredictLength));
			secondLineEndDate.setHours(0, 0, 0, 0);

			this.option.xAxis.data = this.generateDateRange(secondLineStartDate, secondLineEndDate);
			this.option.series[0].data = this.generateRandomData(firstLineStartDate, firstLineEndDate);
			this.option.series[1].data = this.generateRandomData(secondLineStartDate, secondLineEndDate);

			this.option.dataZoom = [
				{
					start: Math.round((Number(this.inputSequenceLength) / (Number(this.inputSequenceLength) + Number(this.outputPredictLength))) * 100) - 5,
					end: Math.round((Number(this.inputSequenceLength) / (Number(this.inputSequenceLength) + Number(this.outputPredictLength))) * 100) + 5
				}
			]

			this.myChart.setOption(this.option);
		},
		generateDateRange(startDate, endDate) {
			const dateRange = [];
			const currentDate = new Date(startDate);

			while (currentDate <= endDate) {
				dateRange.push(this.formatDate(currentDate));
				currentDate.setTime(currentDate.getTime() + 15 * 60 * 1000);
			}

			return dateRange;
		},
		generateRandomData(startDate, endDate) {
			const smoothingFactor = 15000;
			const data = [];
			const currentDate = new Date(startDate);
			let previousValue = Math.random() * 100001;  // Initial random value

			while (currentDate <= endDate) {
				// Generate a random value within a range based on the previous value and smoothing factor
				const minValue = Math.max(previousValue - smoothingFactor, 0);
				const maxValue = Math.min(previousValue + smoothingFactor, 100000);
				const newValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

				data.push(newValue);
				previousValue = newValue;

				currentDate.setTime(currentDate.getTime() + 15 * 60 * 1000);
			}

			return data;
		},
		formatDate(date) {
			return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
		},
		showLoading() {
			const loadingInstance = this.$loading({
				text: '努力加载中...', // 可以设置加载时显示的文本
			});

			setTimeout(() => {
				loadingInstance.close();
			}, 1500);
		},
	}

};
</script>

<style scoped>
.container {
	margin-top: 5px;
	display: flex;
	align-items: center;
}

.label-container {
	flex: 1;
	text-align: left;
}

.compare-label {
	padding: 0;
	margin: 0 0 0 5px;
	font-size: 20px;
	font-weight: bold;
	color: #333;
}

.dropdowns {
	display: flex;
	justify-content: flex-end;
	flex: 1;
}

.dropdown-left {
	margin-right: 10px;
}

.dropdown-right {
	left: auto;
	right: 0;
	margin-right: 10px;
}
</style>
