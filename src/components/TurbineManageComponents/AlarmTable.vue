<template>
    <div class="container">
        <div class="header">
            <span class="title">风机历史警报信息</span>
            <el-button size="large" type="primary" @click="openAddPage" style="margin-right: 5px;">新增记录</el-button>
        </div>
        <el-table :data="alarmItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" table-layout="auto">
            <el-table-column label="报警时间" sortable
                :sort-method="(a, b) => { return a.alarmTime.localeCompare(b.alarmTime) }">
                <template #default="item">
                    <el-icon>
                        <timer />
                    </el-icon>
                    <span style="margin-left: 5px">{{ item.row.alarmTime }}</span>
                </template>
            </el-table-column>

            <el-table-column label="报警级别" sortable :sort-method="(a, b) => { return a.alarmLevel - b.alarmLevel }">
                <template #default="item">
                    <el-tag :type="alarmLevelColor[alarmLevelMeaning[item.row.alarmLevel]]">{{
                        alarmLevelMeaning[item.row.alarmLevel] }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="报警类型" :sort-method="(a, b) => { return a.alarmType.localeCompare(b.alarmType) }">
                <template #default="item">
                    <el-tag type='warning' effect='plain'>{{ item.row.alarmType }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="报警描述">
                <template #default="item">
                    <span>{{ item.row.alarmDescription }}</span>
                </template>
            </el-table-column>

            <el-table-column label="处理时间" :sort-method="(a, b) => { return a.processTime.localeCompare(b.processTime) }">
                <template #default="item">
                    <div v-if="!(item.row.processTime === '')">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span style="margin-left: 5px">{{ item.row.processTime }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="处理人" :sort-method="(a, b) => { return a.processPerson.localeCompare(b.processPerson) }">
                <template #default="item">
                    <span>{{ item.row.processPerson }}</span>
                </template>
            </el-table-column>

            <el-table-column label="处理方式">
                <template #default="item">
                    <span>{{ item.row.processMethod }}</span>
                </template>
            </el-table-column>

            <el-table-column label="处理结果"
                :sort-method="(a, b) => { return a.processResult.localeCompare(b.processResult) }">
                <template #default="item">
                    <el-tag :type="processResltColor[item.row.processResult]">{{ item.row.processResult }}</el-tag>
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
                layout="total, prev, pager, next, jumper" :total="alarmItems.length">
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
                    <el-form-item label='报警时间' prop='alarmTime'>
                        <el-date-picker v-model="tmpItem.alarmTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择报警时间" :editable="false" />
                    </el-form-item>

                    <el-form-item label='报警类型' prop='alarmType'>
                        <el-select v-model="tmpItem.alarmType" placeholder="请选择报警类型">
                            <el-option v-for="(item, index) in alarmType" :key='index' :label='item' :value='item' />
                        </el-select>
                    </el-form-item>

                    <el-form-item label='报警级别' prop='alarmLevel'>
                        <el-select v-model="tmpItem.alarmLevel" placeholder="请选择报警级别">
                            <el-option v-for="(item, index) in alarmLevelMeaning" :key='index' :label='item' :value='index'>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label='报警描述' prop='alarmDescription'>
                        <el-col :span="23">
                            <el-input v-model="tmpItem.alarmDescription" placeholder="请填写报警相关描述" clearable />
                        </el-col>
                    </el-form-item>

                    <el-form-item label='处理时间' prop='processTime'>
                        <el-date-picker v-model="tmpItem.processTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择处理时间" :editable="false" />
                    </el-form-item>

                    <el-form-item label='处理人' prop='processPerson'>
                        <el-col :span="23">
                            <el-input v-model="tmpItem.processPerson" placeholder="请填写处理人" clearable />
                        </el-col>
                    </el-form-item>

                    <el-form-item label='处理方式' prop='processMethod'>
                        <el-col :span="23">
                            <el-input v-model="tmpItem.processMethod" placeholder="请填写处理方式" clearable />
                        </el-col>
                    </el-form-item>

                    <el-form-item label='处理结果' prop='processResult'>
                        <el-select v-model="tmpItem.processResult" placeholder="请填写处理结果">
                            <el-option label='未解决' value='未解决'></el-option>
                            <el-option label='已解决' value='已解决'></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <el-col :span="23" style='text-align:right;margin-bottom:5px'>
                <el-button size="default" type="primary" @click="confirmEdit">确定</el-button>
                <el-button size="default" type="info" @click="closeAddPage">取消</el-button>
            </el-col>

        </div>
    </div>
</template>

<script>
import alarmItemsRecord from '@/assets/resource/alarmItems.json'
export default {
    data() {
        return {
            tmpItem: {
                alarmTime: '',
                alarmType: '',
                alarmLevel: 0,
                alarmDescription: '',
                processTime: '',
                processPerson: '',
                processMethod: '',
                processResult: '',
            },
            tmpItemHistory: {
                alarmTime: '',
                alarmType: '',
                alarmLevel: null,
                alarmDescription: '',
                processTime: '',
                processPerson: '',
                processMethod: '',
                processResult: '',
            },
            alarmItems: alarmItemsRecord[this.id],
            alarmType: ["通信故障", "电流异常", "设备故障", "温度过高", "传感器故障", "电压异常", "机械振动", "软件故障", "电磁干扰"],
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
                alarmTime: [{ required: true, message: '请输入报警时间', trigger: 'change' }],
                alarmType: [{ required: true, message: '请选择报警类型', trigger: 'change' }],
                alarmLevel: [{ required: true, message: '请选择报警级别', trigger: 'change' }],
                alarmDescription: [{ required: true, message: '请填写报警相关描述', trigger: 'change' }],
                processTime: [{}],
                processPerson: [{}],
                processMethod: [{}],
                processResult: [{ required: true, message: '请选择处理结果', trigger: 'change' }],
            },

            currentPage: 1,
            pageSize: 10,
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
            if (this.alarmItems.length % this.pageSize != 0) {
                return Math.trunc(this.alarmItems.length / this.pageSize) + 1;
            }
            else {
                return Math.trunc(this.alarmItems.length / this.pageSize);
            }
        },
    },

    methods: {
        handleEdit(index) {
            this.isEdit = true
            this.isEditIndex = index
            this.isEditPageOpen = true
            this.EditPageTitle = '编辑报警记录'
            this.tmpItem = { ...this.alarmItems[index] }
        },
        handleDelete(index) {
            this.alarmItems.splice(index, 1);
        },
        openAddPage() {
            this.isEdit = false
            this.isEditPageOpen = true
            this.EditPageTitle = '新增报警记录'
            this.tmpItem = { ...this.tmpItemHistory }
        },
        closeAddPage() {
            this.isEditPageOpen = false
            if (!this.isEdit)
                this.tmpItemHistory = { ... this.tmpItem }
        },
        confirmEdit() {
            if (this.isEdit) {
                this.alarmItems[this.isEditIndex] = { ...this.tmpItem }
                this.isEditPageOpen = false
            }
            else {
                this.$refs.formRef.validate(valid => {
                    if (valid) {
                        this.alarmItems.unshift({ ...this.tmpItem })
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
    width: 20%;
    height: 65%;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>