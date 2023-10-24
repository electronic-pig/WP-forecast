<template>
  <div class="home">
    <HomeScene class="HomeScene" />
    <HomeHeader />
    <MainBody />
    <FunctionsList />
    <ModelsStatics />
    <ProductAdvantages />
    <TryNow />
  </div>
</template>

<script>
import HomeScene from '@/components/HomeViewComponents/HomeScreen'
import HomeHeader from '@/components/HomeViewComponents/HomeHeader'
import MainBody from '@/components/HomeViewComponents/MainBody';
import FunctionsList from '@/components/HomeViewComponents/FunctionsList';
import ModelsStatics from '@/components/HomeViewComponents/ModelsStatics';
import ProductAdvantages from '@/components/HomeViewComponents/ProductAdvantages';
import TryNow from '@/components/HomeViewComponents/TryNow';
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
  }
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
