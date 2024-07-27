<template>
	<el-container>
		<el-aside width="auto">
			<AsideVue :is-collapse="isCollapse" :active-index="activeIndex" />
		</el-aside>
		<el-container>
			<el-header>
				<el-icon class="collapse" v-if="!isCollapse" :size="35">
					<Fold @click="goCollapse" />
				</el-icon>
				<el-icon class="collapse" v-if="isCollapse" :size="35">
					<Expand @click="goCollapse" />
				</el-icon>
				<TabTime />
			</el-header>
			<el-main>
				<el-menu class="turbine-menu" :default-active="currentFanId" mode="horizontal" :ellipsis="false"
					@select="handleMenuClick">
					<el-menu-item index="add">
						<el-icon size="20px" style="color:var(--theme--color)">
							<CirclePlusFilled />
						</el-icon>
						<p class="fan">新增风机</p>
					</el-menu-item>
					<el-menu-item v-for="fan in fans" :key="fan.id" :index="fan.id">
						<el-icon size="20px" style="color:var(--theme--color)">
							<ChromeFilled />
						</el-icon>
						<span class="fan">{{ fan.name }}</span>
					</el-menu-item>
				</el-menu>
				<el-dialog title="新增风机表单" v-model="showAddForm" width="30%" style="border-radius: 10px;">
					<el-form ref="fanForm" :model="newFan" label-width="auto">
						<el-form-item label="风机ID:" prop="windFarmId">
							<el-input v-model="newFan.windFarmId"></el-input>
						</el-form-item>
						<el-form-item label="建设地点:" prop="location">
							<el-input v-model="newFan.location"></el-input>
						</el-form-item>
						<el-form-item label="风机型号:" prop="model">
							<el-input v-model="newFan.model"></el-input>
						</el-form-item>
						<el-form-item label="上传文件(可选):">
							<el-upload class="upload" action="#" multiple drag :file-list="fileList">
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
				<el-row :gutter="10" class="card-container">
					<el-col :span="12">
						<InfoCard :fanId="currentFanId" :deviceModel="fanInfo[currentFanId].deviceModel"
							:location="fanInfo[currentFanId].location" :runStatus="fanInfo[currentFanId].runStatus" />
					</el-col>
					<el-col :span="12">
						<RunInfo :windSpeed="runInfo[currentFanId].windSpeed" :windDirection="runInfo[currentFanId].windDirection"
							:temperature="runInfo[currentFanId].temperature" :pressure="runInfo[currentFanId].pressure"
							:rotationSpeed="runInfo[currentFanId].rotationSpeed" :voltage="runInfo[currentFanId].voltage"
							:current="runInfo[currentFanId].current" :power="runInfo[currentFanId].power"
							:sunlightIntensity="runInfo[currentFanId].sunlightIntensity" :humidity="runInfo[currentFanId].humidity" />
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
	</el-container>
</template>
  
