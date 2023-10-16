<template>
	<div class='pieChart' ref="container"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'pieChart',

	mounted() {
		this.chart = echarts.init(this.$refs.container)

		this.chartOption = {
			title: {
				text: "2022年中国风力发电新增装机容量统计",
				textStyle: {
					color: '#333',
					fontSize: 15,
					fontWeight: 'bold',
				},
				left: 'center',
			},
			tooltip: {
				trigger: 'item',
				formatter: (params) => {
					var value = params.value;
					var name = params.name;
					return `${name}` + `:` + `${value}` + 'GW';
				},
			},

			toolbox: {
				feature: {
					saveAsImage: { show: true } // 保存为图片
				},
				top: '8%',
			},

			legend: {
				top: '5%',
				left: 'center'
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 40,
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: [
						{ value: 1048, name: '海上风电' },
						{ value: 130, name: '陆上风电' }
					]
				}
			]
		}

		this.chart.setOption(this.chartOption)
	},

}
</script>
    
<style scoped>
.pieChart {
	width: 100%;
	height: 100%;
}
</style>