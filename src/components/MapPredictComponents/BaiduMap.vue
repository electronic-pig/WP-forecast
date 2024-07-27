<template>
    <div class="bmap-container">
        <div class="title">风机选址</div>
        <baidu-map class="map" :scroll-wheel-zoom="false" type="API" :center="mapCenter" :zoom="zoomLevel"
            @click="handleMapClick">
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker :position="selectedCoordinate" :dragging="true" @dragend="handleMapClick"
                animation="BMAP_ANIMATION_BOUNCE"
                :icon="{ url: '/src/assets/icon/windmill.gif', size: { width: 100, height: 100 } }">
            </bm-marker>
        </baidu-map>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="coordinate-card">
                    <el-row>
                        <el-col :span="12" style="font-size: x-large;text-align: center;">经度: {{
                            selectedCoordinate.lng.toFixed(3) }}</el-col>
                        <el-col :span="12" style="font-size: x-large;text-align: center;">纬度: {{
                            selectedCoordinate.lat.toFixed(3) }}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-alert v-if="!showSuccessAlert" title="请点击地图或拖拽风机图标到您想要建造风机的位置" type="info" :closable="false"
                    style="flex: 1; display: flex; align-items: center; justify-content: center; height: 100%;" center
                    show-icon />
                <el-alert v-if="showSuccessAlert" title="成功定位风机，天气数据已获取，开始进行功率预测" type="success" :closable="false"
                    style="flex: 1; display: flex; align-items: center; justify-content: center; height: 100%;" center
                    show-icon />
            </el-col>
        </el-row>
    </div>
    <div class="wind-container">
        <iframe width="1800" height="800" :src="generateWindyUrl" frameborder="0"></iframe>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            mapCenter: { lng: 104.067, lat: 30.573 },
            selectedCoordinate: { lng: 104.067, lat: 30.573 },
            zoomLevel: 10, // 设置初始缩放级别
            showSuccessAlert: false
        }
    },
    methods: {
        handleMapClick(e) {
            // 获取点击位置的经纬度
            const coordinate = e.point;
            // 更新经纬度信息
            this.selectedCoordinate = coordinate;
            // 同步经纬度信息给父组件
            this.$emit("updateCoordinate", this.selectedCoordinate);
            this.showLoading(),
                setTimeout(() => {
                    this.showSuccessAlert = true;
                }, 1500);
        },
        showLoading() {
            const loadingInstance = this.$loading({
                text: '努力加载中...', // 可以设置加载时显示的文本
            });

            setTimeout(() => {
                loadingInstance.close();
            }, 1500);
        },
    },
    computed: {
        generateWindyUrl() {
            return `https://embed.windy.com/embed2.html?lat=${this.selectedCoordinate.lat}&lon=${this.selectedCoordinate.lng}&detailLat=${this.selectedCoordinate.lat}&detailLon=${this.selectedCoordinate.lng}&width=1800&height=800&zoom=8&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=true&metricWind=default&metricTemp=default&radarRange=-1&lang=zh`;
        },
    },
}
</script>
  
<style scoped>
.map {
    height: 600px;
}

.bmap-container {
    padding: 10px;
    justify-content: center;
    border: 2px solid var(--theme--color);
    border-radius: 15px;
}

.coordinate-card {
    width: 100%;
}

.wind-container {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 2px solid var(--theme--color);
    border-radius: 15px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>