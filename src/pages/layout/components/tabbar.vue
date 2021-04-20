<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="Home" icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item name="ShopCart" icon="cart-o" :badge="goodsCount" to="/shopCart">购物车</van-tabbar-item>
    <van-tabbar-item icon="close" @click="logout">登出</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from "vue";
import { useStore } from 'vuex';
export default defineComponent({
  name: "Tabbar",
  setup() {
    const { proxy }:any = getCurrentInstance();
    const store = useStore();
    const goodsCount = computed(() => {
      return store.getters.getGoodsCount;
    })
    const logout = () => {
      proxy.$router.push('/login');
      localStorage.removeItem('token');
    }
    const active = ref(proxy.$route.name);
    return {
      active,
      goodsCount,
      logout,
    }
  },
});
</script>

<style scoped>
</style>