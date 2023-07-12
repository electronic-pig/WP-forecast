<template>
	<div id="LineChart" style="width: 100%; height: 750px;"></div>
</template>
  
<script>
import * as echarts from 'echarts';
import convertToTimestamp from '@/utils/convertToTimestamp.js'
export default {
	name: 'LineAndBarChart',
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			convertedData: [] // 存储转换后的数据
		};
	},
	mounted() {
		this.convertDataToTimestamp();
		this.renderChart();
	},
	watch: {
		data: {
			immediate: false,
			handler() {
				this.convertDataToTimestamp();
				this.renderChart();
			}
		}
	},
	methods: {
		convertDataToTimestamp() {
			this.convertedData = this.data.map(item => {
				const dateString = item[0];
				const timestamp = convertToTimestamp(dateString); // 使用提供的函数进行转换
				return [timestamp, item[4], item[5]]; // 返回转换后的数据
			});
		},
		renderChart() {
			const LineChart = document.getElementById('LineChart');
			const chart = echarts.init(LineChart);
			const option = {
				title: {
					left: 'left',
					text: '温度与湿度',
					textStyle: {
						fontSize: 25,
						color: "#3A5FCD"
					},
				},
				legend: {
					data: ['温度', '湿度']
				},
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
						saveAsImage: {}
					}
				},
				grid: {
					left: '4%',
					right: '4%',
				},
				xAxis: {
					type: 'time',
					boundaryGap: false
				},
				yAxis: [
					{
						type: 'value',
						name: '温度',
						axisLabel: {
							formatter: '{value} °C'
						}
					},
					{
						type: 'value',
						name: '湿度',
						axisLabel: {
							formatter: '{value} g/m³'
						}
					}
				],
				dataZoom: [
					{
						type: 'slider',
						start: 0,
						end: 0.5
					},
				],
				series: [
					{
						name: '温度',
						type: 'line',
						color: 'orange',
						tooltip: {
							valueFormatter: function (value) {
								return value + ' °C';
							}
						},
						data: this.convertedData.map(item => [item[0], item[1]])
					},
					{
						name: '湿度',
						type: 'bar',
						color: 'lightblue',
						yAxisIndex: 1,
						tooltip: {
							valueFormatter: function (value) {
								return value + ' g/m³';
							}
						},
						data: this.convertedData.map(item => [item[0], item[2]])
					}
				]
			};
			chart.setOption(option);
		}
	}
};
</script>
  
<style></style>
  