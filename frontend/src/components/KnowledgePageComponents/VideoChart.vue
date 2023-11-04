<template>
    <div class="container">
        <video class="video" ref="videoElement" controls>
            <source :src="`/src/assets/video/${currentVideoSrc}`" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <el-button @click="previousVideo" class="left-button">&lsaquo;</el-button>
        <el-button @click="nextVideo" class="right-button">&rsaquo;</el-button>
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
.container {
    position: relative;
    text-align: center;
}

.video {
    width: 100%;
    border: 1px solid var(--theme--color);
    border-radius: 10px;
    box-sizing: border-box;
}

.left-button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    height: 20%;
    width: 3%;
    opacity: 0.4;
    padding: 0;
    font-weight: bold;
    font-size: xx-large;
}

.right-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    height: 20%;
    width: 3%;
    opacity: 0.4;
    padding: 0;
    font-weight: bold;
    font-size: xx-large;
}
</style>
