<template>
  <div class="date">
    <vue-feather type="clock" size="24px" stroke-width="2" style="margin-right: 5px;"></vue-feather>
    <span>{{ currenthour }}:{{ currentminute }}:{{ currentsecond }}</span>
    <span>[{{ currentyear }}-{{ currentmonth }}-{{ currentday }}]</span>
    <a href="https://github.com/electronic-pig/WP-predict" target="_blank" style="display: flex;align-items: center;">
      <img src="@/assets/icon/GitHub.png" alt="github" style="margin-left: 10px;">
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentyear: "",
      currentday: "",
      currentmonth: "",
      currenthour: "",
      currentminute: "",
      currentsecond: "",
    };
  },
  mounted() {
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentyear = now.getFullYear();
      this.currentmonth = now.getMonth() + 1;
      this.currentday = now.getDate();
      this.currenthour = now.getHours();
      this.currentminute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      this.currentsecond = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    }
  }
};
</script>

<style scoped>
.date {
  font-family: Microsoft YaHei, sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: var(--theme--color);
  display: flex;
  align-items: center;
}
</style>
