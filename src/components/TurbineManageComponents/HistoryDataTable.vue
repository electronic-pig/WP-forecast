<template>
    <div class="container">
        <div class="header">
            <span class="title">风机历史数据</span>
            <el-button size="large" type="primary" @click="openAddPage" style="margin-right: 5px;">新增记录</el-button>
        </div>
        <el-table :data="fanDataItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" table-layout="auto">

            <el-table-column label="时间" sortable :sort-method="(a, b) => { return a.time.localeCompare(b.time) }">
                <template #default="item">
                    <el-icon>
                        <timer />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.time }}</span>
                </template>
            </el-table-column>

            <el-table-column label="风速(m/s)">
                <template #default="item">
                    <el-icon>
                        <Stopwatch />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.windSpeed.toFixed(1) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="风向(°)">
                <template #default="item">
                    <el-icon>
                        <Position />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.windDirection.toFixed(1) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="湿度(%)">
                <template #default="item">
                    <el-icon>
                        <Umbrella />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.humidity.toFixed(1) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="压强(KPa)">
                <template #default="item">
                    <el-icon>
                        <DishDot />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.pressure.toFixed(1) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="转速(r/s)">
                <template #default="item">
                    <el-icon>
                        <Orange />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.speed }}</span>
                </template>
            </el-table-column>

            <el-table-column label="温度(℃)">
                <template #default="item">
                    <el-icon>
                        <Smoking />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.temperature.toFixed(1) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="电压(V)">
                <template #default="item">
                    <el-icon>
                        <FirstAidKit />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.voltage.toFixed(1) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="电流(A)">
                <template #default="item">
                    <el-icon>
                        <FolderRemove />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.current.toFixed(1) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="功率(KW)">
                <template #default="item">
                    <el-icon>
                        <WindPower />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.power.toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="item">
                    <div class='cell'>
                        <el-button size="small" type="success" round @click="handleEdit(item.$index)">编辑</el-button>
                        <el-button size="small" type="danger" round @click="handleDelete(item.$index)">删除</el-button>
                    </div>
                </template>
            </el-table-column>

        </el-table>
        <div style="display: flex; justify-content: center; margin: 5px 0;">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                layout="total, prev, pager, next, jumper" :total="fanDataItems.length">
            </el-pagination>
        </div>
    </div>

    <div class="subpage" v-if="isEditPageOpen">
        <div class="subpageContent">
            <div style="text-align: center;">
                <el-tag effect="plain" size="large">{{ EditPageTitle }}</el-tag>
            </div>
            <div style="overflow: auto;margin-top:20px">
                <el-form :model='tmpItem' label-width='80px' :rules='formRule' ref='formRef'>
                    <el-form-item label='时间' prop='time'>
                        <el-col :span="20">
                            <el-date-picker v-model="tmpItem.time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择时间" :editable="false" />
                        </el-col>
                    </el-form-item>

                    <el-form-item label='风速' prop='windSpeed'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.windSpeed" placeholder="请填写风速(m/s)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>m/s</span>
                    </el-form-item>

                    <el-form-item label='风向' prop='windDirection'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.windDirection" placeholder="请填写风向(°)" type='number'
                                clearable />
                        </el-col>
                        <span style='margin-left:5px'>°</span>
                    </el-form-item>

                    <el-form-item label='湿度' prop='humidity'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.humidity" placeholder="请填写湿度(%)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>%</span>
                    </el-form-item>

                    <el-form-item label='压强' prop='pressure'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.pressure" placeholder="请填写压强(KPa)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>KPa</span>
                    </el-form-item>

                    <el-form-item label='转速' prop='speed'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.speed" placeholder="请填写转速(r/s)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>r/s</span>
                    </el-form-item>

                    <el-form-item label='温度' prop='temperature'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.temperature" placeholder="请填写温度(℃)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>℃</span>
                    </el-form-item>

                    <el-form-item label='电压' prop='voltage'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.voltage" placeholder="请填写电压(V)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>V</span>
                    </el-form-item>

                    <el-form-item label='电流' prop='current'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.current" placeholder="请填写电流(A)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>A</span>
                    </el-form-item>

                    <el-form-item label='功率' prop='power'>
                        <el-col :span="20">
                            <el-input v-model.number="tmpItem.power" placeholder="请填写功率(KW)" type='number' clearable />
                        </el-col>
                        <span style='margin-left:5px'>KW</span>
                    </el-form-item>

                </el-form>
            </div>

            <el-col :span="22" style='text-align:right;margin-bottom:5px'>
                <el-button size="default" type="primary" @click="confirmEdit">确定</el-button>
                <el-button size="default" type="info" @click="closeAddPage">取消</el-button>
            </el-col>

        </div>
    </div>
