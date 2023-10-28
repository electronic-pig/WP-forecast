<template>
    <div class="upload-container">
        <div class="video-wrapper">
            <video class="video" ref="videoElement" controls style="border-radius: 15px;width: 80vw;">
                <source :src="require('@/assets/video/' + currentVideoSrc)" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
    <el-button type="primary" @click="previousVideo" style="margin-left: 2vw;">上一个</el-button>
    <el-button type="primary" @click="nextVideo" style="margin-left: 71vw;">下一个</el-button>
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
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.video-wrapper {
    display: flex;
    align-items: center;
}
</style>
