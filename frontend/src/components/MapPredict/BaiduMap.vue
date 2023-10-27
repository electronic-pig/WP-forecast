<template>
    <div class="bmap-container">
        <div class="title">百度地图选点</div>
        <baidu-map class="map" scroll-wheel-zoom=true type="API" :center="mapCenter" :zoom="zoomLevel"
            @click="handleMapClick">
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker :position="selectedCoordinate" :dragging="true" @dragend="handleMapClick"
                animation="BMAP_ANIMATION_BOUNCE" :icon="{ url: '/windmill.gif', size: { width: 100, height: 100 } }">
            </bm-marker>
        </baidu-map>
        <el-card class="coordinate-card">
            <el-row :gutter="10">
                <el-col :span="12">经度: {{ selectedCoordinate.lng }}</el-col>
                <el-col :span="12">纬度: {{ selectedCoordinate.lat }}</el-col>
            </el-row>
        </el-card>
    </div>
    <div class="wind-container">
        <iframe width="1800" height="800" :src="generateWindyUrl" frameborder="0"></iframe>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            mapCenter: { lng: 104.0668, lat: 30.5728 },
            selectedCoordinate: { lng: 104.0668, lat: 30.5728 },
            zoomLevel: 10, // 设置初始缩放级别
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
    /* width: 80%; */
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}


.coordinate-card {
    margin-top: 0px;
    width: 100%;
}

.wind-container {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    /* width: 80%; */
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>