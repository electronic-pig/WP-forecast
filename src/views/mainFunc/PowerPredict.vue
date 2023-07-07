<template>
  <div>
    <!-- 标题区域，左端是标题，右端是按钮功能区 -->
    <div class="title-area">
      <Tabinfor>
        <template #left>
            <div id="sub-title">
              功率预测
              <i class="iconfont icon-dianji" />
            </div>
        </template>
      </Tabinfor>
      <div class="buttons">
        <button @click="query">查询</button>
        <button @click="print">打印</button>
        <button @click="saveImage">保存图片</button>
        <button @click="exportPowerData">导出功率数据</button>
        <button @click="exportAnalysisData">导出分析数据</button>
      </div>
    </div>
 
    <!-- 函数图像上部功能区 -->
    <div class="contentArea" style="margin-top: 10px;">
      <!-- 选择时间范围 -->
      <div>
        <div>
          <label for="start">开始时间:</label>
          <input type="date" id="start" v-model="startTime.date">
          <input type="time" v-model="startTime.time">
        </div>
        <div>
          <label for="end">结束时间:</label>
          <input type="date" id="end" v-model="endTime.date">
          <input type="time" v-model="endTime.time">
        </div>
        <button @click="submit">提交</button>
      </div>
    </div>

    <!-- 函数图像区域 -->
    <div class="contentArea" style="margin-top: 6px;height: 600px;">
      <!-- 这里是函数图像…… -->
      <!-- 函数图像demo -->
      <!-- <LineChart></LineChart> -->
      <div style="height: 100%">
        <div id="container" style="height: 100%"></div>
      </div>
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
// import LineChart from "@/components/LineChart";
// 导入echart库
import * as echarts from 'echarts';

export default {
  name: "PowerPredict",
  components: {
    Tabinfor,
    // LineChart
  },
  data() {
    return {
      lineData:{},
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

  mounted() {
    var dom = document.getElementById('container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    
    let data = [[base, Math.random() * 300]];
    
    for (let i = 1; i < 20000; i++) {
      let now = new Date((base += oneDay));
      data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    }
    
    let option = {
      tooltip: {
        trigger: 'axis',
        position: function(pt) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: 'Large Ara Chart'
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
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 20
        }
      ],
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data
        }
      ]
    };
    
    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }
    
    window.addEventListener('resize', myChart.resize);
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

.buttons {
  display: flex;
  justify-content: flex-end;

}

.buttons button {
  margin-left: 10px;
  background-color: var(--theme--color);
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 6px;
}

.buttons button:hover {
  background-color: #0056b3;
}

</style>
  