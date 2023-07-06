<template>
  <div class="home">
    <h1 class="title">Welcome to the Website</h1>
    <p class="description">Thank you for visiting our website. We hope you have a great experience!</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 100px;
}

.title {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  color: #666;
  line-height: 1.5;
}
</style>
