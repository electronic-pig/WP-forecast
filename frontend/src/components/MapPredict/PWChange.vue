<template>
    <div class="container">
        <div id="mchart" style="height: 400px; margin-top: 10px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            chart: null,
            options: {
                title: {
                    text: '功率风速变化',
                },
                polar: {
                    radius: '60%',
                },
                angleAxis: {
                    type: 'category',
                    data: null,
                },
                radiusAxis: {
                    min: 0,
                },
                legend: {
                    data: ['功率', '风速'],
                    top: '8%',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                series: [
                    {
                        name: '功率',
                        type: 'bar',
                        data: null,
                        coordinateSystem: 'polar',
                        stack: 'a',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        name: '风速',
                        type: 'bar',
                        data: null,
                        coordinateSystem: 'polar',
                        stack: 'a',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                ],
            }
        }
    },
    methods: {
        generateRandomData() {
            const data = [];
            for (let i = 0; i < 24; i++) {
                data.push({
                    hour: `${i < 10 ? '0' : ''}${i}:00`,
                    power: Math.round(60000 + Math.random() * 30000), // 生成随机功率数据
                    windSpeed: (Math.random() * 10).toFixed(1), // 生成随机风速数据
                });
            }
            return data;
        },
        initializechart() {
            const chartDom = document.getElementById('mchart');
            const chart = echarts.init(chartDom);
            // 生成测试数据
            const testData = this.generateRandomData();
            // 设置图表配置项
            this.options.angleAxis.data = testData.map(item => item.hour)
            this.options.series[0].data = testData.map(item => item.power),
                this.options.series[1].data = testData.map(item => item.windSpeed),
                // 使用刚指定的配置项和数据显示图表。
                chart.setOption(this.options);
            this.chart = chart;
        },
        updateData() {
            // 生成新的测试数据
            const testData = this.generateRandomData();
            this.options.angleAxis.data = testData.map(item => item.hour)
            this.options.series[0].data = testData.map(item => item.power),
                this.options.series[1].data = testData.map(item => item.windSpeed),
                // 使用刚指定的配置项和数据显示图表。
                this.chart.setOption(this.options);
        }
    },
    mounted() {
        this.initializechart()
    }
}
</script>

<style scoped>
.container {
    padding: 10px;
    justify-content: center;
    border: 2px solid var(--theme--color);
    border-radius: 15px;
}

.container:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
