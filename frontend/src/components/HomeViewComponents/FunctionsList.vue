<template>
    <div class="centered-content">
        <div class="title-box">
            <p class="title">Functions list</p>
        </div>
        <h2 style="font-weight: bold;font-size: 40px;margin: 10px;">功能列表</h2>
        <p style="color: #65676b">掌握国土资源利用和土地覆盖类型，是地理国情普查与监测的重要内容</p>
    </div>
</template>
<script>
export default{}
</script>
<style>
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
    -webkit-background-clip: text;
    color: transparent;
    /* 使文本颜色透明 */
    font-weight: bold;
    /* 加粗文本 */
    display: inline-block;
    margin: 0;
}
</style>