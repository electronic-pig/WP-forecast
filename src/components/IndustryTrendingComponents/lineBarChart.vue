<template>
	<div ref="container" class='lineBarChart'></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	name: 'lineBarChart',
	data() {
		return {
			land: [15.1, 5.1, 9.9, 12.6, 30.2, 35.2, 30.8],
			ocean: [112.2, 125.5, 150.8, 175.1, 210.8, 278.6, 310.4],
		}
	},
	computed: {
		landPercentage() {
			let array = this.land.slice()
			for (let i = 0; i < array.length; ++i) {
				array[i] = array[i] / (this.land[i] + this.ocean[i]) * 100
				array[i] = array[i].toFixed(2)
			}
			return array
		},
		oceanPercentage() {
			let array = this.ocean.slice()
			for (let i = 0; i < array.length; ++i) {
				array[i] = array[i] / (this.land[i] + this.ocean[i]) * 100
				array[i] = array[i].toFixed(2)
			}
			return array
		}
	},
	mounted() {
		this.chart = echarts.init(this.$refs.container)
		this.chartOption = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			toolbox: {
				feature: {
					magicType: { show: true, type: ['line', 'bar'] },
					restore: { show: true },
					saveAsImage: { show: true }
				},
			},
			legend: {
				data: ['海上风电', '陆上风电', '海上风电占比', '陆上风电占比'],
				top: '90%'
			},
			title: {
				text: '我国风电累计装机量持续上升',
				textStyle: {
					color: '#333',
					fontSize: 15,
					fontWeight: 'bold',
				},
				left: 'center',
				top: '0%',
			},
			xAxis: [
				{
					type: 'category',
					data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
					axisPointer: {
						type: 'shadow'
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					name: '装机容量(单位:GW)',
					min: 0,
					max: 400,
					interval: 100,
					axisLabel: {
						formatter: '{value}'
					}
				},
				{
					type: 'value',
					name: '占比',
					min: 0,
					max: 100,
					interval: 25,
					axisLabel: {
						formatter: '{value} %'
					}
				}
			],
			series: [
				{
					name: '海上风电',
					type: 'bar',
					tooltip: {
						valueFormatter: function (value) {
							return value + ' GW';
						}
					},
					data: this.ocean
				},
				{
					name: '陆上风电',
					type: 'bar',
					tooltip: {
						valueFormatter: function (value) {
							return value + ' GW';
						}
					},
					data: this.land
				},
				{
					name: '海上风电占比',
					type: 'line',
					yAxisIndex: 1,
					tooltip: {
						valueFormatter: function (value) {
							return value + ' %';
						}
					},
					data: this.oceanPercentage
				},
				{
					name: '陆上风电占比',
					type: 'line',
					yAxisIndex: 1,
					tooltip: {
						valueFormatter: function (value) {
							return value + ' %';
						}
					},
					data: this.landPercentage
				}
			]
		}
		this.chart.setOption(this.chartOption)
	},

}
</script>

<style scoped>
.lineBarChart {
	width: 100%;
	height: 100%;
}
</style>