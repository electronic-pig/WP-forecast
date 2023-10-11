<template>
  <el-card class="custom-card" shadow="hover">
    <div class="centered-container">
      <div class="logo left-logo">
        <img src="@/assets/image/logo/logo.svg" alt="Left Logo" />
      </div>
      <div class="content text-center">
        <h1 class="title">智慧风电</h1>
        <el-select v-model="selectedWindTurbine" placeholder="请选择风机" class="custom-dropdown">
          <el-option v-for="turbine in windTurbines" :key="turbine" :label="turbine" :value="turbine"></el-option>
        </el-select>
        <p class="text-center">
          截止到 {{ lastUpdateTime }},实时功率为：<br>
          <span class="power-data">{{ currentPower }} W</span>
        </p>
      </div>
      <div class="logo right-logo">
        <img src="@/assets/image/logo/logo.svg" alt="Right Logo" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      windTurbines: ['风机01', '风机02', '风机03', '风机04', '风机05', '风机06', '风机07', '风机08', '风机09', '风机10'],
      selectedWindTurbine: '风机01',  // 默认选中风机01
      currentPower: 0,
      lastUpdateTime: ''
    };
  },
  mounted() {
    // Update power every 1 second
    setInterval(this.updatePower, 1000);
    // Initialize power and time immediately
    this.updatePower();
  },
  methods: {
    updatePower() {
      // Generate random power change, not exceeding 100W each time
      const powerChange = Math.floor(Math.random() * 201) - 100;
      this.currentPower = Math.min(Math.max(this.currentPower + powerChange, 20000), 50000);

      // Update the last power update time
      const now = new Date();
      const formattedTime = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      this.lastUpdateTime = formattedTime;
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.custom-card {
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  margin: 5px;
  --el-card-padding: 2px;
}

.custom-card:hover {
  transform: scale(1.01);
  /* 鼠标悬浮时放大1.01倍 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
}

.centered-container {
  display: flex;
  justify-content: center;
  /* 主轴居中对齐 */
  align-items: center;
  /* 交叉轴居中对齐 */
}

.custom-dropdown {
  width: 320px;
  /* 调整下拉框的宽度为400像素，可以根据需要进行调整 */
  text-align: center;
}

.power-data {
  font-size: 64px;
  font-weight: bold;
  display: block;
  margin: auto;
}

.title {
  font-size: 40px;
  /* 调整标题字体大小 */
  margin: 10px 0;
}

.left-logo,
.right-logo {
  width: 200px;
  /* 调整logo宽度 */
  display: flex;
  align-items: center;
  /* 垂直居中 */
}

.left-logo img,
.right-logo img {
  width: 100%;
  /* 确保图片填充整个logo容器 */
}

.left-logo {
  margin-right: 50px;
  /* 设置左侧logo的右边距 */
}

.right-logo {
  margin-left: 50px;
  /* 设置右侧logo的左边距 */
}

.text-center {
  text-align: center;
  /* 文本内容居中对齐 */
  font-weight: bold;
}</style>

