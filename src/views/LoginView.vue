<template>
    <div>
      <h1>登录页面</h1>
      <form @submit.prevent="login">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required>
        <br>
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" required>
        <br>
        <button type="submit">登录</button>
      </form>
      <button @click="toRegister">注册</button>

    </div>
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
      login() {
        // 在这里处理登录逻辑，例如发送登录请求到后端
        // console.log('用户名：', this.username);
        // console.log('密码：', this.password);
        // // 清空输入框
        // this.username = '';
        // this.password = '';

        axios.get('http://localhost:8081/login?username='+this.username+"&password="+this.password)
        .then(response => {
          // 处理响应数据
          console.log(response.data);
          
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
      toRegister() {
        this.$router.push('/RegisterView')
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  label {
    margin-bottom: 10px;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
  }
  button {
    padding: 5px 10px;
  }
  </style>
  