<template>
    <video class="video" ref="videoElement" controls>
        <source :src="require('@/assets/video/' + currentVideoSrc)" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div style="display: flex; justify-content: space-between;">
        <el-button type="primary" @click="previousVideo">上一个</el-button>
        <el-button type="primary" @click="nextVideo">下一个</el-button>
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
.video {
    width: 100%;
    border: 2px solid var(--theme--color);
    border-radius: 10px;
}
</style>
