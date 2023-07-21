<template>
    <div class="container">
        <h1>历史记录</h1>
        <hr class="paradivide">
        <p class="note">在这里查看你的历史记录</p>
        <hr class="paradivide">
        <div style="width: 100%;">
            <table style="width: 100%;border-collapse: collapse;">
                <tr class="tablehead">
                    <td style="width: 50px;"><img src="../../assets/image/svg/菜单.svg" style="width: 30px;height: 30px;" alt="SVG Image"></td>
                    <td>文件名</td>
                    <td>风机号</td>
                    <td>预测长度</td>
    
                    <td style="width: 100px;">操作</td>
                </tr>
                <tr class="tablebody" v-for="(item, index) in items" :key="index">
                    <td><img src="../../assets/image/svg/历史记录.svg" alt="SVG Image" style="width: 30px;height: 30px;"></td>
                    <td class="highlight">{{ item.filename }}</td>
                    <td>{{ item.fanid }}</td>
                    <td>{{ item.predictlen }}</td>
                    <td><button class="btn">查看记录</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
  import axios from 'axios';
export default{
    data(){
        return{
            items: [],

        }
    },
    mounted() {
        // 从后端数据库获取历史的列表
        var userstr = localStorage.getItem("user");
        var user = JSON.parse(userstr)
        var username = user.username;

        // console.log(user)
        console.log(username)
        axios.get('http://localhost:8081/historylist?username='+username)
        .then(response => {
          if(response.data!=null){
            console.log(response.data)
            this.items = response.data
          }
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });
    }
}

</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.container{
    padding: 15px;
}
.paradivide{
    border: none;
    margin: 10px 0;
}
.note{
    font-size: xx-small;
    color: #5d5e62;
}
.tablehead{
    color: #414245;
    height: 20px;
    font-size: small;
}
.tablebody{
    border-radius: 20px;    
}
.tablebody:hover{
    background-color: #f3f6fb;
}
td{
    padding: 10px;
}
.btn{
    background-color: #2072e1;
    color: white;
    border-radius: 100px;
    padding: 10px 20px;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: small;
    font-weight: bold;
    cursor: pointer;
}
.highlight{
    font-weight: bold;
}


</style>