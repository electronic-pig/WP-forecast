<template>
    <div class="chart-container">
        <div id="chart" style="width: 100%; height: 400px;"></div>
    </div>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            windFarmData: null,
        };
    },
    mounted() {
        this.windFarmData = this.generateRandomData();
        const chartDom = document.getElementById('chart');
        const chart = echarts.init(chartDom);
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
                    restore: { show: true },
                    saveAsImage: { show: true },
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
        chart.setOption(option);
    },
    methods: {
        generateRandomData() {
            const generateRandomNumber = () => Math.floor(Math.random() * (150 - 80 + 1)) + 80;

            return Array.from({ length: 10 }, () => ({
                data: [generateRandomNumber(), generateRandomNumber(), generateRandomNumber()],
            }));
        },
    },
};
</script>
  