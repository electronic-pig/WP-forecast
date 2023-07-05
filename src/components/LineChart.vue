<template>
  <div>
    <el-card>
      <div class="chart-container">
        <el-chart :data="chartData" type="line" height="400px">
          <el-tooltip></el-tooltip>
          <el-axis type="category" :data="chartData.map(item => item.time)"></el-axis>
          <el-axis type="value" :max="yAxisMagnitude"></el-axis>
          <el-line></el-line>
        </el-chart>
      </div>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      chartData: [],
      yAxisMagnitude: 100000,
    };
  },
  created() {
    this.chartData = this.generateChartData();
  },
  methods: {
    generateChartData() {
      // 生成一天内所有时段的假数据
      const chartData = [];
      const startTime = new Date(2023, 6, 5, 0, 0, 0); // 2023/7/5 00:00:00
      const interval = 15 * 60 * 1000; // 15 minutes in milliseconds
      const endTime = new Date(2023, 6, 5, 23, 59, 59); // 2023/7/5 23:59:59

      let currentTime = startTime;
      while (currentTime <= endTime) {
        const time = this.formatTime(currentTime);
        const power = this.generateRandomPower(); // 生成随机功率值
        chartData.push({ time, power });
        currentTime = new Date(currentTime.getTime() + interval);
      }

      return chartData;
    },
    formatTime(time) {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    generateRandomPower() {
      // 生成指定范围内的随机功率值
      return Math.floor(Math.random() * 90000) + 10000;
    },
  },
};
</script>


<style>
.chart-container {
  padding: 20px;
}

/* 自定义折线图的样式 */
.el-chart .el-line {
  stroke: #1890ff;
  /* 设置折线的颜色 */
  stroke-width: 2px;
  /* 设置折线的宽度 */
}
</style>
