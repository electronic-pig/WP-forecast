<template>
    <el-container>
        <el-aside class="el-aside" width="auto">
            <AsideVue :is-collapse="isCollapse" :active-index="activeIndex" />
        </el-aside>
        <el-main class="main-ctx">
            <el-header class="platform-header">
                <el-row align="middle" style="margin-top: 5px;">
                    <el-icon class="collapse" v-if="!isCollapse" :size="35">
                        <Fold @click="goCollapse" />
                    </el-icon>
                    <el-icon class="collapse" v-if="isCollapse" :size="35">
                        <Expand @click="goCollapse" />
                    </el-icon>
                    <TabTime />
                </el-row>
            </el-header>
            <el-menu :default-active="currentFanId" mode="horizontal" :ellipsis="false" @select="handleMenuClick">
                <el-menu-item index="add">
                    <el-icon size="20px" style="color:#085da3">
                        <Plus />
                    </el-icon>
                    <p class="fan">新增风机</p>
                </el-menu-item>
                <div class="flex-grow"></div>
                <el-menu-item v-for="fan in fans" :key="fan.id" :index="fan.id">
                    <el-icon size="20px" style="color:#085da3">
                        <ChromeFilled />
                    </el-icon>
                    <p class="fan">{{ fan.name }}</p>
                </el-menu-item>
            </el-menu>
            <div class="h-6"></div>
            <el-dialog title="新增风机表单" v-model="showAddForm">
                <el-form :model="newFan" ref="fanForm" label-width="80px">
                    <el-form-item label="风场ID:" prop="windFarmId">
                        <el-input v-model="newFan.windFarmId"></el-input>
                    </el-form-item>
                    <el-form-item label="建设地点:" prop="location">
                        <el-input v-model="newFan.location"></el-input>
                    </el-form-item>
                    <el-form-item label="风机型号:" prop="model">
                        <el-input v-model="newFan.model"></el-input>
                    </el-form-item>
                    <el-form-item label="上传文件(可选):">
                        <el-upload class="upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            multiple drag :file-list="fileList">
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                拖文件到此处，或<em>点击上传</em>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div>
                    <span class="dialog-footer">
                        <el-button @click="resetForm">重置</el-button>
                        <el-button type="primary" @click="createFan">创建</el-button>
                    </span>
                </div>
            </el-dialog>
            <el-row :gutter="12" class="card-container">
                <el-col :span="11">
                    <InfoCard :fanId="currentFanId" :deviceModel="fanInfo[currentFanId].deviceModel"
                        :location="fanInfo[currentFanId].location" :currentTime="getCurrentTimeAsString()"
                        :runStatus="fanInfo[currentFanId].runStatus" />
                </el-col>
                <el-col :span="13">
                    <RunInfo :windSpeed="runInfo[currentFanId].windSpeed"
                        :windDirection="runInfo[currentFanId].windDirection"
                        :temperature="runInfo[currentFanId].temperature" :pressure="runInfo[currentFanId].pressure"
                        :rotationSpeed="runInfo[currentFanId].rotationSpeed" :voltage="runInfo[currentFanId].voltage"
                        :current="runInfo[currentFanId].current" :power="runInfo[currentFanId].power"
                        :sunlightIntensity="runInfo[currentFanId].sunlightIntensity"
                        :humidity="runInfo[currentFanId].humidity" />
                </el-col>
            </el-row>
            <div class="alarm-table">
                <AlarmTable :id="currentFanId" />
            </div>
            <div class="data-table">
                <HistoryDataTable :id="currentFanId" />
            </div>
        </el-main>
    </el-container>
</template>
  
