<template>
	<div id="LineChart" style="width: 100%; height: 750px;"></div>
</template>
  
<script>
import * as echarts from 'echarts';
import convertToTimestamp from '@/utils/convertToTimestamp.js'
export default {
	name: 'WindChart',
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
				return [timestamp, item[1], item[3]]; // 返回转换后的数据
			});
		},
		renderChart() {
			const LineChart = document.getElementById('LineChart');
			const chart = echarts.init(LineChart);
			const directionMap = {};
			this.convertedData.forEach(function (entry) {
				directionMap[entry.R] = entry.R * Math.PI / 180; // 将角度值转换为弧度
			});
			const data = this.convertedData.map(function (entry) {
				return [entry.time, entry.windSpeed, entry.R];
			});
			const dims = {
				time: 0,
				windSpeed: 1,
				R: 2
			};
			const arrowSize = 18;
			const renderArrow = function (params, api) {
				const point = api.coord([
					params.value[dims.time],
					params.value[dims.windSpeed]
				]);

				return {
					type: 'path',
					shape: {
						pathData: 'M31 16l-15-15v9h-26v12h26v9z',
						x: -arrowSize / 2,
						y: -arrowSize / 2,
						width: arrowSize,
						height: arrowSize
					},
					rotation: directionMap[params.value[dims.R]], // 使用角度值查找对应的旋转角度
					position: point,
					style: {
						stroke: '#555',
						lineWidth: 1
					}
				};
			};

			const option = {
				title: {
					left: 'left',
					text: '风速风向',
					textStyle: {
						fontSize: 25,
						color: "#3A5FCD"
					},
				},
				tooltip: {
					trigger: 'axis',
					position: function (pt) {
						return [pt[0], '30%'];
					}
				},

				xAxis: {
					type: 'time',
					boundaryGap: false
				},
				yAxis: {
					name: '风速（节）',
					nameLocation: 'middle',
					nameGap: 35,
					axisLine: {
						lineStyle: {
							color: '#666'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#ddd'
						}
					}
				},
				visualMap: {
					type: 'piecewise',
					orient: 'horizontal',
					left: 'center',
					bottom: 10,
					pieces: [
						{
							gte: 17,
							color: '#18BF12',
							label: '大风（>=17节）'
						},
						{
							gte: 11,
							lt: 17,
							color: '#f4e9a3',
							label: '中风（11 ~ 17节）'
						},
						{
							lt: 11,
							color: '#D33C3E',
							label: '微风（小于11节）'
						}
					],
					seriesIndex: 0,
					dimension: 1
				},
				dataZoom: [
					{
						type: 'slider',
						xAxisIndex: 0,
						minSpan: 5,
						bottom: 50
					}
				],
				series: [
					{
						type: 'custom',
						renderItem: renderArrow,
						encode: {
							x: dims.time,
							y: dims.windSpeed
						},
						data: data,
						z: 10
					}
				]
			};
			chart.setOption(option);
		}
	}
};
</script>
  
<style></style>
  