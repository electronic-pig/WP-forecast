<template>
  <div>
    <div class="title-area">
      <el-row>
        <div id="sub-title">
          气象数据
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
    <div class=" contentArea" style="margin-top: 6px;margin-bottom: 12px;height: 760px;">
      <LineAndBarChart :data="chartData"></LineAndBarChart>
    </div>
  </div>
</template>

<script>
import LineAndBarChart from "@/components/LineAndBarChart";
import readCSV from '@/utils/readCSV';
export default {
  name: "PowerPredict",
  components: {
    LineAndBarChart
  },
  data() {
    return {
      chartData: [],
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

.title-area {
  // display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin-right: auto;
}
</style>
  