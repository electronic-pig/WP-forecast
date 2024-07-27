<template>
	<div class="container">
		<div class="label-container">
			<p class="history-label">历史发电功率数据回顾</p>
		</div>
		<div class="dropdowns">
			<div class="dropdown-left">
				<span class="choice-label" style="margin-top: 5px;font-weight: bold;">风机序列号：</span>
				<el-select v-model="fanSequence" placeholder="风机序列号1-10">
					<el-option v-for="fanNumber in 10" :key="fanNumber" :label="`风机${fanNumber}`"
						:value="fanNumber"></el-option>
				</el-select>
			</div>
			<div class="dropdown-right">
				<span class="choice-label" style="margin-top: 5px;font-weight: bold;">日期范围：</span>
				<el-date-picker v-model="dateRange" type="daterange" unlink-panels range-separator="至"
					start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" :disabledDate="disabledDate">
				</el-date-picker>
			</div>
		</div>
	</div>
	<div id="main" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
	data() {
		return {
			chartDom: null,
			myChart: null,
			fanSequence: 1, // 用于存储输入序列长度
			dateRange: this.getInitialDateRange(),
			loading: false,
			option: null,
			disabledDate(time) {
				// 禁用未来日期
				var date = new Date()
				date.setDate(date.getDate() - 1)
				return time.getTime() >= date.getTime();
			},
			shortcuts: [
				{
					text: 'Last week',
					value: () => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
						return [start, end]
					},
				},
				{
					text: 'Last month',
					value: () => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
						return [start, end]
					},
				},
				{
					text: 'Last 3 months',
					value: () => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
						return [start, end]
					},
				},
			]

		};
	},
	mounted() {
		this.chartDom = document.getElementById('main');
		this.myChart = echarts.init(this.chartDom);
		this.initChartOptions();
		this.updateChart();
		this.myChart.setOption(this.option);
	},
	watch: {
		fanSequence: 'HandleChange',
		dateRange: 'HandleChange'
	},
	methods: {
		HandleChange() {
			this.showLoading(),
				setTimeout(() => {
					this.updateChart();
				}, 1500); // 1.5秒后执行 updateChart()
		},
		getInitialDateRange() {
			const endDate = new Date(); // 当前日期
			endDate.setDate(endDate.getDate() - 1)
			endDate.setHours(0, 0, 0, 0); // 将时分秒设置为0，以便在计算时不考虑当天

			const startDate = new Date(endDate);
			startDate.setDate(endDate.getDate() - 7); // 减去一个周

			return [startDate, endDate];
		},
		initChartOptions() {
			this.option = {
				tooltip: {
					trigger: 'axis',
					position: function (pt) {
						return [pt[0], '10%'];
					}
				},
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {},
						magicType: { show: true, type: ['line', 'bar'] },
					}
				},
				legend: {
					data: ['实际功率', '预测功率'] // Add legend for the second line
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
						start: 90,
						end: 100,
					}
				],
				series: [
					{
						name: '实际功率',
						type: 'line',
						symbol: 'none',
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
			this.option.xAxis.data = this.generateDateRange(this.dateRange[0], this.dateRange[1]);
			this.option.series[0].data = this.generateRandomData(this.dateRange[0], this.dateRange[1]);
			this.option.series[1].data = this.generateRandomData(this.dateRange[0], this.dateRange[1]);

			this.option.dataZoom = [
				{
					start: 90,
					end: 100,
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
	justify-content: center;
}

.label-container {
	flex: 1;
	text-align: left;
	margin-left: 10px;
}

.history-label {
	padding: 0;
	margin: 0 0 0 5px;
	font-size: 20px;
	font-weight: bold;
}

.dropdowns {
	display: flex;
	justify-content: center;
}

.dropdown-left {
	margin-right: 20px;
}

.dropdown-right {
	left: auto;
	right: 10;
	margin-right: 20px;
}
</style>
