<template>
  <div class="empty" v-if="goodsCount == 0">
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="购物车空空的"
    />
  </div>
  <div class="shopCart" v-else>
    <h2 class="shopCartTop">购物车</h2>
    <div class="shopCartCenter">
      <div class="goodsItem" v-for="(item, index) in goodsData" :key="index">
        <div class="goodsLeft">
          <img :src="item.img" />
        </div>
        <div class="goodsCenter">{{ item.title }}</div>
        <div class="goodsRight">
          <van-stepper
            v-model="item.cartCount"
            theme="round"
            button-size="22"
            disable-input
            min="0"
            step="0"
            @plus="add(item)"
            @minus="substract(item)"
          />
        </div>
      </div>
    </div>
    <div class="btns">
      <van-button plain hairline type="primary" color="grey" @click="btnClick(1)">下单</van-button>
      <van-button plain hairline type="primary" color="grey" @click="btnClick(2)">清空</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, getCurrentInstance, ref } from "vue";
export default defineComponent({
  name: "ShopCart",
  setup() {
    const { proxy }:any = getCurrentInstance();
    const store = useStore();
    const goodsCount = computed(() => {
      return store.getters.getGoodsCount;
    });
    const goodsData = ref(computed(() => {
      return store.state.cartArr;
    }))
    const btnClick = (val:any) => {
      if (val == 1) {
        proxy.$toast.success('下单成功');
        store.commit('clearCart');
      } else if (val == 2) {
        proxy.$toast.success('购物车已清空');
        store.commit('clearCart');
      }
    }
    const add = (value:any) => {
      store.commit('addOne', value);
    }
    const substract = (value:any) => {
      store.commit('minusOne', value);
    }
    return {
      goodsCount,
      goodsData,
      btnClick,
      add,
      substract
    };
  },
});
</script>

<style scoped>
.empty {
  margin-top: 5rem;
}

.shopCartTop {
  margin-top: 3rem 0 2rem;
  text-align: center;
}

.shopCartCenter {
  position: relative;
  width: 100%;
  min-height: 5rem;
}

.goodsItem {
  position: relative;
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
}

.goodsLeft {
  position: absolute;
  left: 1rem;
  height: 5rem;
}

.goodsLeft img {
  height: 100%;
}

.goodsCenter {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
}

.goodsRight {
  position: absolute;
  bottom: 0.5rem;
  right: 1.5rem;
}

.btns {
  margin-top: 2rem;
  text-align: center;
}
</style>