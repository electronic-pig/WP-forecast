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
      <span>风机号：</span>
      <el-select v-model="selectedNumber" placeholder="选择风机号 " style="width: 120px;">
        <el-option v-for="number in numbers" :value="number.value" :key="number.value">{{ number.text }}</el-option>
      </el-select>
      <span class="block">
        <span class="demonstration">选择预测时长：</span>
        <el-select v-model="monthNum" placeholder="选择月数 " style="width: 100px;">
          <el-option v-for="number in monthNumRange" :value="number.value" :key="number.value">{{ number.text
          }}</el-option>
        </el-select>
        <span style="margin-left: 3px;">月</span>
        <el-select v-model="dayNum" placeholder="选择天数 " style="width: 100px;">
          <el-option v-for="number in dayNumRange" :value="number.value" :key="number.value">{{ number.text }}</el-option>
        </el-select>
        <span style="margin-left: 3px;">天</span>
        <el-select v-model="hourNum" placeholder="选择时数 " style="width: 100px;">
          <el-option v-for="number in hourNumRange" :value="number.value" :key="number.value">{{ number.text
          }}</el-option>
        </el-select>
        <span style="margin-left: 3px;">小时</span>
        <el-button @click="predictRange" type="primary" style="margin-left: 20px">预测</el-button>
      </span>
      <span class="downloadButtonContainer">
        <el-button @click='downloadCSV' type="primary">下载预测数据</el-button>
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
    csvfile: {
      type: Object,
      default: null,
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
      predictionLength: '', // 预测长度值
      user: JSON.parse(localStorage.getItem("user")),
      timeRange: null,
      monthNumRange: [],
      dayNumRange: [],
      hourNumRange: [],
      monthNum: '',
      dayNum: '',
      hourNum: ''
    }
  },
  mounted() {
    // 初始化下拉选择框的选项
    for (let i = 1; i <= 20; i++) {
      this.numbers.push({ value: i, text: i });
    }
    for (let i = 1; i <= 12; i++) {
      this.monthNumRange.push({ value: i, text: i });
    }
    for (let i = 1; i <= 30; i++) {
      this.dayNumRange.push({ value: i, text: i });
    }
    for (let i = 1; i <= 24; i++) {
      this.hourNumRange.push({ value: i, text: i });
    }
  },
  methods: {
    // 将对象形式的数据转成数组形式的数据
    objectToArray(data) {
      let dataArray = Object.values(data).map((item) => item);
      let arr = dataArray.map(obj => Object.values(obj));
      return (arr)
    },
    predictRange() {
      if (!this.selectedNumber) {
        // 用户未选择风机号，处理错误逻辑
        alert("用户未选择风机号");
        return;
      }
      if (!this.monthNum & !this.dayNum & !this.hourNum) {
        alert("用户未选择预测时长");
        return;
      }
      const length = this.monthNum * 30 * 24 * 4 + this.dayNum * 24 * 4 + this.hourNum * 4;
      this.predictionLength = length;
      this.predictionFunction();
    },
    uploadFileToservlet() {
      let fd = new FormData();
      fd.append("username", "yyk");
      fd.append("fanid", this.selectedNumber);
      fd.append("predictlen", this.predictionLength);
      fd.append("csvfile", this.csvfile);

      axios.post('http://localhost:8081/upload', fd)
        .then(response => {
          if (response.data != null) {
            console.log(response.data)
            // this.items = response.data
          }
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });
    },

    predictionFunction() {
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
    },
    async downloadCSV() {
      const response = await axios.post('http://127.0.0.1:8001/compute/2', {
        responseType: 'blob', // 声明响应的数据类型为二进制
      });

      // 创建一个Blob对象
      const blob = new Blob([response.data]);

      // 创建一个a标签并设置下载链接
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);

      // 设置下载文件的名称
      downloadLink.download = 'predict.csv';

      // 将a标签隐藏，并将其添加到DOM中
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);

      // 触发点击事件以开始下载
      downloadLink.click();

      // 下载完成后，移除a标签并释放URL对象
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
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

.downloadButtonContainer {
  float: right;
}

/* 函数图像上部功能区样式 */
.contentArea {
  position: relative;
  border: 2px solid var(--theme--color);
  padding: 10px;
  border-radius: 8px;
}

.block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 这里可以设置其他样式 */
}

.title-area {
  // display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
  