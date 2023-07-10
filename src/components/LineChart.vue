<template>
  <div id="LineChart" style="width: 100%; height: 750px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import convertToTimestamp from '@/utils/convertToTimestamp.js'
export default {
  name: 'LineChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      convertedData: [] // 存储转换后的数据
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
        this.renderChart();
      }
    }
  },
  methods: {
    convertDataToTimestamp() {
      this.convertedData = this.data.map(item => {
        const dateString = item[0];
        const timestamp = convertToTimestamp(dateString); // 使用提供的函数进行转换
        return [timestamp, item[1]]; // 返回转换后的数据
      });
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
        legend:{},
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
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
          left: '3%',
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
            name: '功率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.convertedData // 使用转换后的数据
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style></style>
