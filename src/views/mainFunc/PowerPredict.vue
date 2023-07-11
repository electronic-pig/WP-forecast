<template>
  <div>
    <div class="title-area">
        <el-row>
          <div id="sub-title">
            功率预测
          </div>
        </el-row>
    </div>
    <!-- 函数图像上部功能区 -->
    <div class="contentArea" style="margin-top: 10px;">
      <el-button @click="handleFileUpload" type="primary">上传CSV文件</el-button>
      <span class="block" style="margin-left: 100px;">
        <span class="demonstration">选择时段：</span>
        <el-date-picker v-model="value1" type="datetimerange" range-separator="——" start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </span>

    </div>

    <!-- 函数图像区域 -->
    <div class=" contentArea" style="margin-top: 6px;height: 760px;">
      <LineChart :data="chartData"></LineChart>
    </div>

    <!-- 数据说明表格 -->
    <div class="contentArea" style="margin-top: 6px;">
      <div style=" height: 120px; overflow: auto;" class="functionDataChart">
        <table border="1">
          <tr>
            <th>日期</th>
            <th>相关系数</th>
            <th>百分比误差</th>
            <th>相对均方差误差</th>
            <th>平均误差</th>
            <th>绝对平均误差</th>
          </tr>
          <tr v-for="(row, index) in data" :key="index" :class="{ selected: index === selectedIndex }"
            @click="selectRow(index)">
            <td>{{ row.date }}</td>
            <td>{{ row.correlation }}</td>
            <td>{{ row.percentageError }}</td>
            <td>{{ row.relativeMSE }}</td>
            <td>{{ row.meanError }}</td>
            <td>{{ row.absoluteMeanError }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import readCSV from '@/utils/readCSV';
export default {
  name: "PowerPredict",
  components: {
    LineChart
  },
  data() {
    return {
      chartData: [],
      // 选中的行的index，-1代表没有行被选中
      selectedIndex: -1,
      // 表格的数据demo
      data: [
        {
          date: "2021-01-01",
          correlation: 0.95,
          percentageError: "5%",
          relativeMSE: 0.02,
          meanError: -0.01,
          absoluteMeanError: 0.03,
        },
        {
          date: "2021-01-02",
          correlation: 0.92,
          percentageError: "8%",
          relativeMSE: 0.03,
          meanError: 0.02,
          absoluteMeanError: 0.04,
        },
        {
          date: "2021-01-03",
          correlation: 0.89,
          percentageError: "11%",
          relativeMSE: 0.05,
          meanError: -0.03,
          absoluteMeanError: 0.06,
        }
      ],
      // 选择的开始时间
      startTime: {
        date: '',
        time: ''
      },
      // 选择的结束时间
      endTime: {
        date: '',
        time: ''
      },
    }
  },
  methods: {
    handleFileUpload() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.csv';
      fileInput.addEventListener('change', this.readFile);
      fileInput.click();
    },
    async readFile(event) {
      const file = event.target.files[0];
      const result = await readCSV(file);
      this.chartData = result;
    },
    // this method sets the selectedIndex to the clicked row index
    selectRow(index) {
      this.selectedIndex = index;
    },

    submit() {
      // 处理提交逻辑，可以在这里使用 startTime 和 endTime 的值
      console.log('开始时间:', this.startTime.date, this.startTime.time);
      console.log('结束时间:', this.endTime.date, this.endTime.time);
    },

    query() {
      // 查询逻辑
      console.log('查询');
    },
    print() {
      // 打印逻辑
      console.log('打印');
    },
    saveImage() {
      // 保存图片逻辑
      console.log('保存图片');
    },
    exportPowerData() {
      // 导出功率数据逻辑
      console.log('导出功率数据');
    },
    exportAnalysisData() {
      // 导出分析数据逻辑
      console.log('导出分析数据');
    }
  },
}



</script>
<style lang="less" scoped>
* {
  font-family: SimHei sans-serif;
}

#sub-title {
  font-size: 25px;
}

#sub-title:hover:after {
  left: 0%;
  right: 0%;
  width: 220px;
}

/* 函数图像上部功能区样式 */
.contentArea {
  border: 2px solid var(--theme--color);
  padding: 10px;
  border-radius: 8px;
}

table {
  border-collapse: collapse;
  width: 100%;
  /* 让表格的宽度=页面div的宽度 */
}

tr {
  background-color: white;
}

tr:hover {
  background-color: lightgray;
}

tr.selected {
  background-color: gray;
}

th,
td {
  width: calc(100% / 6);
}

.title-area {
  // display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin-right: auto;
}


</style>
  