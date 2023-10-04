<template>
  <div style="background-color: #f7f7f3;">
    <div class="container">
      <div class="inputarea" style="display: flex;justify-content: center;align-items: center;">
        <div>
          <img src="../assets/image/logo/logo.png" style="width: 70px;height: 70px;">
          <hr class="paradivide">
          <h2 class="logintitle">风电功率预测</h2>
          <hr class="paradivide">
          <hr class="paradivide">
          <form @submit.prevent="login">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="width: 160px;"><label for="username">用户名：</label></td>
                  <td><el-input type="text" id="username" v-model="username" required placeholder="请输入账号"></el-input></td>
                </tr>
                <tr>
                  <td><label for="password">密码：</label></td>
                  <td><el-input type="password" id="password" v-model="password" required show-password placeholder="请输入密码"></el-input></td>
                </tr>
            
            </table>
            <hr class="paradivide">
            <el-button type="primary" @click="register" style="width: 80px;">注册</el-button>
          </form>
            <hr class="paradivide">
            <el-button @click="toLogin" type="warning" style="width: 80px;" >返回登录</el-button>
            <hr class="paradivide">
            <p class="note">川带反卷组 ：杨耀坤，李爱冰，李阳，赖周友</p>
          </div>       

        </div>

      </div>

    </div>

    <!-- <div>
      <h1>注册页面</h1>
      <form @submit.prevent="register">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required>
        <br>
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" required>
        <br>
        <button type="submit">注册</button>
        <hr class="paradivide">
        <button @click="toLogin">返回登录</button>
      </form>
      
    </div> -->
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
        register() {
        // 在这里处理登录逻辑，例如发送登录请求到后端
        // console.log('用户名：', this.username);
        // console.log('密码：', this.password);
        // // 清空输入框
        // this.username = '';
        // this.password = '';

        axios.get('http://localhost:8081/register?username='+this.username+"&password="+this.password)
        .then(response => {
          // 处理响应数据
          // console.log(response.data);
          
          if(response.data.username!=null && response.data.username!=""){
            localStorage.setItem("user",JSON.stringify(response.data));
          }
          this.$router.push('/MainFrame')
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });
      },
      toLogin() {
        this.$router.push('/LoginView')
      }
    }
  };
  </script>
  
  <style scoped>
  *{
    padding: 0;
    margin: 0;
  }

  .paradivide{
    border: none;
    margin: 10px 0;
  }
  .container{
    width:100%;
    display: flex;
    justify-content: center; 
    overflow: hidden;
  }
  .inputarea{
    width: 600px;
    background-color: white;
    text-align: center;
    height: calc(100vh - 80px);
    padding: 50px;
    border-radius: 20px;
  }
  .logintitle{
    color: #5675e2;
  }
  tr{
    height: 40px;
  }
  td{
    padding: 10px
  }
  .loginButton{
    text-decoration: none;
    padding: 10px 20px;
    background-color: #5675e2;
    border-radius: 5px;
    width: 80px;
  }
  .note{
      font-size: xx-small;
      color: #646975;
  }
  </style>
  