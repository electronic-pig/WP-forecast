<template>
    <div ref="barchartContainer" class='mapStyle'></div>
</template>

    

<script>
import * as echarts from 'echarts'

export default {
    name: 'chinaMap',

    data() {
        return {
            colorStyle: [['#A5CC82', '#00467F'], ['#699879', '#FFF723'], ['#ffc0cb', '#800080']]
        }
    },

    props: {
        title: {
            type: String,
            require: false,
            default: '2016-2022年中国风力发电累计装机容量统计' // '2016-2022年中国风力发电新增装机容量统计'
        },
        category: {
            type: Array,
            require: false,
            default: () => { return ['2016', '2017', '2018', '2019', '2020', '2021', '2022'] }
        },
        value: {
            type: Array,
            require: false,
            default: () => { return [14900, 16000, 18700, 20100, 27800, 32800, 35096] }

            // [12000,9500,10000,11500,20100,15500,11098]
        },
        colorOption: {
            type: Number,
            require: false,
            default: 0
        },
        valueName: {
            type: String,
            require: false,
            default: null
        }

    },

    computed: {
        // 计算每个省的最大值最小值，为着色作准备
        minValue() {
            return Math.min(...this.value)
        },

        maxValue() {
            return Math.max(...this.value)
        },

    },



    methods: {

        // 柱状图着色
        // ['#3B5077', '#031525'] // 蓝黑
        // ['#ffc0cb', '#800080'] // 红紫
        // ['#3C3B3F', '#605C3C'] // 黑绿
        // ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
        // ['#23074d', '#cc5333'] // 紫红
        // ['#00467F', '#A5CC82'] // 蓝绿
        mapValueToColor(value, minValue, maxValue, minColor, maxColor) {
            // 将值标准化到 [0, 1] 范围
            let normalizedValue = (value - minValue) / (maxValue - minValue);

            function colorHex2RGB(str) {
                return [parseInt('0x' + str.slice(1, 3)),
                parseInt('0x' + str.slice(3, 5)),
                parseInt('0x' + str.slice(5, 7))]
            }

            function colorRGB2Hex(r, g, b) {
                // padStart(2, '0'):将字符串填充至两位，缺失的用'0'补齐
                return '#' + r.toString(16).padStart(2, '0')
                    + g.toString(16).padStart(2, '0')
                    + b.toString(16).padStart(2, '0')
            }

            let color0 = colorHex2RGB(minColor)
            let color1 = colorHex2RGB(maxColor)

            // calculate (r,g,b)
            let r_base = Math.min(color0[0], color1[0])
            let r_increase = Math.abs(color0[0] - color1[0])

            let g_base = Math.min(color0[1], color1[1])
            let g_increase = Math.abs(color0[1] - color1[1])

            let b_base = Math.min(color0[2], color1[2])
            let b_increase = Math.abs(color0[2] - color1[2])

            return colorRGB2Hex(
                Math.round(r_base + r_increase * normalizedValue),
                Math.round(g_base + g_increase * normalizedValue),
                Math.round(b_base + b_increase * normalizedValue)
            )
        }
    },

    mounted() {
        let chart = echarts.init(this.$refs.barchartContainer)

        let barOption = {
            title: {
                text: this.title,
                textStyle: {
                    color: '#333',
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                left: 'center',
                top: '0%',
            },

            toolbox: {
                feature: {
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                },
                left: "left",
                top: 'bottom',
            },

            xAxis: {
                type: 'category',
                axisLabel: {
                    rotate: 30
                },
                data: this.category,
            },
            yAxis: {
                type: 'value',
                name: this.valueName
            },

            series: [{
                type: 'bar',
                data: this.value,
                itemStyle: {
                    color: params => {
                        return this.mapValueToColor(params.data,
                            this.minValue, this.maxValue,
                            this.colorStyle[this.colorOption][0], this.colorStyle[this.colorOption][1]);
                    },
                },

            }]
        }

        chart.setOption(barOption)
    },


}
</script>
    
<style scoped>
.mapStyle {
    width: 100%;
    height: 100%;
}
</style>