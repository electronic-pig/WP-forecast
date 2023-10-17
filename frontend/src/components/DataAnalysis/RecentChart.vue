<template>
    <div class="wind-power-chart">
        <div id="chart" class="chart-container"></div>
    </div>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            chart: null,
            chartDom: null,
            // 模拟的风机数据，实际使用时替换为真实数据
            windFarmData: null,
        };
    },
    mounted() {
        this.chartDom = document.getElementById('chart');
        this.windFarmData = this.generateRandomData();
        this.chart = echarts.init(this.chartDom);
        this.initChart();
        this.chart.dispatchAction({
            type: 'restore'
        });
    },
    methods: {
        initChart() {
            // 构建图表配置项
            const option = {
                title: {
                    text: '风机发电功率趋势',
                    subtext: '近3个月数据',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {},
                        magicType: { show: true, type: ['line', 'bar'] }
                    }
                },
                legend: {
                    data: ['月份1', '月份2', '月份3'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: Array.from({ length: 10 }, (_, index) => `风机${index + 1}`),
                },
                yAxis: {
                    type: 'value',
                },
                series: Array.from({ length: 3 }, (_, monthIndex) => ({
                    name: `月份${monthIndex + 1}`,
                    type: 'bar',
                    data: this.windFarmData.map(item => item.data[monthIndex]),
                })),
            };
            // 使用刚指定的配置项和数据显示图表。
            this.chart.setOption(option);
        },

        generateRandomData() {
            const generateRandomNumber = () => Math.floor(Math.random() * (150 - 80 + 1)) + 80;

            return Array.from({ length: 10 }, () => ({
                name: '风机',
                data: [generateRandomNumber(), generateRandomNumber(), generateRandomNumber()],
            }));
        },
    },
};
</script>
  
<style scoped>
.chart-container {
    width: 100%;
    height: 400px;
    /* 根据需要设置图表高度 */
}
</style>