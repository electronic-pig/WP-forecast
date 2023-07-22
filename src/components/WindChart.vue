<template>
  <div id="WindChart" style="width: 100%; height: 700px;"></div>
</template>
  
<script>
import * as echarts from 'echarts';
import convertToTimestamp from '@/utils/convertToTimestamp.js'
export default {
  name: 'WindChart',
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
        return [timestamp, item[1], item[6], item[3]]; // 返回转换后的数据
      });
    },
    renderChart() {
      const WindChart = document.getElementById('WindChart');
      const chart = echarts.init(WindChart);
      const directionMap = {};
      this.convertedData.forEach(function (entry) {
        directionMap[entry.R] = entry.R * Math.PI / 180; // 将角度值转换为弧度
      });
      const option = {
        title: {
          left: 'left',
          text: '风速风向与气压',
          textStyle: {
            fontSize: 25,
            color: "#3A5FCD"
          },
        },
        legend: {
          data: ['风速与风向', '气压']
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          },
          formatter: function (params) {
            const timestamp = params[0].value[0];
            const windSpeed = params[0].value[1];
            const WindDirection = params[0].data.symbolRotate;
            const presure = params[2].value[1];
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
            return `
                <div style="text-align: left">
                  ${formattedDateTime}<br/>
                  <span style="color: #dd65e7; font-size: 22px; margin-right: 2px;">●</span><span>风速：</span><span style="float: right; font-weight: bold">${windSpeed}节</span><br/>
                  <span style="color: #dd65e7; font-size: 22px; margin-right: 2px;">●</span><span>风向：</span><span style="float: right; font-weight: bold">${WindDirection}°</span><br/>
                  <span style="color: #9de788; font-size: 22px; margin-right: 2px;">●</span><span>气压：</span><span style="float: right; font-weight: bold">${presure}pa</span><br/>
                  </div>`}
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
            right: '4%',
          },
          xAxis: {
            type: 'time',
            boundaryGap: false
          },
          yAxis: [
            {
              type: 'value',
              name: '风速',
              axisLabel: {
                formatter: '{value} 节'
              }
            },
            {
              type: 'value',
              name: '气压',
              axisLabel: {
                formatter: '{value} pa'
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              start: 99.5,
              end: 100
            },
          ],
          series: [
            {
              name: '风速与风向',
              type: 'scatter', // 散点图
              symbol: 'pin', // 使用钉子（标记点）符号表示风速数据点
              symbolSize: 15, // 钉子（标记点）的大小
              itemStyle: {
                color: '#dd65e7', // 风速数据点的颜色
              },
              data: this.convertedData.map((item) => ({
                name: '风速与风向',
                value: [item[0], item[1]], // 风速数据点的位置
                symbolRotate: item[3], // 箭头符号的旋转角度（风向数据）
              })),
            },
            {
              name: '气压',
              type: 'bar',
              color: '#9de788',
              yAxisIndex: 1,
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' pa';
                }
              },
              data: this.convertedData.map(item => [item[0], item[2]])
            },
          ]
        };
        chart.setOption(option);
      }
    }
  };
</script>
  
<style></style>
  