</template>
    
<script>
import fanDataItems from '@/assets/resource/fanDataItems.json'
export default {
    name: 'historyDataTable',
    data() {
        return {
            tmpItem: {
                "time": '2023-08-02 21:12:34',
                "windSpeed": 1.428,
                "windDirection": 29.866,
                "humidity": 85.537,
                "pressure": 981.609,
                "speed": 4553.656,
                "temperature": 144.305,
                "voltage": 621.768,
                "current": 344.369,
                "power": 69973.368,
            },
            tmpItemHistory: {
                "time": null,
                "windSpeed": null,
                "windDirection": null,
                "humidity": null,
                "pressure": null,
                "speed": null,
                "temperature": null,
                "voltage": null,
                "current": null,
                "power": null,
            },

            fanDataItems: fanDataItems[this.id],

            alarmType: ['通信故障', '电流故障', '设备故障'],
            alarmLevelMeaning: ['低', '中', '高'],
            alarmLevelColor: {
                '低': 'success',
                '中': '',
                '高': 'danger',
            },

            processResltColor: {
                '未解决': 'danger',
                '已解决': 'success'
            },

            isEdit: false,
            editIndex: 0,
            isEditPageOpen: false,
            EditPageTitle: '',

            formRule: {
                time: [{ required: true, message: '请选择时间', trigger: 'change' }],
                windSpeed: [{ required: true, message: '请填写风速', trigger: 'change', type: 'number' }],
                windDirection: [{ required: true, message: '请填写风向', trigger: 'change', type: 'number' }],
                humidity: [{ required: true, message: '请填写湿度', trigger: 'change', type: 'number' }],
                pressure: [{ required: true, message: '请填写压力', trigger: 'change', type: 'number' }],
                speed: [{ required: true, message: '请填写转速', trigger: 'change', type: 'number' }],
                temperature: [{ required: true, message: '请填写温度', trigger: 'change', type: 'number' }],
                voltage: [{ required: true, message: '请填写电压', trigger: 'change', type: 'number' }],
                current: [{ required: true, message: '请填写电流', trigger: 'change', type: 'number' }],
                power: [{ required: true, message: '请填写功率', trigger: 'change', type: 'number' }],
            },

            currentPage: 1,
            pageSize: 12,

        }
    },

    props: {
        id: {
            required: true,
            type: String,
        }
    },

    computed: {
        totalPage() {
            if (fanDataItems.length % this.pageSize != 0) {
                return Math.trunc(fanDataItems.length / this.pageSize) + 1;
            }
            else {
                return Math.trunc(fanDataItems.length / this.pageSize);
            }
        },
    },

    methods: {
        handleEdit(index) {
            this.isEdit = true
            this.isEditIndex = index
            this.isEditPageOpen = true
            this.EditPageTitle = '编辑历史数据'
            this.tmpItem = { ...this.fanDataItems[index] }
        },
        handleDelete(index) {
            this.fanDataItems.splice(index, 1);
        },
        openAddPage() {
            this.isEdit = false
            this.isEditPageOpen = true
            this.EditPageTitle = '新增历史数据'

            // 加载历史选项
            this.tmpItem = { ...this.tmpItemHistory }
        },

        closeAddPage() {
            this.isEditPageOpen = false
            // 保存历史选项
            if (!this.isEdit)
                this.tmpItemHistory = { ... this.tmpItem }
        },

        confirmEdit() {
            if (this.isEdit) {
                this.fanDataItems[this.isEditIndex] = { ...this.tmpItem }
                this.isEditPageOpen = false
            }
            else {
                this.$refs.formRef.validate(valid => {
                    if (valid) {
                        this.fanDataItems.unshift({ ...this.tmpItem })
                        this.isEditPageOpen = false
                    }
                    else {
                        alert('表单填写不完整，请重新修改！')
                    }
                })
            }
        },

        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        }
    }
}
</script>
    
<style scoped>
.container {
    border: 2px solid var(--theme--color);
    border-radius: 15px;
}

.header {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    margin-left: 10px;
    font-size: x-large;
    font-weight: bold;
}

.cell {
    display: flex;
    justify-content: center;
}

.subpage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

.subpageContent {
    background-color: #fff;
    width: 23%;
    height: 80%;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>