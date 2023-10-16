<template>
	<div ref="container" class='lineChart'></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'lineBarChart',
	data() {
		return {
			value: [4.9, 5.1, 5.5, 6.5, 7.9],
		}
	},
	computed: {
		minValue() {
			return Math.min(...this.value)
		},
		maxValue() {
			return Math.max(...this.value)
		},
	},
	methods: {
		mapValueToColor(value, minValue, maxValue, minColor, maxColor) {
			// 将值标准化到 [0, 1] 范围
			let normalizedValue = (value - minValue) / (maxValue - minValue);

			function colorHex2RGB(str) {
				return [parseInt('0x' + str.slice(1, 3)),
				parseInt('0x' + str.slice(3, 5)),
				parseInt('0x' + str.slice(5, 7))]
			}

			function colorRGB2Hex(r, g, b) {
				// padStart(2, '0'):将字符串填充至两位，缺失的用'0'补齐
				return '#' + r.toString(16).padStart(2, '0')
					+ g.toString(16).padStart(2, '0')
					+ b.toString(16).padStart(2, '0')
			}

			let color0 = colorHex2RGB(minColor)
			let color1 = colorHex2RGB(maxColor)

			// calculate (r,g,b)
			let r_base = Math.min(color0[0], color1[0])
			let r_increase = Math.abs(color0[0] - color1[0])

			let g_base = Math.min(color0[1], color1[1])
			let g_increase = Math.abs(color0[1] - color1[1])

			let b_base = Math.min(color0[2], color1[2])
			let b_increase = Math.abs(color0[2] - color1[2])

			return colorRGB2Hex(
				Math.round(r_base + r_increase * normalizedValue),
				Math.round(g_base + g_increase * normalizedValue),
				Math.round(b_base + b_increase * normalizedValue)
			)
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
			title: {
				text: '风力发电量比重持续上升',
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
					data: ['2017', '2018', '2019', '2020', '2021'],
					axisPointer: {
						type: 'shadow'
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					name: '占比',
					min: 4,
					max: 9,
					interval: 1,
					axisLabel: {
						formatter: '{value} %'
					},
					splitLine: {
						show: false // 不显示网格线
					},
				}
			],
			visualMap: [
				{
					show: false,
					type: 'continuous',
					seriesIndex: 0,
					min: this.minValue,
					max: this.maxValue
				},
			],
			series: [
				{
					name: '风力发电量比重',
					type: 'line',
					tooltip: {
						valueFormatter: function (value) {
							return value + ' %';
						}
					},
					data: this.value
				},
			]
		}
		this.chart.setOption(this.chartOption)
	},
}
</script>

<style scoped>
.lineChart {
	width: 100%;
	height: 100%;
}
</style>