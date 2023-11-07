<template>
    <div class="container" ref="content">
        <div class="left-div" :class="{ animateLeft: isVisible }">
            <div style="display: flex; align-items: center;margin-top: 40px;">
                <img class="logo" src="@/assets/image/logo/logo.gif" />
                <span class="title">风电功率预测及可视化平台</span>
            </div>
            <p style="margin: 0;color: #3c3d3f;">想要试试强大的预测功能吗？<br>马上体验一下</P>
        </div>
        <div class="right-div" :class="{ animateRight: isVisible }">
            <div class="btn-container animated-text">
                <button class="btn-hover btn-color" @click="redirectToPowerPredict">立即体验
                    <vue-feather type="arrow-right"></vue-feather></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false,
        }
    },
    mounted() {
        // 在组件挂载后，初始化滚动监听
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const element = this.$refs.content;
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const location = windowHeight * 0.9;
            if (elementTop <= location) {
                this.isVisible = true;
                // 停止监听滚动事件，因为我们已经触发了回调
                window.removeEventListener('scroll', this.handleScroll);
            }
        },
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
    },

}
</script>

<style scoped>
.container {
    margin: 30px 120px;
    display: flex;
    height: 200px;
    overflow-x: hidden;
}

.left-div {
    flex: 3;
}

.right-div {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
}

.logo {
    height: 60px;
    cursor: pointer;
}

.title {
    font-size: 25px;
    font-weight: bold;
    color: rgb(75, 124, 189)
}

p {
    color: #212223;
    font-size: 20px;
    line-height: 30px;
}

.animated-text {
    animation: slideInFromBottom 1s ease forwards;
}

.btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-hover {
    width: 150px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    border: none;
    background-size: 300% 100%;

    border-radius: 20px;
    transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
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

@keyframes slideInFromLeft {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.animateLeft {
    animation: slideInFromLeft 1s ease forwards;
}

@keyframes slideInFromRight {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.animateRight {
    animation: slideInFromRight 1s ease forwards;
}
</style>