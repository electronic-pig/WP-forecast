<template>
	<div class="chart-container">
		<div ref="chart" style="width: 100%; height: 380px; margin-top: 10px;"></div>
	</div>
</template>

  
<script>
import * as echarts from 'echarts';
export default {
	data() {
		return {
			myChart: null,
			app: { count: 11 },
			categories: [],
			data: [],
			option: {
				title: {
					text: '预测风机负载'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#283b56'
						}
					}
				},
				legend: {},
				toolbox: {
					show: true,
					feature: {
						dataView: { readOnly: false },
						restore: {},
						saveAsImage: {}
					}
				},
				dataZoom: {
					show: false,
					start: 0,
					end: 100
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: true,
						data: []
					}
				],
				yAxis: [
					{
						type: 'value',
						scale: true,
						name: '%',
						max: 100,
						min: 0,
						boundaryGap: [0.2, 0.2]
					}
				],
				series: [
					{
						name: '负载',
						type: 'bar',
						data: []
					}
				]
			}
		};
	},
	mounted() {
		this.myChart = echarts.init(this.$refs.chart);
		this.initializeData();
		this.updateData();
	},
	methods: {
		initializeData() {
			this.categories = this.generateCategories();
			this.data = this.generateData();

			this.option.xAxis[0].data = this.categories;
			this.option.series[0].data = this.data;

			this.myChart.setOption(this.option);
		},
		generateCategories() {
			let now = new Date();
			let res = [];
			let len = 10;
			while (len--) {
				res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
				now = new Date(+now - 2000);
			}
			return res;
		},
		generateData() {
			let res = [];
			let len = 10;
			while (len--) {
				res.push(Math.round(Math.random() * 100));
			}
			return res;
		},
		updateData() {
			setInterval(() => {
				let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
				this.data.shift();
				this.data.push(Math.round(Math.random() * 100));
				this.categories.shift();
				this.categories.push(axisData);
				this.myChart.setOption({
					xAxis: [
						{ data: this.categories }
					],
					series: [
						{ data: this.data }
					]
				});
			}, 2100);
		}
	}
};
</script>
  
<style scoped>
.chart-container {
	flex: 1;
	/* 平分父容器的宽度 */
	display: block;
	border: 2px solid var(--theme--color);
	border-radius: 15px;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.chart-container:hover {
	transform: scale(1.01);
	/* 鼠标悬浮时放大1.01倍 */
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	/* 添加阴影效果 */
}

</style>
