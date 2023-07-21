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
      <span class="block" style="margin-left: 100px;">
        <span class="demonstration">选择时段：</span>
        <el-date-picker v-model="value1" type="datetimerange" range-separator="——" start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </span>
    </div>

    <!-- 函数图像区域 -->
    <div class=" contentArea" style="margin-top: 6px;margin-bottom: 12px;height: 760px;">
      <LineAndBarChart :data="fileData"></LineAndBarChart>
    </div>
  </div>
</template>

<script>
import LineAndBarChart from "@/components/LineAndBarChart";
export default {
  name: "PowerPredict",
  props: {
    fileData: {
      type: Array,
      required: true
    },
  },
  components: {
    LineAndBarChart
  },
  data() {
    return {
      chartData: [],
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

.title-area {
  // display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin-right: auto;
}
</style>
  