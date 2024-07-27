<template>
	<div class="container">
		<div id="chart" style="height: 400px; margin-top: 10px;"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
	data() {
		return {
			chart: null,
			options: {
				title: {
					text: '所在地未来24小时功率预测',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						animation: false,
					},
				},
				toolbox: {
					show: true,
					feature: {
						dataView: { readOnly: false },
						restore: {},
						saveAsImage: {},
						magicType: { show: true, type: ['line', 'bar'] }
					}
				},
				legend: {
					data: ['功率', '风速'],
				},
				xAxis: {
					type: 'time',
					splitLine: {
						show: false,
					},
				},
				yAxis: [
					{
						type: 'value',
						name: '功率 / W',
						position: 'left',
						splitLine: {
							show: true,
						},
					},
					{
						type: 'value',
						name: '风速 / m/s',
						position: 'right',
						splitLine: {
							show: true,
						},
					},
				],
				dataZoom: [
					{
						type: 'slider',
						xAxisIndex: 0,
						filterMode: 'filter',
						start: 0,
						end: 12.5
					},
				],
				series: [
					{
						name: '功率',
						type: 'line',
						yAxisIndex: 0,
						smooth: true,
						symbol: 'none',
						areaStyle: {},
						data: null,
					},
					{
						name: '风速',
						type: 'line',
						yAxisIndex: 1,
						smooth: true,
						symbol: 'none',
						areaStyle: {},
						data: null,
					},
				],
			}
		}
	},
	methods: {
		generateRandomData() {
			const data = [];
			const baseTime = new Date().getTime();

			for (let i = 0; i < 24 * 4; i++) {
				// 24小时，每小时4个数据点（15分钟一个）
				const timestamp = baseTime + i * 900000; // 15分钟一个数据点
				const power = Math.round(60000 + Math.random() * 30000); // 随机生成功率值
				const windSpeed = (Math.random() * 10).toFixed(1); // 随机生成风速值

				data.push([timestamp, power, windSpeed]);
			}

			return data;
		},
		initializechart() {
			const chartDom = document.getElementById('chart');
			const chart = echarts.init(chartDom);
			// 生成测试数据
			const testData = this.generateRandomData();
			// 设置图表配置项
			this.options.series[0].data = testData.map(point => [point[0], point[1]])
			this.options.series[1].data = testData.map(point => [point[0], point[2]])
			// 使用刚指定的配置项和数据显示图表。
			chart.setOption(this.options);
			this.chart = chart;
		},
		updateData() {
			// 生成新的测试数据
			const testData = this.generateRandomData();
			this.options.series[0].data = testData.map(point => [point[0], point[1]])
			this.options.series[1].data = testData.map(point => [point[0], point[2]])
			// 更新图表的数据
			this.chart.setOption(this.options);
		}
	},
	mounted() {
		this.initializechart()
		//每15分钟更新一次数据
		setInterval(() => {
			this.updateData();
		}, 900000); // 15分钟
	}
}
</script>

<style scoped>
.container {
	padding: 10px;
	justify-content: center;
	/* width: 80%; */
	border: 2px solid var(--theme--color);
	border-radius: 15px;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.container:hover {
	transform: scale(1.01);
	/* 鼠标悬浮时放大1.01倍 */
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	/* 添加阴影效果 */
}
</style>
