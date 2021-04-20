<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in imgs" :key="image">
      <img :src="image.img" />
    </van-swipe-item>
  </van-swipe>
  <div>
    <div style="text-align: center;">热门视频</div>
    <van-grid :border="false" :column-num="2">
      <van-grid-item v-for="(item, index) in videos" :key="index" @click="tocart(item)">
        <van-image :src="item.img" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import { useStore } from 'vuex';
export default defineComponent({
  name: "Swipe",
  setup() {
    const store = useStore();
    const { proxy }: any = getCurrentInstance();
    const imgs = ref<any>(null);
    const videos = ref<any>(null);
    const getSources = () => {
      proxy.$http
        .get("/api/homeResources")
        .then((res: any) => {
          if (res.data.code == 0) {
            imgs.value = res.data.data[0].bannerList;
            videos.value = res.data.data[1].videoList;
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    const tocart = (goods:any) => {
      store.commit('tocart', goods);
      proxy.$toast.success('成功添加商品到购物车');
    }
    getSources();
    return {
      imgs,
      videos,
      tocart
    };
  },
});
</script>

<style scoped>
img {
  width: 100%;
}
</style>