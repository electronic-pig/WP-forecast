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
      <el-button @click="dropdown">选择风机号</el-button>
      <select v-model="selectedNumber" v-if="showDropdown">
        <option v-for="number in numbers" :value="number.value" :key="number.value">{{ number.text }}</option>
      </select>
      <input type="text" v-model="predictionLength" placeholder="输入预测长度" />
      <el-button @click="predict" v-show="selectedNumber && isValidPredictionLength">预测</el-button>

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
import axios from 'axios';

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

      showDropdown: false, // 控制下拉选择框的显示与隐藏
      selectedNumber: '', // 选中的风机号
      numbers: [], // 下拉选择框的选项
      predictionLength: '', // 预测长度输入框的值
      csvfile: null,//选择的文件
    }
  },
  mounted(){
    // 初始化下拉选择框的选项
    for (let i = 1; i <= 20; i++) {
      this.numbers.push({ value: i, text: i });
    }
  },
  computed:{
    isValidPredictionLength() {
      // 验证预测长度为正整数
      const length = parseInt(this.predictionLength);
      return !isNaN(length) && length > 0;
    },
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
      this.csvfile = event.target.files[0];
      const result = await readCSV(file);
      this.chartData = result;
      console.log("chartdata",this.chartData);
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
    },

    dropdown() {
      this.showDropdown = true;
    },

    predict() {
      if (!this.selectedNumber) {
        // 用户未选择风机号，处理错误逻辑
        alert("用户未选择风机号")
        return;
      }

      const length = parseInt(this.predictionLength);
      if (isNaN(length) || length <= 0) {
        // 用户输入的预测长度不是正整数，处理错误逻辑
        alert("用户输入的预测长度不是正整数")
        return;
      }

      // 在这里调用相关函数进行预测
      // 将选中的风机号赋值给全局变量
      // 将预测长度传递给预测函数
      console.log(this.selectedNumber);
      this.predictionFunction();


    },

    predictionFunction(){
      let fd = new FormData() //上传数据所需的结构
      // fd.append(key,value)

      // TODO1:通过前端获取以下参数,注意参数名称不能改
      fd.append('username','yyk') //用户名
      // 如果风机id为1-10自动加10
      if(this.selectedNumber>=1 && this.selectedNumber<=10){
        fd.append('turbid',this.selectedNumber+10) //风机ID 
      }
      else{
        fd.append('turbid',this.selectedNumber) //风机ID 
      }

      fd.append('outputLen',this.predictionLength) //输出长度
      
      // 绑定文件
      // TODO2:只需要上传最后672个数据，前端需要截取最后672个数据,为了便捷可以截取最后700个数据
      fd.append('file',this.csvfile)
      
      // console.log(this.csvfile)
      axios({
          method:'POST',
          url:'http://127.0.0.1:8001/compute/1',//此处的端口与django启动端口需要一致
          data:fd,
          contentType: false,
          processData: false,

      }).then(response => {
          console.log(response.data)
          // 将response.data的值附在表格数据的后面
          let responsedata = this.objectToArray(response.data);
          let data = this.mergedata(this.chartData,responsedata);
          // console.log(this.chartData);
          // console.log(data);
          // 将data赋值给chartData
          this.chartData = data;
      })
    },

    // 将对象形式的数据转成数组形式的数据
    objectToArray(data){
      let dataArray = Object.values(data).map((item) => item);
      return(dataArray)
    },

    mergedata(data, result){

      // result 数组进行预处理
      const processedResult = result.map((item) => {
        const dateTime = item.DATATIME.replace("T", " "); // 将 "T" 替换为空格
        const lastColumn = `${item.YD15}\r`; // 在最后一列数据后添加 "\r"

        return {
          DATATIME: dateTime,
          YD15: lastColumn
        };
      });

      // 将 processedResult 数据作为新的行添加到 data 数组
      processedResult.forEach((item) => {
        const newRow = [
          item.DATATIME.toString(),
          ...Array(8).fill("0"),
          item.YD15.toString()
        ];

        data.push(newRow);
      });

      return data;

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
  