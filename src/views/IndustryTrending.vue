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
        <div class='page1'>
          <div class='page1_1'>
            <labelDisplay line1='2022年风机装机容量' line2='36544.00' line3='万千瓦' :imageChoice=0 />
          </div>
          <div class='page1_1'>
            <labelDisplay line1='2022年风机新增装机' line2='3763.00' line3='万千瓦' :imageChoice=1 />
          </div>
          <div class='page1_1'>
            <labelDisplay line1='2022年风电总发电量' line2='6827.20' line3='亿千瓦时' :imageChoice=2 />
          </div>
        </div>
        <h3>风力发电相关政策一览</h3>
        <div class='page2'>
          <div class='page2_1'>
            <imagewithCharacter1 :policyOption=0 />
          </div>
          <div class='page2_1'>
            <imagewithCharacter2 :policyOption=1 />
          </div>
          <div class='page2_1'>
            <imagewithCharacter3 :policyOption=2 />
          </div>
          <div class='page2_1'>
            <imagewithCharacter4 :policyOption=3 />
          </div>
        </div>
        <h3>风力发电相关数据一览</h3>
        <div class='page3'>
          <div class='page3_1'>
            <barChart title="2016-2022年中国风力发电累计装机容量统计" valueName="亿瓦" :colorOption=0 />
          </div>
          <div class='page3_1'>
            <barChart title="2016-2022年中国风力发电新增装机容量统计" :value="page3_data" valueName="亿瓦" :colorOption=2 />
          </div>
          <div class='page3_1'>
            <pieChart />
          </div>
        </div>
        <div class='page4'>
          <div class='page4_1'>
            <lineBarChart />
          </div>
          <div class='page4_2'>
            <lineChart />
          </div>
        </div>
        <div class='page5'>
          <chinaMap />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
  
<script>
import AsideVue from "@/components/AsideVue.vue";
import TabTime from "@/components/TabTime.vue";
import chinaMap from '@/components/IndustryTrendingComponents/chinaMap.vue'
import labelDisplay from '@/components/IndustryTrendingComponents/labelDisplay.vue';
import barChart from '@/components/IndustryTrendingComponents/barChart.vue';
import pieChart from '@/components/IndustryTrendingComponents/pieChart.vue';
import lineChart from '@/components/IndustryTrendingComponents/lineChart.vue';
import lineBarChart from '@/components/IndustryTrendingComponents/lineBarChart.vue';

import imagewithCharacter1 from '@/components/IndustryTrendingComponents/imagewithCharacter1.vue';
import imagewithCharacter2 from '@/components/IndustryTrendingComponents/imagewithCharacter2.vue';
import imagewithCharacter3 from '@/components/IndustryTrendingComponents/imagewithCharacter3.vue';
import imagewithCharacter4 from '@/components/IndustryTrendingComponents/imagewithCharacter4.vue';

export default {
  components: {
    AsideVue,
    TabTime,
    chinaMap,
    labelDisplay,
    barChart,
    pieChart,
    lineChart,
    lineBarChart,
    imagewithCharacter1,
    imagewithCharacter2,
    imagewithCharacter3,
    imagewithCharacter4,
  },
  data() {
    return {
      isCollapse: false,
      activeIndex: this.$route.path,
      page3_data: [1200, 950, 1000, 1150, 2010, 1550, 1110],
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
  },
};
</script>
  
<style scoped>
.page1 {
  height: 150px;
  display: flex;
  justify-content: space-between;
}

.page1_1 {
  width: 32%;
  display: block;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.page1_1:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.page2 {
  height: 300px;
  display: flex;
  justify-content: space-between;
}

.page2_1 {
  width: 24%;
}

.page3 {
  height: 400px;
  display: flex;
  justify-content: space-between;
}

.page3_1 {
  width: 32%;
  height: 100%;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.page3_1:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.page4 {
  margin-top: 10px;
  height: 500px;
  display: flex;
  justify-content: space-between;
}

.page4_1 {
  width: 49%;
  height: 100%;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.page4_1:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.page4_2 {
  width: 49%;
  height: 100%;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.page4_2:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.page5 {
  margin-top: 20px;
  height: 600px;
  border: 2px solid var(--theme--color);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.page5:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>