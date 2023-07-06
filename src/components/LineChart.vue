<template>
  <div id="LineChart" style="height: 600px"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name : "LineChart",
  mounted() {
    this.generateData()
  },
  methods: {
    generateData() {
      const chart = echarts.init(document.getElementById('LineChart'))

      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };
      chart.setOption(option)
    }
  }
}
</script>

<style>
#LineChart {
  width: 100%;
}
</style>
