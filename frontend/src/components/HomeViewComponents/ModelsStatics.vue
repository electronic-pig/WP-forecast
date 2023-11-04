<template>
    <div class="centered-content" ref="content" :class="{ animate: isVisible }">
        <div class="title-box">
            <p class="title">Models Statics</p>
        </div>
        <h2 style="font-weight: bold;font-size: 44px;margin: 10px; color: rgb(75, 124, 189);">模型表现</h2>
        <p style="color: #65676b; font-size: 24px;">模型对10个风机的的平均预测分数为0.73468，其中3，7，11，13号风机预测精度尤佳
        </p>
    </div>
    <div class="numbers-container" ref="number">
        <div class="number" v-for="(item, index) in numbers" :key="index">
            <div class="large-number">
                {{ item.currentNumber }}
            </div>
            <div class="text">{{ item.text }}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            numbers: [
                { text: '3号风机', currentNumber: 0, targetNumber: 86 },
                { text: '7号风机', currentNumber: 0, targetNumber: 92 },
                { text: '11号风机', currentNumber: 0, targetNumber: 89 },
                { text: '13号风机', currentNumber: 0, targetNumber: 94 },
            ],
            isVisible: false,
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
            if (elementTop <= windowHeight * 0.9) {
                this.isVisible = true;
            }
            const elementNumber = this.$refs.number;
            const elementNumberTop = elementNumber.getBoundingClientRect().top;
            if (elementNumberTop <= windowHeight * 0.8) {
                this.startNumberAnimation();
                window.removeEventListener('scroll', this.handleScroll);
            }
        },
        startNumberAnimation() {
            const animationDuration = 2000; // 动画持续时间，单位毫秒

            this.numbers.forEach((numberItem) => {
                const interval = animationDuration / (numberItem.targetNumber + 1);
                const speed = (t) => 1 - Math.pow(1 - t, 2); // 使用 ease-in-out 缓动函数

                let currentStep = 0;
                const totalSteps = Math.ceil(animationDuration / interval);

                const updateNumber = () => {
                    if (currentStep < totalSteps) {
                        numberItem.currentNumber = Math.floor(speed(currentStep / totalSteps) * numberItem.targetNumber);
                        currentStep++;
                    }
                };

                setInterval(updateNumber, interval);
            });
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

.numbers-container {
    margin: 0 100px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.number {
    text-align: center;
    flex: 1;
}

.large-number {
    background: #6699FF;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 100px;
    font-weight: 400;
}

.text {
    color: #333;
    font-size: x-large;
    font-weight: bold;
    margin-top: 10px;
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