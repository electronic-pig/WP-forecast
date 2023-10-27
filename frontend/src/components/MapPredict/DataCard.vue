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
                            <img :src="require('@/assets/icon/' + item.icon)" alt="My Image" />
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
                { title: '功率', value: 123, icon: 'caihong.png' },
                { title: '气温', value: 456, icon: 'jubuduoyun.png' },
                { title: '风速', value: 789, icon: 'fengxiang.png' },
                { title: '气压', value: 101, icon: 'wendu.png' },
            ],
            unit: ["W", "℃", "m/s", "HPa"]
        };
    },
};
</script>
  
<style scoped>
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

.card-container {
    padding: 10px;
    justify-content: center;
    /* width: 80%; */
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-container:hover {
    transform: scale(1.01);
    /* 鼠标悬浮时放大1.01倍 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
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
  