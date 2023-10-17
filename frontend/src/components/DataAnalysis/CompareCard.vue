<template>
    <div class="dashboard">
        <div v-for="(item, index) in data" :key="index">
            <el-card >
                <div class="dashboard-item">
                    <div class="title">最高{{ item.title }}</div>
                    <div class="value">{{ item.value }}{{ unit[index] }}</div>
                    <div class="difference" :class="{ 'positive': item.difference >= 0, 'negative': item.difference < 0 }">
                        <el-icon v-if="item.difference >= 0">
                            <ArrowUpBold />
                        </el-icon><el-icon v-else>
                            <ArrowDownBold />
                        </el-icon>
                        {{ Math.abs(item.difference) }}{{ unit[index] }}相较于年平均{{ item.title }}
                    </div>
                    <div class="icon"><i :class="item.icon"></i></div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [
                { title: '功率', value: 10, average: 50, difference: 0, icon: 'el-icon-flash' },
                { title: '气温', value: 25, average: 20, difference: 0, icon: 'el-icon-temperature' },
                { title: '风速', value: 30, average: 25, difference: 0, icon: 'el-icon-wind' },
                { title: '气压', value: 1010, average: 1005, difference: 0, icon: 'el-icon-s-flag' },
                { title: '湿度', value: 70, average: 65, difference: 0, icon: 'el-icon-water-drop' },
            ],
            unit: ["W", "℃", "m/s", "HPa", "%"]
        };
    },
    mounted() {
        this.calculateDifferences();
    },
    methods: {
        calculateDifferences() {
            this.data.forEach(item => {
                item.difference = item.value - item.average;
            });
        },
    },
};
</script>
  
<style scoped>
.dashboard {
    display: flex;
    flex-direction: column;
}

.dashboard-item {
    text-align: center;
}

.title {
    font-weight: bold;
    color: #666;
    /* 灰色 */
    font-size: 14px;
}

.value {
    font-size: 28px;
    /* 更大的字体 */
    margin-top: 10px;
}

.difference {
    margin-top: 5px;
    display: flex;
    align-items: center;
    font-size: 18px;
    /* 较小的字体 */
}

.positive {
    color: rgb(255, 27, 27);
}

.negative {
    color: rgb(38, 124, 6);
}

.icon {
    margin-top: 10px;
}</style>
  