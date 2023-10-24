<template>
    <div class="centered-content" ref="content" :class="{ animate: isVisible }">
        <div class="title-box">
            <p class="title">Product Advantages</p>
        </div>
        <h2 style="font-weight: bold;font-size: 44px;margin: 10px; color: rgb(75, 124, 189);">产品优势</h2>
        <p style="color: #65676b; font-size: 24px;">
            基于深度学习的方法可以通过大数据充分逼近复杂的非线性关系<br>更好地协调多种输入信息关系，处理定量和定性的信息，在准确率和效率方面展现出极大的潜力</p>
    </div>
    <div class="card-container">
        <div class="card" :class="{ animate: card1Visible }">
            <vue-feather type="activity" size="80px" stroke="#059DFF" stroke-width="1" style="margin: 10px;"></vue-feather>
            <p style="font-size: 24px;font-weight: bold;">高精模型</p>
            <p style="color: #65676b;font-size: 18px;">基于官方提供的测试样本<br>
                建筑变化类别的F1得分达到0.87611</p>
        </div>
        <div class="card" :class="{ animate: card2Visible }">
            <vue-feather type="cast" size="80px" stroke="#059DFF" stroke-width="1" style="margin: 10px;"></vue-feather>
            <p style="font-size: 24px;font-weight: bold;">高效处理</p>
            <p style="color: #65676b;font-size: 18px;">在线处理，简洁高效<br>
                操作便捷，立等可取</p>
        </div>
        <div class="card" :class="{ animate: card3Visible }">
            <vue-feather type="map" size="80px" stroke="#059DFF" stroke-width="1" style="margin: 10px;"></vue-feather>
            <p style="font-size: 24px;font-weight: bold;">可视分析</p>
            <p style="color: #65676b;font-size: 18px;">友好的图形用户界面<br>
                提供可视化的结果在线分析</p>
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
                }, 500);
                setTimeout(() => {
                    this.card3Visible = true;
                }, 1000);
                // 停止监听滚动事件，因为我们已经触发了回调
                window.removeEventListener('scroll', this.handleScroll);
            }
        },
    },
};
</script>

<style scoped>
.centered-content {
    margin-top: 200px;
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
    /* 深蓝到浅蓝的渐变 */
    background-clip: text;
    color: transparent;
    /* 使文本颜色透明 */
    font-weight: bold;
    /* 加粗文本 */
    font-size: 18px;
    display: inline-block;
    margin: 0;
}

.card-container {
    margin: 0 100px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.card {
    width: 390px;
    height: 260px;
    background-color: rgb(233, 248, 254);
    border-radius: 15px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    opacity: 0;
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