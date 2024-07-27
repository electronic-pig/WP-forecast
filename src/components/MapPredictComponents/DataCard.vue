<template>
    <div class="card-container">
        <el-row>
            <el-col :span="6" v-for="(item, index) in data" :key="index">
                <el-card>
                    <div class="dashboard">
                        <div class="left-content">
                            <div class="title">最高{{ item.title }}</div>
                            <div class="value">{{ item.value }}{{ unit[index] }}</div>
                        </div>
                        <div class="right-content">
                            <img :src="`/src/assets/icon/${item.icon}`" alt="icon" />
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            data: [
                { title: '功率', value: 961201, icon: 'caihong.png' },
                { title: '气温', value: 27, icon: 'jubuduoyun.png' },
                { title: '风速', value: 15, icon: 'fengxiang.png' },
                { title: '气压', value: 1013.8, icon: 'wendu.png' },
            ],
            unit: ["W", "℃", "m/s", "hPa"]
        };
    },
};
</script>
  
<style scoped>
.title {
    font-weight: bold;
    color: #666;
    font-size: 18px;
}

.value {
    font-size: 28px;
    margin-top: 10px;
}

.card-container {
    padding: 5px;
    justify-content: center;
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-container:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.dashboard {
	display: flex;
	justify-content: space-between;
}

.left-content {
    flex: 2;
}

.right-content {
    flex: 1;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  