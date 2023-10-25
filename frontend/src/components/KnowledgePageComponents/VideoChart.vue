<template>
    <div class="upload-container">
        <div class="video-wrapper">
            <el-button type="primary" @click="previousVideo" style="height: 160px;">上一个</el-button>
            <video class="video" ref="videoElement" controls width="1190" style="border-radius: 15px;">
                <source :src="require('@/assets/video/' + currentVideoSrc)" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <el-button type="primary" @click="nextVideo" style="height: 160px;">下一个</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentVideoIndex: 1,
            videoSources: [
                "video1.mp4",
                "video2.mp4",
                "video3.mp4"
            ]
        };
    },
    computed: {
        currentVideoSrc() {
            return this.videoSources[this.currentVideoIndex];
        }
    },
    methods: {
        previousVideo() {
            if (this.currentVideoIndex > 0) {
                this.currentVideoIndex--;
                this.$refs.videoElement.load(); // 重新加载视频
            }
        },
        nextVideo() {
            if (this.currentVideoIndex < this.videoSources.length - 1) {
                this.currentVideoIndex++;
                this.$refs.videoElement.load(); // 重新加载视频
            }
        }
    }
};
</script>

<style scoped>
.upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.video {
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.video:hover {
    transform: scale(1.001);
    /* 鼠标悬浮时放大1.01倍 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
}

.video-wrapper {
    display: flex;
    align-items: center;
}


.switch-button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #007ee6;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
</style>
