<template>
  <div class="LineChart" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'LineChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const chartElement = this.$refs.chart;
      const chart = echarts.init(chartElement);
      const option = {
        title: {
          text: '风机功率',
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            var hour = date.getHours();
            var minutes = date.getMinutes();
            if (hour < 10) {
              hour = '0' + hour;
            }
            if (minutes < 10) {
              minutes = '0' + minutes;
            }
            var dateStr = hour + ':' + minutes;
            return dateStr + ' ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: '#1B2232'
            }
          },
          axisLabel: {
            formatter: function (value) {
              var date = new Date(value);
              var hour = date.getHours();
              var minutes = date.getMinutes();
              if (hour < 10) {
                hour = '0' + hour;
              }
              if (minutes < 10) {
                minutes = '0' + minutes;
              }
              return hour + ':' + minutes;
            },
            color: '#1B2232'
          }
        },
        yAxis: {
          name: '数据',
          nameTextStyle: {
            color: '#1B2232',
            fontSize: 15
          },
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#1B2232'
            }
          },
          axisLabel: {
            color: '#1B2232'
          }
        },
        series: [{
          name: '',
          type: 'line',
          hoverAnimation: false,
          smooth: true,
          symbolSize: 4,
          data: this.data
        }]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style>
.LineChart {
  width: 100%;
  height: 600px;
}
</style>
