<template data-="">
  <div>
    <div class="title-area">
      <el-row>
        <div id="sub-title">
          功率预测{{ data }}
        </div>
      </el-row>
    </div>
    <!-- 函数图像上部功能区 -->
    <div class="contentArea" style="margin-top: 10px;">

      <span>预测：</span>
      <el-select v-model="selectedNumber" placeholder="选择风机号 " style="width: 120px;">
        <el-option v-for="number in numbers" :value="number.value" :key="number.value">{{ number.text }}</el-option>
      </el-select>
      <el-input type="text" v-model="predictionLength" placeholder="输入预测长度"  style="width: 120px;"/>
      <el-button @click="predict" v-show="selectedNumber && isValidPredictionLength">预测</el-button>

      <span class="block" style="margin-left: 100px;">
        <span class="demonstration">选择时段：</span>
        <el-date-picker v-model="value1" type="datetimerange" range-separator="——" start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </span>

    </div>
    <!-- 函数图像区域 -->
    <div class=" contentArea" style="margin-top:6px;margin-bottom: 20px;">
      <LineChart :data="fileData" :pridictData="predictData"></LineChart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import axios from 'axios';

export default {
  name: "PowerPredict",
  props: {
    fileData: {
      type: Array,
      required: true
    },
  },
  components: {
    LineChart
  },
  data() {
    return {
      predictData: [],
      selectedNumber: '', // 选中的风机号
      numbers: [], // 下拉选择框的选项
      predictionLength: '', // 预测长度输入框的值
      csvfile: null,//选择的文件
      user:JSON.parse(localStorage.getItem("user")) 
    }
  },
  mounted() {
    // 初始化下拉选择框的选项
    for (let i = 1; i <= 20; i++) {
      this.numbers.push({ value: i, text: i });
    }
  },
  computed: {
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
      fileInput.name = "csvfile";
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
    
    // 将对象形式的数据转成数组形式的数据
    objectToArray(data) {
      let dataArray = Object.values(data).map((item) => item);
      let arr = dataArray.map(obj => Object.values(obj));
      return (arr)
    },
    

    uploadFileToservlet(){
      let fd = new FormData();
      fd.append("username",this.user.username);
      fd.append("fanid",this.selectedNumber);
      fd.append("predictlen",this.predictionLength);
      fd.append("csvfile",this.csvfile);

      axios.post('http://localhost:8081/upload',fd)
        .then(response => {
          if(response.data!=null){
            console.log(response.data)
            // this.items = response.data
          }
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });
    },

    predictionFunction(){
      // 先将数据提交到后端数据库
      this.uploadFileToservlet();

      let fd = new FormData() //上传数据所需的结构
      // TODO1:通过前端获取以下参数,注意参数名称不能改
      fd.append('username', 'yyk') //用户名
      // 如果风机id为1-10自动加10
      if (this.selectedNumber >= 1 && this.selectedNumber <= 10) {
        fd.append('turbid', this.selectedNumber + 10) //风机ID 
      }
      else {
        fd.append('turbid', this.selectedNumber) //风机ID 
      }
      fd.append('outputLen', this.predictionLength) //输出长度
      // 绑定文件
      // TODO2:只需要上传最后672个数据，前端需要截取最后672个数据,为了便捷可以截取最后700个数据
      fd.append('file', this.csvfile)
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8001/compute/1',//此处的端口与django启动端口需要一致
        data: fd,
        contentType: false,
        processData: false,
      }).then(response => {

        let responsedata = this.objectToArray(response.data);
        this.predictData = responsedata;
      })
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

</style>
  