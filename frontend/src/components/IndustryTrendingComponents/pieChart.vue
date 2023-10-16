<template>
<div class = 'pieChart' ref = "container"></div>  
<!---TODO1:modify the name of the container--->
</template>

<script>
import * as echarts from 'echarts'

export default {
    name:'pieChart',
    
    mounted(){
        this.chart = echarts.init(this.$refs.container) 

        this.chartOption = {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    var value = params.value;
                    var name = params.name;
                    return `${name}` + `:` +  `${value}` + 'GW';
                },
            },

            toolbox: {
                feature: {
                    saveAsImage: { show: true } // 保存为图片
                },
                left:"left",
                top:'bottom',
            },

            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    // { value: 1048, name: 'Search Engine' },
                    // { value: 735, name: 'Direct' },
                    // { value: 580, name: 'Email' },
                    // { value: 484, name: 'Union Ads' },
                    // { value: 300, name: 'Video Ads' }
                    { value: 1048, name: '海上风电' },
                    { value: 130, name: '陆上风电' }
                ]
                }
            ]} 

        this.chart.setOption(this.chartOption)
    },

}
 </script>
    
<style scoped>
.pieChart{
    width:100%;
    height:100%;
}
</style>