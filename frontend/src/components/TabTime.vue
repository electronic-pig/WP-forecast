<template>
  <div class="date hidden-sm-and-down">
    <span class="hms">{{ currenthour }}:{{ currentminute }}:{{ currentsecond }}</span>
    <span class="ymd">[{{ currentyear }}-{{ currentmonth }}-{{ currentday }}]</span>
  </div>
</template>

<script>
import { getCurrentTime } from "@/utils/gettime.js"
export default {
  data() {
    return {
      currentyear: "",
      currentday: "",
      currentmonth: "",
      currenthour: "",
      currentminute: "",
      currentsecond: "",
      getDate: "",
    };
  },
  mounted() {
    this.getCurrentTime();
  },
  unmounted() {
    clearTimeout(this.getDate);
  },
  methods: {
    getCurrentTime,
  },
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
