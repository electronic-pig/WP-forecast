<template>
  <div>
    <Tabinfor>
      <template #left>
        <div id="sub-title">
          功率预测<i class="iconfont icon-dianji" />
        </div>
      </template>
    </Tabinfor>

    <!-- 函数图像上部功能区 -->
    <div class="contentArea">
      各种选项……
    </div>

    <!-- 函数图像区域 -->
    <div class="contentArea" style="margin-top: 6px;height: 600px;">
      这里是函数图像……
      <!-- 函数图像demo -->
      <div class="functiondemo"></div>
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
    <Bottominfor />
  </div>
</template>

<script>
import Tabinfor from "@/components/TabInfor";
export default {
  name: "PowerPredict",
  components: {
    Tabinfor,
  },
  data() {
    return {
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
    }
  },
  methods: {
    // this method sets the selectedIndex to the clicked row index
    selectRow(index) {
      this.selectedIndex = index;
    }, 
  }
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
}
table {
  border-collapse: collapse;
  width: 100%;
  /* make the table width equal to the div width */
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
</style>
  