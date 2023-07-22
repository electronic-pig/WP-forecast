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
        return [timestamp, item[10], item[11]]; // 返回转换后的数据
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
          },
          formatter: function (params) {
            // params 包含数据点和系列的信息
            const timestamp = params[0].value[0];
            const yValue = params[0].value[1];
            const mark = params[0].data.name; // 数据点的标注信息，即额外的信息
            const date = new Date(timestamp);
            const dateTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            const formattedDateTime = dateTimeFormatter.format(date);
            // 确定圆点的颜色
            if (params[0].componentIndex === 0) {
              let dotColor;
              if (mark === '原始数据') {
                dotColor = '#3A5FCD'; // 蓝色
              } else if (mark === '修正数据') {
                dotColor = '#FF6347'; // 红色
              } else if (mark === '补充数据') {
                dotColor = '#CD9B1D'; // 黄色
              } else {
                dotColor = 'black'; // 其他颜色
              }
              // 自定义提示框内容
              return `
                <div style="text-align: left">
                  ${formattedDateTime}<br/>
                  <span style="color: ${dotColor}; font-size: 22px; margin-right: 2px;">●</span><span">功率：</span><span style="float: right; font-weight: bold">${yValue}</span><br/>
                  <span style="color: ${dotColor}; font-size: 22px; margin-right: 2px;">●</span><span>标注：</span><span style="float: right; font-weight: bold">${mark}</span>
                </div>`}
            else {
              return `
                <div style="text-align: left">
                  ${formattedDateTime}<br/>
                  <span style="color: OrangeRed; font-size: 22px; margin-right: 2px;">●</span><span">预测功率：</span><span style="float: right; font-weight: bold">${yValue}</span><br/>
                </div>`
            }
          },
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
            start: 99,
            end: 100
          },
        ],
        series: [
          {
            name: '原始功率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.convertedData.map(([timestamp, yValue, mark]) => ({
              name: mark === '0\r' ? '原始数据' : mark === '1\r' ? '修正数据' : '补充数据',
              value: [timestamp, yValue],
              symbol: mark === '0\r' ? 'none' : mark === '1\r' ? 'circle' : 'triangle', // 自定义不同类型数据的标记点形状
              symbolSize: 6, // 自定义标记点的大小
              itemStyle: {
                color: mark === '0\r' ? '#3A5FCD' : mark === '1\r' ? '#FF6347' : '#CD9B1D', // 自定义不同类型数据的标记点颜色
              },
            })),
            tooltip: {
              show: true,
            }
          },
          {
            name: '预测功率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            color: 'OrangeRed',
            data: this.convertedPridictData, // 使用转换后的数据
            tooltip: {
              show: true,
              trigger: 'axis',
              position: function (pt) {
                return [pt[0], '30%'];
              },
            }
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style></style>
