<template>
  <div class="home">
    <HomeScene class="HomeScene" />
    <div class="logo-container">
      <img class="logo-image" src="@\assets\image\logo\logo.gif" alt="logo Image" style="height: 250px;">
    </div>
    <h1>风电功率预测系统</h1>
    <div class="btn-container">
      <button class="btn-hover color-9" @click="redirectToPowerPredict">开始使用</button>
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
  padding: 0;
  margin-top: 0;
  font-family: 'Source Han Sans SC';
  font-weight: bold;
  color: rgb(63, 129, 200);
  letter-spacing: 2px;
  font-size: 80px;
  text-align: center;
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

.logo-container {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
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
</style>
