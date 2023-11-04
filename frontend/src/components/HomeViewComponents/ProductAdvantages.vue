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
            <p style="font-size: 24px;font-weight: bold;color: #333;">高精模型</p>
            <p style="color: #65676b;font-size: 18px;">海量的训练和测试数据<br>
                强大的模型和快速响应时间</p>
        </div>
        <div class="card" :class="{ animate: card2Visible }">
            <vue-feather type="cast" size="80px" stroke="#059DFF" stroke-width="1" style="margin: 10px;"></vue-feather>
            <p style="font-size: 24px;font-weight: bold;color: #333">高效处理</p>
            <p style="color: #65676b;font-size: 18px;">在线处理，简洁高效<br>
                操作便捷，立等可取</p>
        </div>
        <div class="card" :class="{ animate: card3Visible }">
            <vue-feather type="map" size="80px" stroke="#059DFF" stroke-width="1" style="margin: 10px;"></vue-feather>
            <p style="font-size: 24px;font-weight: bold;color: #333">可视分析</p>
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
            if (elementTop <= windowHeight * 0.5) {
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
    padding: 2px;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
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
    transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.animate {
    animation: slideInFromBottom 1s ease forwards;
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
</style>