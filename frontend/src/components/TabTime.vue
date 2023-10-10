<template>
  <div class="date hidden-sm-and-down">
    <span class="hms">{{ currenthour }}:{{ currentminute }}:{{ currentsecond }}</span>
    <span class="ymd">[{{ currentyear }}-{{ currentmonth }}-{{ currentday }}]</span>
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
    this.updateTime();  // Call updateTime function initially
    // Set up a timer to call updateTime every second
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  unmounted() {
    // Clear the timer when the component is unmounted to prevent memory leaks
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
* {
  font-family: Microsoft JhengHei UI, sans-serif;
}

.date {
  font-family: Microsoft YaHei;
  font-weight: 400;
}

.hms {
  color: var(--theme--color);
  font-size: 18px;
}

.ymd {
  color: var(--theme--color);
  font-size: 18px;
}
</style>
