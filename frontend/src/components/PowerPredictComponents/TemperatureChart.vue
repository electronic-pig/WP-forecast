<template>
	<div class="chart-container">
		<p class="temperature-label">当前实时温度</p>
		<div id="temperature-chart"></div>
	</div>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
	mounted() {
		const chartDom = document.getElementById('temperature-chart');
		const myChart = echarts.init(chartDom);

		let option = {
			series: [
				{
					type: 'gauge',
					center: ['50%', '60%'],
					startAngle: 200,
					endAngle: -20,
					min: -30,
					max: 30,
					splitNumber: 12,
					itemStyle: {
						color: '#3498db'
					},
					progress: {
						show: true,
						width: 30
					},
					pointer: {
						show: false
					},
					axisLine: {
						lineStyle: {
							width: 30
						}
					},
					axisTick: {
						distance: -45,
						splitNumber: 5,
						lineStyle: {
							width: 2,
							color: '#999'
						}
					},
					splitLine: {
						distance: -52,
						length: 14,
						lineStyle: {
							width: 3,
							color: '#999'
						}
					},
					axisLabel: {
						distance: -20,
						color: '#999',
						fontSize: 20
					},
					anchor: {
						show: false
					},
					title: {
						show: false
					},
					detail: {
						valueAnimation: true,
						width: '60%',
						lineHeight: 40,
						borderRadius: 8,
						offsetCenter: [0, '-15%'],
						fontSize: 30,
						fontWeight: 'bolder',
						formatter: '{value} °C',
						color: '#3498db'
					},
					data: [
						{
							value: 10.8
						}
					]
				}
			]
		}

		setInterval(() => {
			const random = ((10.8 + (Math.random() - 0.5) * 0.4).toFixed(1));
			myChart.setOption({
				series: [
					{
						data: [
							{
								value: random
							}
						]
					}
				]
			});
		}, 2000);

		option && myChart.setOption(option);
	}
};
</script>
  
<style scoped>
.chart-container {
	height: 280px;
	display: block;
	border: 2px solid var(--theme--color);
	border-radius: 15px;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.chart-container:hover {
	transform: scale(1.01);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.temperature-label {
	text-align: left;
	font-size: 20px;
	font-weight: bold;
	margin-top: 5px;
	margin-bottom: 5px;
	text-align: center;
	color:#333;
}

#temperature-chart {
	width: 350px;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
  