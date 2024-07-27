<template>
  <HomeScene class="HomeScene" />
  <HomeHeader />
  <MainBody />
  <FunctionsList />
  <ModelsStatics />
  <ProductAdvantages />
  <TryNow />
</template>

<script>
import HomeScene from '@/components/HomeViewComponents/HomeScreen.vue'
import HomeHeader from '@/components/HomeViewComponents/HomeHeader.vue'
import MainBody from '@/components/HomeViewComponents/MainBody.vue';
import FunctionsList from '@/components/HomeViewComponents/FunctionsList.vue';
import ModelsStatics from '@/components/HomeViewComponents/ModelsStatics.vue';
import ProductAdvantages from '@/components/HomeViewComponents/ProductAdvantages.vue';
import TryNow from '@/components/HomeViewComponents/TryNow.vue';
export default {
  name: 'HomeView',
  components: {
    HomeScene,
    HomeHeader,
    MainBody,
    FunctionsList,
    ModelsStatics,
    ProductAdvantages,
    TryNow
  },
}
</script>

<style scoped>
.HomeScene {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* Set a lower z-index to ensure it's in the background */
}
</style>
