<template>
    <div class="sortTable">
        <div class="header">
            <div class="title">发电功率历史排名</div>
            <div class="time-range-buttons">
                <el-button :type="timeRange === 'year' ? 'primary' : 'default'"
                    @click="setTimeRange('year')">前一年</el-button>
                <el-button :type="timeRange === 'quarter' ? 'primary' : 'default'"
                    @click="setTimeRange('quarter')">前一季度</el-button>
                <el-button :type="timeRange === 'month' ? 'primary' : 'default'"
                    @click="setTimeRange('month')">前一个月</el-button>
            </div>
        </div>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="rank" label="平均发电功率排名" sortable></el-table-column>
            <el-table-column prop="serialNumber" label="风机序列号"></el-table-column>
            <el-table-column prop="maxPower" label="最高发电功率" sortable></el-table-column>
            <el-table-column prop="avgPower" label="平均发电功率" sortable></el-table-column>
        </el-table>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            timeRange: 'year', // 默认选择前一年
            tableData: [], // 表格数据
        };
    },
    mounted() {
        this.generateRandomData()
    },
    methods: {
        setTimeRange(range) {
            this.timeRange = range;
            this.HandleChange()
        },
        generateRandomData() {
            const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

            const generateRow = () => ({
                serialNumber: `SN${getRandomNumber(1000, 9999)}`,
                maxPower: getRandomNumber(70000, 100000),
                avgPower: getRandomNumber(50000, 70000)
            });

            const numberOfRows = 15;

            // Generate random data
            const randomData = Array.from({ length: numberOfRows }, generateRow);

            // Sort data by avgPower in descending order
            const sortedData = randomData.sort((a, b) => b.avgPower - a.avgPower);

            // Add rank to each row based on the sorted order
            this.tableData = sortedData.map((row, index) => ({ ...row, rank: index + 1 }));
        },
        HandleChange() {
            this.showLoading(),
                setTimeout(() => {
                    this.generateRandomData()
                }, 1500); // 1.5秒后执行 updateChart()
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
};
</script>
  
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 10px;
}

.title {
    font-size: 18px;
    font-weight: bold;
}

.time-range-buttons {
    display: flex;
    justify-content: flex-end;
}

.sortTable {
    margin: 10px;
}
</style>

  