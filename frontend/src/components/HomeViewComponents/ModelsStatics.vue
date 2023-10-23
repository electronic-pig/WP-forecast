<template>
    <div class="centered-content">
        <div class="title-box">
            <p class="title">Models Statics</p>
        </div>
        <h2 style="font-weight: bold;font-size: 40px;margin: 10px; color: rgb(75, 124, 189);">模型表现</h2>
    </div>
    <div class="numbers-container">
        <div class="number">
            <div class="large-number">91</div>
            <div class="text">模型表现</div>
        </div>
        <div class="number">
            <div class="large-number">92</div>
            <div class="text">模型表现</div>
        </div>
        <div class="number">
            <div class="large-number">93</div>
            <div class="text">模型表现</div>
        </div>
        <div class="number">
            <div class="large-number">94</div>
            <div class="text">模型表现</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showTitle: false,
        };
    },
    methods: {
        handleScroll(event) {
            if (event.deltaY > 0) {
                // 鼠标向下滚动
                this.showTitle = false;
            } else {
                // 鼠标向上滚动
                this.showTitle = true;
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
    background: linear-gradient(to right, #8c00ff, #00e5ff);
    background-clip: text;
    /* Webkit浏览器需要添加此属性 */
    color: transparent;
    /* 将文字颜色设置为透明，以使渐变颜色显示在文字上 */
    /* display: inline; */
    font-size: 100px;
    font-weight: 200;
}

.text {
    color: #181818;
    font-size: x-large;
    font-weight: bold;
    margin-top: 10px;
}
</style>