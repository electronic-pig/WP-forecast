<template>
  <div id="LineChart" style="width: 100%; height: 750px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import convertToTimestamp from '@/utils/convertToTimestamp.js';
export default {
  name: 'LineChart',
  props: {
    data: {
      type: Array,
      required: true
    },
    pridictData: {
      type: Array
    }
  },
  data() {
    return {
      // 存储转换后的数据
      convertedData: [],
      convertedPridictData: []
    };
  },
  mounted() {
    this.convertDataToTimestamp();
    this.renderChart();
  },
  watch: {
    data: {
      immediate: false,
      handler() {
        this.convertDataToTimestamp();
        console.log(this.convertedData);
        this.renderChart();
      }
    },
    pridictData: {
      immediate: false,
      handler() {
        this.convertDataToTimestamp();
        this.renderChart();
      }
    }
  },
  methods: {
    convertDataToTimestamp() {
      this.convertedData = this.data.map(item => {
        const dateString = item[0];
        const timestamp = convertToTimestamp(dateString); // 使用提供的函数进行转换
        return [timestamp, item[9], item[11]]; // 返回转换后的数据
      });
      this.convertedPridictData = this.pridictData.map(item => {
        const dateString = item[0];
        const timestamp = convertToTimestamp(dateString); // 使用提供的函数进行转换
        return [timestamp, item[1]];
      })
    },
    renderChart() {
      const LineChart = document.getElementById('LineChart');
      const chart = echarts.init(LineChart);
      const option = {
        title: {
          left: 'left',
          text: '功率数据',
          textStyle: {
            fontSize: 25,
            color: "#3A5FCD"
          },
        },
        legend: {},
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '30%'];
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: '4%',
          right: '1%',
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: false
        },
        dataZoom: [
          {
            type: 'slider',
            start: 0,
            end: 1
          },
        ],
        series: [
          {
            name: '原始功率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.convertedData.map(([timestamp, yValue, mark]) => ({
              name: mark === '0\r' ? '无错误' : mark === '1\r' ? '错误数据' : '补充数据',
              value: [timestamp, yValue],
              symbol: mark === '0\r' ? 'none' : mark === '1\r' ? 'circle' : 'triangle', // 自定义不同类型数据的标记点形状
              symbolSize: 6, // 自定义标记点的大小
              itemStyle: {
                color: mark === '0\r' ? '#3A5FCD' : mark === '1\r' ? '#FF6347' : '#CD9B1D', // 自定义不同类型数据的标记点颜色
              },
            })),
          },
          {
            name: '预测功率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            color: 'OrangeRed',
            data: this.convertedPridictData // 使用转换后的数据
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style></style>