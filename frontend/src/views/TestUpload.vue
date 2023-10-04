<template>
    <div>
      <h1>测试文件上传</h1>
      <form @submit.prevent="upload">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required>
        <br>
        <label for="fanid">风机号：</label>
        <input type="text" id="fanid" v-model="fanid" required>
        <br>
        <label for="predictlen">预测长度：</label>
        <input type="text" id="predictlen" v-model="predictlen" required>
        <br>
        <label for="csvfile">文件：</label>
        <input type="file" id="csvfile" @change="fileupload" required>
        <br>
        <button type="submit">上传</button>
      </form>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        fanid: '',
        predictlen:'',
        csvfile:''
      };
    },
    methods: {
        fileupload(){
            this.csvfile = event.target.files[0]; // 获取用户选择的文件列表
        },
        upload() {
            console.log(this.csvfile)
            const fd = new FormData()
            fd.append("username",this.username);
            fd.append("fanid",this.fanid);
            fd.append("predictlen",this.predictlen);
            fd.append("csvfile",this.csvfile);
            axios.post('http://localhost:8081/upload',fd)
            .then(response => {
                // 处理响应数据
                console.log(response.data);
            })
            .catch(error => {
                // 处理错误
                console.error(error);
            });
        },
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
  .paradivide{
    border: none;
    margin: 10px 0;
}
  </style>
  