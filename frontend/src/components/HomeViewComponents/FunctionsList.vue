<template>
    <div class="centered-content" ref="content" :class="{ animate: isVisible }">
        <div class="title-box">
            <p class="title">Functions list</p>
        </div>
        <h2 style="font-weight: bold;font-size: 44px;margin: 10px; color: rgb(75, 124, 189);">功能列表</h2>
        <p style="color: #65676b; font-size: 24px;">使用AI为风力发电赋能，是加速AI落地的重要举措</p>
    </div>
    <div class="card-container" ref="content" :class="{ animate: isVisible }">
        <div class="card" :class="{ animate: card1Visible }">
            <div class="image-container">
                <img src="@/assets/image/screenShot/screenShot1.png" />
                <p class="text" @click="routerToPowerPredict">功率预测</p>
            </div>
        </div>
        <div class="card" :class="{ animate: card2Visible }">
            <div class="image-container">
                <img src="@/assets/image/screenShot/screenShot2.png" />
                <p class="text">数据分析</p>
            </div>
        </div>
        <div class="card" :class="{ animate: card3Visible }">
            <div class="image-container">
                <img src="@/assets/image/screenShot/screenShot3.png" />
                <p class="text">定点预测</p>
            </div>
        </div>
        <div class="card" :class="{ animate: card4Visible }">
            <div class="image-container">
                <img src="@/assets/image/screenShot/screenShot4.png" />
                <p class="text">风机管理</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isVisible: false,
            card1Visible: false,
            card2Visible: false,
            card3Visible: false,
            card4Visible: false
        };
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
                setTimeout(() => {
                    this.card1Visible = true;
                }, 0);
                setTimeout(() => {
                    this.card2Visible = true;
                }, 200);
                setTimeout(() => {
                    this.card3Visible = true;
                }, 400);
                setTimeout(() => {
                    this.card4Visible = true;
                }, 600);
                // 停止监听滚动事件，因为我们已经触发了回调
                window.removeEventListener('scroll', this.handleScroll);
            }
        },

    },
};
</script>

<style scoped>
.centered-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
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
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: 18px;
    display: inline-block;
    margin: 0;
}

.card-container {
    margin: 0 100px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    opacity: 0;
}

.card {
    width: 280px;
    height: 330px;
    background-color: rgb(233, 248, 254);
    border-radius: 15px;
    margin: 0 10px;
    opacity: 0;
    transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
    cursor: pointer;
}

.text {
    color: #666666;
    font-size: 20px;
    font-weight: bold;
    margin: 15px 85px;
    transition: color 0.4s ease;
}

.text:hover {
    cursor: pointer;
    color: #0b82d2;
}

.image-container {
    width: 100%;
    height: 100%;
    margin: 0 10px;
    margin-top: 10px;
}

img {
    border-radius: 10px;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    /* 图像在容器内居中显示并保持宽高比 */
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

.animate {
    animation: slideInFromBottom 1s ease forwards;
}
</style>