<script>
import AsideVue from "@/components/AsideVue.vue";
import TabTime from "@/components/TabTime.vue";
import InfoCard from "@/components/TurbineManageComponents/InfoCard.vue"
import RunInfo from "@/components/TurbineManageComponents/RunInfo.vue"
import AlarmTable from "@/components/TurbineManageComponents/AlarmTable.vue"
import HistoryDataTable from "@/components/TurbineManageComponents/HistoryDataTable.vue"
export default {
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
			currentFanId: '1',
			fans: [
				{ id: '1', name: '风机1' },
				{ id: '2', name: '风机2' },
				{ id: '3', name: '风机3' },
				{ id: '4', name: '风机4' },
				{ id: '5', name: '风机5' },
				{ id: '6', name: '风机6' },
				{ id: '7', name: '风机7' },
				{ id: '8', name: '风机8' },
				{ id: '9', name: '风机9' },
				{ id: '10', name: '风机10' },
			],
			fanInfo: [
				{ id: '1', deviceModel: 'LM-1894', location: '四川省成都市双流区', runStatus: 'normal' },
				{ id: '2', deviceModel: 'LM-2001', location: '湖北省武汉市洪山区', runStatus: 'abnormal' },
				{ id: '3', deviceModel: 'LM-1765', location: '广东省广州市天河区', runStatus: 'fault' },
				{ id: '4', deviceModel: 'LM-2123', location: '江苏省南京市鼓楼区', runStatus: 'normal' },
				{ id: '5', deviceModel: 'LM-1987', location: '浙江省杭州市西湖区', runStatus: 'abnormal' },
				{ id: '6', deviceModel: 'LM-2245', location: '北京市朝阳区', runStatus: 'fault' },
				{ id: '7', deviceModel: 'LM-1894', location: '上海市浦东新区', runStatus: 'normal' },
				{ id: '8', deviceModel: 'LM-2001', location: '陕西省西安市雁塔区', runStatus: 'abnormal' },
				{ id: '9', deviceModel: 'LM-1765', location: '河南省郑州市中原区', runStatus: 'fault' },
				{ id: '10', deviceModel: 'LM-2123', location: '湖南省长沙市岳麓区', runStatus: 'normal' },
			],
			runInfo: [
				{ "windSpeed": "5 m/s", "windDirection": "N", "temperature": "28°C", "pressure": "101.3 kPa", "rotationSpeed": "1500 RPM", "voltage": "2200 V", "current": "10 A", "power": "22000 W", "sunlightIntensity": "800 W/m²", "humidity": "60%" },
				{ "windSpeed": "10 m/s", "windDirection": "NE", "temperature": "25°C", "pressure": "101.5 kPa", "rotationSpeed": "1400 RPM", "voltage": "4315 V", "current": "19 A", "power": "82000 W", "sunlightIntensity": "750 W/m²", "humidity": "55%" },
				{ "windSpeed": "13 m/s", "windDirection": "E", "temperature": "26°C", "pressure": "101.2 kPa", "rotationSpeed": "1300 RPM", "voltage": "6350 V", "current": "8 A", "power": "50800 W", "sunlightIntensity": "700 W/m²", "humidity": "58%" },
				{ "windSpeed": "15 m/s", "windDirection": "SE", "temperature": "27°C", "pressure": "101.0 kPa", "rotationSpeed": "1600 RPM", "voltage": "2181 V", "current": "11 A", "power": "24000 W", "sunlightIntensity": "820 W/m²", "humidity": "62%" },
				{ "windSpeed": "8 m/s", "windDirection": "S", "temperature": "30°C", "pressure": "100.8 kPa", "rotationSpeed": "1700 RPM", "voltage": "2166 V", "current": "12 A", "power": "26000 W", "sunlightIntensity": "850 W/m²", "humidity": "65%" },
				{ "windSpeed": "9 m/s", "windDirection": "SW", "temperature": "24°C", "pressure": "101.4 kPa", "rotationSpeed": "1200 RPM", "voltage": "2285 V", "current": "7 A", "power": "16000 W", "sunlightIntensity": "680 W/m²", "humidity": "57%" },
				{ "windSpeed": "12 m/s", "windDirection": "W", "temperature": "29°C", "pressure": "100.9 kPa", "rotationSpeed": "1800 RPM", "voltage": "2153 V", "current": "13 A", "power": "28000 W", "sunlightIntensity": "880 W/m²", "humidity": "63%" },
				{ "windSpeed": "16 m/s", "windDirection": "NW", "temperature": "23°C", "pressure": "101.1 kPa", "rotationSpeed": "1250 RPM", "voltage": "2000 V", "current": "8.5 A", "power": "17000 W", "sunlightIntensity": "720 W/m²", "humidity": "59%" },
				{ "windSpeed": "21 m/s", "windDirection": "N", "temperature": "28°C", "pressure": "101.6 kPa", "rotationSpeed": "1550 RPM", "voltage": "2190 V", "current": "10.5 A", "power": "23000 W", "sunlightIntensity": "800 W/m²", "humidity": "61%" },
				{ "windSpeed": "3 m/s", "windDirection": "NE", "temperature": "25°C", "pressure": "101.3 kPa", "rotationSpeed": "1450 RPM", "voltage": "2210 V", "current": "9.5 A", "power": "21000 W", "sunlightIntensity": "760 W/m²", "humidity": "56%" },
			],
			showAddForm: false,
			newFan: {
				windFarmId: '',
				location: '',
				model: '',
			},
			fileList: []

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
		},
		resetForm() {
			this.$refs.fanForm.resetFields();
		}
	}
};
</script>
  
<style scoped>
.turbine-menu {
	height: 50px;
}

.fan {
	font-size: x-large;
	font-weight: bold;
	display: block;
	text-align: center;
}

.upload {
	width: 600px;
	height: 200px;
}

.dialog-footer {
	display: flex;
	justify-content: center;
}

.card-container {
	margin-top: 5px;
}

.alarm-table {
	margin-top: 10px;
}

.data-table {
	margin-top: 10px;
}
</style>