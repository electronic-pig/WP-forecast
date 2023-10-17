<template>
	<div id="main" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

import chinaJson from "@/assets/resource/china.json"
export default {
	mounted() {
		const chartDom = document.getElementById('main');
		const myChart = echarts.init(chartDom);
		let currentOption;

		// 注册地图并配置特定区域的位置
		echarts.registerMap('china', chinaJson,);

		// 地图和柱状图的数据
		const data = [
			{ name: '北京', value: 0.11 },
			{ name: '天津', value: 1.15 },
			{ name: '上海', value: 1.80 },
			{ name: '重庆', value: 0 },
			{ name: '河北', value: 20.26 },
			{ name: '河南', value: 10.00 },
			{ name: '云南', value: 9.00 },
			{ name: '辽宁', value: 23.19 },
			{ name: '黑龙江', value: 20.96 },
			{ name: '湖南', value: 5.31 },
			{ name: '安徽', value: 3.88 },
			{ name: '山东', value: 14.23 },
			{ name: '新疆', value: 49.00 },
			{ name: '江苏', value: 12.53 },
			{ name: '浙江', value: 4.55 },
			{ name: '江西', value: 2.00 },
			{ name: '湖北', value: 5.00 },
			{ name: '广西', value: 17.97 },
			{ name: '甘肃', value: 24.80 },
			{ name: '山西', value: 10.26 },
			{ name: '内蒙古', value: 51.15 },
			{ name: '陕西', value: 45.00 },
			{ name: '吉林', value: 16.23 },
			{ name: '福建', value: 4.10 },
			{ name: '贵州', value: 5.00 },
			{ name: '广东', value: 20.00 },
			{ name: '青海', value: 8.07 },
			{ name: '西藏', value: 0 },
			{ name: '四川', value: 6.00 },
			{ name: '宁夏', value: 3.73 },
			{ name: '海南', value: 5.00 },
			{ name: '台湾', value: 1.00 },
			{ name: '香港', value: 0 },
			{ name: '澳门', value: 0 }
		];
		data.sort((a, b) => a.value - b.value);
		// const maxDataValue = Math.max(...data.map(item => item.value));
		// const minDataValue = Math.min(...data.map(item => item.value));

		const colorPalette = [
			'#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
			'#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'
		];

		const colorScale = value => {
			const maxIndex = colorPalette.length - 1;
			const index = Math.round(((value - 0) / (60 - 0)) * maxIndex);
			return colorPalette[index];
		};
		const seriesData = data.map(item => ({
			name: item.name,
			value: item.value,
			itemStyle: {
				color: colorScale(item.value)
			}
		}));
		// 地图和柱状图的选项
		const mapOption = {
			title: {
				text: '我国23个省份"十四五"期间规划新增风电装机超310GW',
				textStyle: {
					color: '#333',
					fontSize: 18,
					fontWeight: 'bold',
				},
				top: '2%'
			},
			tooltip: {
				trigger: "item",
				formatter: (params) => {
					var value = params.value;
					var name = params.name;
					return `${name}` + `:` + "新增装机容量" + `${value}` + 'GW';
				},
			},
			visualMap: {
				left: 'right',
				min: 0,
				max: 60,
				inRange: {
					color: colorPalette
				},
				text: ['高', '低'],
				calculable: true
			},
			series: [
				{
					id: 'population',
					type: 'map',
					roam: true,
					map: 'china',
					animationDurationUpdate: 1000,
					universalTransition: true,
					data: data,
					zoom: 1.20,
				}
			]
		};

		const barOption = {
			title: {
				text: '我国23个省份"十四五"期间规划新增风电装机超310GW',
				textStyle: {
					color: '#333',
					fontSize: 18,
					fontWeight: 'bold',
				},
				top: '2%',
			},
			xAxis: {
				type: 'value'
			},
			yAxis: {
				type: 'category',
				axisLabel: {
					rotate: 30
				},
				data: data.map(item => item.name)
			},
			animationDurationUpdate: 1000,
			series: {
				type: 'bar',
				id: 'population',
				data: seriesData,
				universalTransition: true
			}
		};

		currentOption = mapOption;
		myChart.setOption(mapOption);

		setInterval(() => {
			currentOption = currentOption === mapOption ? barOption : mapOption;
			myChart.setOption(currentOption, true);
		}, 7000);
	}
};
</script>

<style scoped>
/* 根据需要为组件添加任何必要的自定义样式 */
</style>
