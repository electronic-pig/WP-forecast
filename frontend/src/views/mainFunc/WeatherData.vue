<template>
  <div>
    <div class="title-area">
      <el-row>
        <div id="sub-title">
          气象数据
        </div>
      </el-row>
    </div>
    <!-- 函数图像区域 -->
    <div class=" contentArea" style="margin-top: 6px;margin-bottom: 12px;height: 705px;">
      <TemperatureChart :data="fileData"></TemperatureChart>
    </div>
    <div class=" contentArea" style="margin-top: 6px;margin-bottom: 12px;height: 705px;">
      <WindChart :data="fileData"></WindChart>
    </div>
  </div>
</template>

<script>
import TemperatureChart from "@/components/TemperatureChart";
import WindChart from "@/components/WindChart";
export default {
  name: "PowerPredict",
  props: {
    fileData: {
      type: Array,
      required: true
    }
  },
  components: {
    TemperatureChart,
    WindChart
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
  