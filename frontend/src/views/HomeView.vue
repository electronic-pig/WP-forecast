<template>
  <div class="home">
    <HomeScene class="HomeScene" />
    <el-row type="flex" justify="center" style="color: rgb(75, 124, 189);">
      <el-col :span="3"><span id="subtitle">功率预测</span></el-col>
      <el-col :span="5"><span id="subtitle">数据分析</span></el-col>
      <el-col :span="2"><img id="logo" :src="require('@/assets/image/logo/logo.gif')" title="点击前往功能区" /></el-col>
      <el-col :span="5"><span id="subtitle">定点预测</span></el-col>
      <el-col :span="3"><span id="subtitle">风机管理</span></el-col>
    </el-row>
    <div class="animated-text">
      <h1>风电功率预测及可视化平台</h1>
      <h3>Wind power prediction and visualization platform</h3>
    </div>
    <div class="btn-container animated-text">
      <button class="btn-hover color-9" @click="redirectToPowerPredict">开始使用</button>
    </div>
    <div class="centered-content">
      <div class="title-box">
        <p class="title">Functions list</p>
      </div>
      <h2 style="font-weight: bold;font-size: 40px;margin: 10px;">功能列表</h2>
      <p style="color: #65676b">掌握国土资源利用和土地覆盖类型，是地理国情普查与监测的重要内容</p>
    </div>
  </div>
</template>

<script>
import HomeScene from '@/components/HomeScreen'
export default {
  name: 'HomeView',
  components: {
    HomeScene
  },
  methods: {
    redirectToPowerPredict() {
      const loadingInstance = this.$loading({
        text: '努力加载中...', // 可以设置加载时显示的文本
      });

      // 模拟异步操作
      setTimeout(() => {
        loadingInstance.close(); // 关闭 loading
      }, 1500);
      setTimeout(() => {
        this.$router.push('/PowerPredict'); // Redirect to the desired route
      }, 1000);

    },
  }
}
</script>

<style scoped>
.home {
  overflow: hidden
}

h1 {
  line-height: 0%;
  padding: 0;
  margin-top: 90px;
  font-family: 'Microsoft Yahei';
  font-weight: bold;
  color: rgb(75, 124, 189);
  letter-spacing: 8px;
  font-size: 80px;
  text-align: center;
}

h3 {
  padding: 0;
  font-family: 'Microsoft Yahei';
  font-weight: bold;
  color: rgb(75, 124, 189);
  letter-spacing: 4px;
  font-size: 30px;
  text-align: center;
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated-text {
  animation: slideInFromBottom 1s ease forwards;
}

.HomeScene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* Set a lower z-index to ensure it's in the background */
}

.el-col {
  line-height: 130px;
  text-align: center;
  height: 150px;
  font-weight: bold;
  font-family: SimHei sans-serif;
}

#logo {
  margin-top: 20px;
  height: 100px;
  cursor: pointer;
}

#subtitle {
  font-size: 22px;
  position: relative;
  display: inline;
  padding-bottom: 3px;
  letter-spacing: 2px;
  cursor: pointer;
}

#subtitle::after {
  content: "";
  width: 0px;
  height: 3px;
  background: #007ee6;
  position: absolute;
  top: 100%;
  left: 50%;
  right: 50%;
  transition: all 0.5s;
}

#subtitle:hover:after {
  left: 0%;
  right: 0%;
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
  margin-bottom: 200px;
}

.btn-hover {
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 55px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 50px;
  transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-9 {
  background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}

.centered-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-box {
  background-color: #c6e3f6;
  /* 浅灰色背景 */
  padding: 2px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  /* 设置为内联块元素，高度与文本内容匹配 */
}

.title {
  background: linear-gradient(to right, #0000FF, #00BFFF);
  /* 深蓝到浅蓝的渐变 */
  -webkit-background-clip: text;
  color: transparent;
  /* 使文本颜色透明 */
  font-weight: bold;
  /* 加粗文本 */
  display: inline-block;
  margin: 0;
}
</style>
