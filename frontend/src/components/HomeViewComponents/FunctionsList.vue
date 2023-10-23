<template>
    <div class="centered-content">
        <div class="title-box">
            <p class="title">Functions list</p>
        </div>
        <h2 style="font-weight: bold;font-size: 40px;margin: 10px; color: rgb(75, 124, 189);">功能列表</h2>
        <p style="color: #65676b; font-size: 24px;">掌握国土资源利用和土地覆盖类型，是地理国情普查与监测的重要内容</p>
    </div>
    <div class="card-container">
        <div class="card" v-for="(card, index) in cards" :key="index">
            <div class="image-container">
                <img :src="require(`@/assets/image/${card.imageUrl}`)" :alt="card.altText" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cards: [
                {
                    imageUrl: 'rain.gif',
                    altText: 'Card 1',
                },
                {
                    imageUrl: 'rain.gif',
                    altText: 'Card 2',
                },
                {
                    imageUrl: 'rain.gif',
                    altText: 'Card 3',
                },
                {
                    imageUrl: 'rain.gif',
                    altText: 'Card 4',
                },
            ],
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

.card-container {
    margin: 0 100px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    /* 用于控制卡片之间的间距 */
}

.card {
    width: 280px;
    height: 330px;
    background-color: rgb(233, 248, 254);
    border-radius: 15px;
    margin: 0 10px;
}

.image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    border-radius: 10px;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    /* 图像在容器内居中显示并保持宽高比 */
}
</style>