<template>
	<div class="chart-container">
		<p class="power-label">当前实时功率</p>
		<div ref="chart" style="width: 100%; height: 360px;"></div>
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
			categories2: [],
			data: [],
			data2: [],
			option: {
				title: {
					text: 'Dynamic Data'
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
					},
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
						name: 'Price',
						max: 30,
						min: 0,
						boundaryGap: [0.2, 0.2]
					},
					{
						type: 'value',
						scale: true,
						name: 'Order',
						max: 1200,
						min: 0,
						boundaryGap: [0.2, 0.2]
					}
				],
				series: [
					{
						name: 'Dynamic Bar',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: []
					},
					{
						name: 'Dynamic Line',
						type: 'line',
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
			this.categories2 = this.generateCategories2();
			this.data = this.generateData();
			this.data2 = this.generateData2();

			this.option.xAxis[0].data = this.categories;
			this.option.xAxis[1].data = this.categories2;
			this.option.series[0].data = this.data;
			this.option.series[1].data = this.data2;

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
		generateCategories2() {
			let res = [];
			let len = 10;
			while (len--) {
				res.push(10 - len - 1);
			}
			return res;
		},
		generateData() {
			let res = [];
			let len = 10;
			while (len--) {
				res.push(Math.round(Math.random() * 1000));
			}
			return res;
		},
		generateData2() {
			let res = [];
			let len = 0;
			while (len < 10) {
				res.push(+(Math.random() * 10 + 5).toFixed(1));
				len++;
			}
			return res;
		},
		updateData() {
			setInterval(() => {
				let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
				this.data.shift();
				this.data.push(Math.round(Math.random() * 1000));
				this.data2.shift();
				this.data2.push(+(Math.random() * 10 + 5).toFixed(1));
				this.categories.shift();
				this.categories.push(axisData);
				this.categories2.shift();
				this.categories2.push(this.app.count++);
				this.myChart.setOption({
					xAxis: [
						{ data: this.categories },
						{ data: this.categories2 }
					],
					series: [
						{ data: this.data },
						{ data: this.data2 }
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

.power-label {
	text-align: left;
	font-size: 20px;
	font-weight: bold;
	margin-top: 5px;
	margin-bottom: 5px;
	/* 调整与图表的间距 */
	text-align: center;
}
</style>
