<template>
    <div class="center-container">
        <div class="animated-text">
            <h1>风电功率预测及可视化平台</h1>
            <h3>Wind power prediction and visualization platform</h3>
        </div>
        <div class="btn-container animated-text">
            <button class="btn-hover btn-color" @click="redirectToPowerPredict">开始使用</button>
        </div>
    </div>
</template>

<script>
export default {
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
.center-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
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

.btn-hover.btn-color {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
</style>