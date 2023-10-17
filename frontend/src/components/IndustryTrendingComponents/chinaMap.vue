<template>
	<div ref="mapContainer" class='mapStyle'></div>
</template>

<script>
import * as echarts from 'echarts'
import china from '@/assets/resource/china.json'

echarts.registerMap('chinaMap', china)
export default {
	name: 'chinaMap',
	data() {
		return {
			city: ["北京", "天津", "上海", "重庆", "河北", "河南", "云南", "辽宁", "黑龙江", "湖南", "安徽", "山东", "新疆", "江苏", "浙江", "江西",
				"湖北", "广西", "甘肃", "山西", "内蒙古", "陕西", "吉林", "福建", "贵州", "广东", "青海", "西藏", "四川", "宁夏", "海南", "台湾",
				"香港", "澳门",],
			value: [0.11, 1.15, 1.80, 0, 20.26, 10.00, 9.00, 23.19, 20.96, 5.31, 3.88, 14.23, 49.00, 12.53, 4.55, 2.00, 5.00,
				17.97, 24.80, 10.26, 51.15, 45.00, 16.23, 4.10, 5.00, 20.00, 8.07, 0, 6.00, 3.73, 5.00, 1.00, 0, 0],
			valueName: "新增装机容量",
			// 图表
			topNum: 23,
		}
	},

	computed: {
		valueInEachProvince() {
			let cityDice = {}
			for (let i = 0; i < this.city.length; ++i) {
				cityDice[this.city[i]] = this.value[i]//Math.ceil(Math.random()*100)
			}
			return cityDice
		},

		minValue() {
			return Math.min(...Object.values(this.valueInEachProvince))
		},

		maxValue() {
			return Math.max(...Object.values(this.valueInEachProvince))
		},

		sortedArray() {
			let tmpArray = []
			Object.keys(this.valueInEachProvince).forEach(key => {
				tmpArray.push([key, this.valueInEachProvince[key]])
			})

			// desc
			tmpArray.sort((item1, item2) => {
				return item2[1] - item1[1]
			})

			let keyArray = []
			let valueArray = []
			for (let i = 0; i < Math.min(tmpArray.length, this.topNum); ++i) {
				keyArray.push(tmpArray[i][0])
				valueArray.push(tmpArray[i][1])
			}
			return [keyArray.reverse(), valueArray.reverse()]
		},

	},

	methods: {
		setCityValue(data) {
			for (let i = 0; i < this.city.length; ++i) {
				data.push({ name: this.city[i], value: this.valueInEachProvince[this.city[i]] })
			}
		},

		//柱状图着色
		mapValueToColor(value, minValue, maxValue, minColor, maxColor) {
			let normalizedValue = (value - minValue) / (maxValue - minValue); // 将值标准化到 [0, 1] 范围

			// let colorRange = ['#A5CC82', '#00467F']; // 最小值到最大值的颜色渐变范围


			function colorHex2RGB(str) {
				return [parseInt('0x' + str.slice(1, 3)), parseInt('0x' + str.slice(3, 5)), parseInt('0x' + str.slice(5, 7))]
			}

			function colorRGB2Hex(r, g, b) {
				return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0')
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
		let chart = echarts.init(this.$refs.mapContainer)

		let mapOption = {
			title: {
				text: '我国' + this.topNum + '个省份"十四五"期间规划新增风电装机超310GW',
				textStyle: {
					color: '#333',
					fontSize: 18,
					fontWeight: 'bold',
				},
				left: '5%',
				top: '5%'
			},

			// 鼠标移动到相应模块上的显示
			tooltip: {
				trigger: "item",
				formatter: (params) => {
					var value = params.value;
					var name = params.name;
					return `${name}` + `:` + this.valueName + `${value}` + 'GW';
				},
			},

			visualMap: {
				left: 'right',
				top: '65%',
				min: this.minValue,
				max: this.maxValue,
				inRange: {
					color: ['#00467F', '#A5CC82'] // 蓝绿
				},
				text: ['High', 'Low'],
				calculable: true,
			},

			// 地图基本格式及其数据
			series: [{
				id: 'population',
				type: "map",
				map: "chinaMap",
				roam: false,
				label: {
					normal: {
						show: false, //省份名称
					},
					emphasis: {
						show: true,
					},
				},
				data: [],
				zoom: 1.25,
				animationDurationUpdate: 1000,
				universalTransition: true,
			}],
		};

		this.setCityValue(mapOption.series[0].data)

		let barOption = {
			title: {
				text: '我国' + this.topNum + '个省份"十四五"期间规划新增风电装机超310GW',
				textStyle: {
					color: '#333',
					fontSize: 18,
					fontWeight: 'bold',
				},
				left: '5%',
				top: '5%',
			},

			xAxis: {
				type: 'value'
			},
			yAxis: {
				type: 'category',
				axisLabel: {
					rotate: 30
				},
				data: this.sortedArray[0]
			},
			animationDurationUpdate: 1000,

			series: {
				id: 'population',
				type: 'bar',
				data: this.sortedArray[1],
				itemStyle: {
					color: params => {
						return this.mapValueToColor(params.data, this.minValue, this.maxValue, '#A5CC82', '#00467F');
					},
				},
				universalTransition: true,
			}
		}

		chart.setOption(mapOption)
		let currentOption = mapOption
		setInterval(() => {
			currentOption = currentOption === mapOption ? barOption : mapOption;
			chart.setOption(currentOption, true);
		}, 7000);
	},
}
</script>

<style scoped>
.mapStyle {
	width: 100%;
	height: 100%
}
</style>