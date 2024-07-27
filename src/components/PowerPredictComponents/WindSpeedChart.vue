<template>
  <div class="chart-container">
    <p class="wind-speed-label">当前实时风速</p>
    <div id="wind-speed-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    const chartDom = document.getElementById('wind-speed-chart');
    const myChart = echarts.init(chartDom);
    const option = {
      series: [
        {
          type: 'gauge',
          progress: {
            show: true,
            width: 10,
            itemStyle: {
              color: '#3498db'
            },
          },
          axisLine: {
            lineStyle: {
              width: 10,
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            length: 8,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 12,
            color: '#999',
            fontSize: 10
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
              borderColor: '#3498db' // 指针颜色
            },
          },
          pointer: {
            itemStyle: {
              color: '#3498db' // 指针颜色
            }
          },
          title: {
            show: false
          },
          detail: {
            formatter: '{value} m/s',
            valueAnimation: true,
            fontSize: 28,
            offsetCenter: [0, '70%'],
            color: '#3498db'
          },
          min: 0,  // 设置最小值为0
          max: 10, // 设置最大值为10
          data: [
            {
              value: 4.2
            }
          ]
        }
      ]
    }

    setInterval(() => {
      const random = ((4.2 + (Math.random() - 0.5) * 0.4).toFixed(1));
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: random
              }
            ]
          }
        ]
      });
    }, 2000);

    // Set the chart options
    option && myChart.setOption(option);
  }
};
</script>

<style scoped>
.chart-container {
  height: 280px;
  display: block;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.chart-container:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.wind-speed-label {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  color: #333;
}

#wind-speed-chart {
  width: 350px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