<script>
import "@/assets/css/app.css";
import AsideVue from "@/components/AsideVue";
import TabTime from "@/components/TabTime";
import InfoCard from "@/components/TurbineManage/InfoCard"
import RunInfo from "@/components/TurbineManage/RunInfo"
import AlarmTable from "@/components/TurbineManage/AlarmTable"
import HistoryDataTable from "@/components/TurbineManage/HistoryDataTable"
export default {
    name: "PowerPredict",
    components: {
        AsideVue,
        TabTime,
        InfoCard,
        RunInfo,
        AlarmTable,
        HistoryDataTable
    },
    data() {
        return {
            isCollapse: false,
            activeIndex: this.$route.path,
            currentFanId: "1",
            fans: [
                { id: 1, name: '风机1' },
                { id: 2, name: '风机2' },
                { id: 3, name: '风机3' },
                { id: 4, name: '风机4' },
                { id: 5, name: '风机5' },
                { id: 6, name: '风机6' },
                { id: 7, name: '风机7' },
                { id: 8, name: '风机8' },
                { id: 9, name: '风机9' },
                { id: 10, name: '风机10' },
            ],
            showAddForm: false,
            newFan: {
                windFarmId: '',
                location: '',
                model: '',
            },
            fileList: [],
            fanInfo: [
                { id: 1, deviceModel: 'LM-1894', location: '四川省成都市双流区', runStatus: 'normal' },
                { id: 2, deviceModel: 'LM-2001', location: '湖北省武汉市洪山区', runStatus: 'abnormal' },
                { id: 3, deviceModel: 'LM-1765', location: '广东省广州市天河区', runStatus: 'fault' },
                { id: 4, deviceModel: 'LM-2123', location: '江苏省南京市鼓楼区', runStatus: 'normal' },
                { id: 5, deviceModel: 'LM-1987', location: '浙江省杭州市西湖区', runStatus: 'abnormal' },
                { id: 6, deviceModel: 'LM-2245', location: '北京市朝阳区', runStatus: 'fault' },
                { id: 7, deviceModel: 'LM-1894', location: '上海市浦东新区', runStatus: 'normal' },
                { id: 8, deviceModel: 'LM-2001', location: '陕西省西安市雁塔区', runStatus: 'abnormal' },
                { id: 9, deviceModel: 'LM-1765', location: '河南省郑州市中原区', runStatus: 'fault' },
                { id: 10, deviceModel: 'LM-2123', location: '湖南省长沙市岳麓区', runStatus: 'normal' },
                { id: 11, deviceModel: 'LM-1987', location: '山东省济南市历下区', runStatus: 'abnormal' },
                { id: 12, deviceModel: 'LM-2245', location: '福建省福州市鼓楼区', runStatus: 'fault' },
                { id: 13, deviceModel: 'LM-1894', location: '广西壮族自治区南宁市青秀区', runStatus: 'normal' },
                { id: 14, deviceModel: 'LM-2001', location: '重庆市渝中区', runStatus: 'abnormal' },
                { id: 15, deviceModel: 'LM-1765', location: '云南省昆明市五华区', runStatus: 'fault' },
                { id: 16, deviceModel: 'LM-2123', location: '辽宁省沈阳市和平区', runStatus: 'normal' },
                { id: 17, deviceModel: 'LM-1987', location: '黑龙江省哈尔滨市道里区', runStatus: 'abnormal' },
                { id: 18, deviceModel: 'LM-2245', location: '吉林省长春市朝阳区', runStatus: 'fault' },
                { id: 19, deviceModel: 'LM-1894', location: '内蒙古自治区呼和浩特市回民区', runStatus: 'normal' },
                { id: 20, deviceModel: 'LM-2001', location: '青海省西宁市城中区', runStatus: 'abnormal' },
            ],
            runInfo: [
                { "windSpeed": "25 m/s", "windDirection": "N", "temperature": "28°C", "pressure": "101.3 kPa", "rotationSpeed": "1500 RPM", "voltage": "220 V", "current": "10 A", "power": "2200 W", "sunlightIntensity": "800 W/m²", "humidity": "60%" },
                { "windSpeed": "20 m/s", "windDirection": "NE", "temperature": "25°C", "pressure": "101.5 kPa", "rotationSpeed": "1400 RPM", "voltage": "210 V", "current": "9 A", "power": "2000 W", "sunlightIntensity": "750 W/m²", "humidity": "55%" },
                { "windSpeed": "18 m/s", "windDirection": "E", "temperature": "26°C", "pressure": "101.2 kPa", "rotationSpeed": "1300 RPM", "voltage": "200 V", "current": "8 A", "power": "1800 W", "sunlightIntensity": "700 W/m²", "humidity": "58%" },
                { "windSpeed": "22 m/s", "windDirection": "SE", "temperature": "27°C", "pressure": "101.0 kPa", "rotationSpeed": "1600 RPM", "voltage": "230 V", "current": "11 A", "power": "2400 W", "sunlightIntensity": "820 W/m²", "humidity": "62%" },
                { "windSpeed": "28 m/s", "windDirection": "S", "temperature": "30°C", "pressure": "100.8 kPa", "rotationSpeed": "1700 RPM", "voltage": "240 V", "current": "12 A", "power": "2600 W", "sunlightIntensity": "850 W/m²", "humidity": "65%" },
                { "windSpeed": "15 m/s", "windDirection": "SW", "temperature": "24°C", "pressure": "101.4 kPa", "rotationSpeed": "1200 RPM", "voltage": "190 V", "current": "7 A", "power": "1600 W", "sunlightIntensity": "680 W/m²", "humidity": "57%" },
                { "windSpeed": "24 m/s", "windDirection": "W", "temperature": "29°C", "pressure": "100.9 kPa", "rotationSpeed": "1800 RPM", "voltage": "250 V", "current": "13 A", "power": "2800 W", "sunlightIntensity": "880 W/m²", "humidity": "63%" },
                { "windSpeed": "16 m/s", "windDirection": "NW", "temperature": "23°C", "pressure": "101.1 kPa", "rotationSpeed": "1250 RPM", "voltage": "195 V", "current": "8.5 A", "power": "1700 W", "sunlightIntensity": "720 W/m²", "humidity": "59%" },
                { "windSpeed": "21 m/s", "windDirection": "N", "temperature": "28°C", "pressure": "101.6 kPa", "rotationSpeed": "1550 RPM", "voltage": "225 V", "current": "10.5 A", "power": "2300 W", "sunlightIntensity": "800 W/m²", "humidity": "61%" },
                { "windSpeed": "26 m/s", "windDirection": "NE", "temperature": "25°C", "pressure": "101.3 kPa", "rotationSpeed": "1450 RPM", "voltage": "215 V", "current": "9.5 A", "power": "2100 W", "sunlightIntensity": "760 W/m²", "humidity": "56%" },
                { "windSpeed": "19 m/s", "windDirection": "E", "temperature": "26°C", "pressure": "101.5 kPa", "rotationSpeed": "1350 RPM", "voltage": "205 V", "current": "8.8 A", "power": "1900 W", "sunlightIntensity": "710 W/m²", "humidity": "59%" },
                { "windSpeed": "23 m/s", "windDirection": "SE", "temperature": "27°C", "pressure": "101.2 kPa", "rotationSpeed": "1650 RPM", "voltage": "235 V", "current": "11.2 A", "power": "2500 W", "sunlightIntensity": "830 W/m²", "humidity": "64%" },
                { "windSpeed": "27 m/s", "windDirection": "S", "temperature": "30°C", "pressure": "101.0 kPa", "rotationSpeed": "1750 RPM", "voltage": "245 V", "current": "12.5 A", "power": "2700 W", "sunlightIntensity": "840 W/m²", "humidity": "66%" },
                { "windSpeed": "14 m/s", "windDirection": "SW", "temperature": "24°C", "pressure": "101.4 kPa", "rotationSpeed": "1150 RPM", "voltage": "185 V", "current": "7.5 A", "power": "1500 W", "sunlightIntensity": "670 W/m²", "humidity": "55%" },
                { "windSpeed": "25 m/s", "windDirection": "W", "temperature": "29°C", "pressure": "100.9 kPa", "rotationSpeed": "1850 RPM", "voltage": "255 V", "current": "13.5 A", "power": "2900 W", "sunlightIntensity": "890 W/m²", "humidity": "67%" },
                { "windSpeed": "17 m/s", "windDirection": "NW", "temperature": "23°C", "pressure": "101.1 kPa", "rotationSpeed": "1200 RPM", "voltage": "200 V", "current": "8 A", "power": "1600 W", "sunlightIntensity": "700 W/m²", "humidity": "58%" },
                { "windSpeed": "20 m/s", "windDirection": "N", "temperature": "28°C", "pressure": "101.6 kPa", "rotationSpeed": "1500 RPM", "voltage": "220 V", "current": "10 A", "power": "2200 W", "sunlightIntensity": "800 W/m²", "humidity": "62%" },
                { "windSpeed": "26 m/s", "windDirection": "NE", "temperature": "25°C", "pressure": "101.3 kPa", "rotationSpeed": "1400 RPM", "voltage": "210 V", "current": "9 A", "power": "2000 W", "sunlightIntensity": "750 W/m²", "humidity": "64%" },
                { "windSpeed": "18 m/s", "windDirection": "E", "temperature": "26°C", "pressure": "101.2 kPa", "rotationSpeed": "1300 RPM", "voltage": "200 V", "current": "8 A", "power": "1800 W", "sunlightIntensity": "700 W/m²", "humidity": "57%" },
                { "windSpeed": "22 m/s", "windDirection": "SE", "temperature": "27°C", "pressure": "101.0 kPa", "rotationSpeed": "1600 RPM", "voltage": "230 V", "current": "11 A", "power": "2400 W", "sunlightIntensity": "820 W/m²", "humidity": "66%" }
            ]

        };
    },
    mounted() {
        window.onresize = () => {
            this.isCollapse = document.documentElement.clientWidth <= 1100;
        };
        document.body.style.overflow = "hidden";
    },
    updated() {
        this.activeIndex = this.$route.path
    },
    methods: {
        goCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        handleMenuClick(index) {
            if (index === 'add') {
                this.showAddForm = true;
            } else {
                this.currentFanId = index;
            }
        },
        isIdDuplicate(id) {
            return this.fans.some(fan => fan.id == id);
        },
        createFan() {
            if (!this.newFan.windFarmId || !this.newFan.location || !this.newFan.model) {
                this.$message.error('请完整填写风场ID、建设地点和风机型号');
                return;
            }
            if (this.isIdDuplicate(this.newFan.windFarmId)) {
                this.$message.error('风场ID重复，请输入唯一的ID');
                return;
            }
            const newFan = {
                id: this.newFan.windFarmId,
                name: `风机${this.newFan.windFarmId}`,
            };
            this.fans.push(newFan);
            this.$refs.fanForm.resetFields();
            this.showAddForm = false;
            console.log(this.fileList)
        },
        resetForm() {
            this.$refs.fanForm.resetFields();
        },
        getCurrentTimeAsString() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份是从 0 开始的，所以要加 1
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    }
};
</script>
  
<style scoped>
.main-ctx {
    --el-main-padding: 0px 20px 0px 20px;
    height: 100vh;
    /* 限制高度为视口高度 */
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.platform-header {
    left: -20px;
    width: 105%;
}

.collapse {
    margin-right: 30px;
}

.collapse:hover {
    color: var(--theme--color);
    cursor: pointer;
}

.fan {
    font-size: x-large;
    font-weight: bold;
    display: block;
    text-align: center;
}

.flex-grow {
    flex-grow: 1;
}

.upload {
    width: 600px;
    height: 200px;
}

.dialog-footer {
    display: flex;
    justify-content: center;
    /* 水平居中 */
}

.card-container {
    margin-top: 1%;
    margin-left: 2%;
    margin-right: 2%;
}

.alarm-table {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 20px;
}

.data-table {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 20px;
}</style>