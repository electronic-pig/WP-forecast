<template>
  <el-container>
    <el-aside width="auto">
      <AsideVue :is-collapse="isCollapse" :active-index="activeIndex" />
    </el-aside>
    <el-container>
      <el-main class="main-ctx">
        <el-header class="platform-header">
          <el-row align="middle" style="margin-top: 5px;">
            <el-icon v-if="!isCollapse" :size="35">
              <Fold @click="goCollapse" />
            </el-icon>
            <el-icon v-if="isCollapse" :size="35">
              <Expand @click="goCollapse"/>
            </el-icon>
            <TabTime />
            <el-button @click="handleFileUpload" type="primary" style="margin-left:980px;margin-top:5px">上传CSV文件</el-button>
          </el-row>
        </el-header>
        <router-view v-slot="{ Component }" :fileData="fileData">
          <transition name="fade" mode="out-in">
            <component :is="Component" :fileData="fileData"/>
          </transition>
        </router-view>
        <el-backtop target=".main-ctx" :bottom="40" :visibility-height="50" :right="27" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import "@/assets/css/app.css";
import AsideVue from "@/components/AsideVue";
import TabTime from "@/components/TabTime";
import readCSV from '@/utils/readCSV';

export default {
  name: "MainFrame",
  components: {
    AsideVue,
    TabTime,
  },
  data() {
    return {
      isCollapse: false,
      scrollTop: "",
      activeIndex: this.$route.path,
      fileData: [],
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
    handleFileUpload() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.csv';
      fileInput.addEventListener('change', this.readFile);
      fileInput.click();
    },
    async readFile(event) {
      const file = event.target.files[0];
      this.csvfile = event.target.files[0];
      const result = await readCSV(file);
      this.fileData = result;
    },
    goCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  }
};
</script>

<style scoped>
.el-main {
  --el-main-padding: 0px 20px 0 20px;
  height: auto;
  width: 100%;
  overflow-x: hidden;
}

.main-ctx {
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.platform-header {
  left: -20px;
  width: 105%;
}
.el-icon{
  margin-right:30px;
}
.el-icon:hover{
  color: var(--theme--color);
  cursor: pointer;
}
</style>