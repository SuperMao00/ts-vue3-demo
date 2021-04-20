import { createStore } from 'vuex'

export default createStore({
  state: {
    cartArr: []
  },
  mutations: {
    // 添加商品到购物车
    tocart(state:any, value:any){
      const goods:any = state.cartArr.find((val:any) => {
        return val.id == value.id;
      })
      if (goods) {
        goods.cartCount += 1;
      } else {
        const item:any = {
          id: value.id,
          title: value.details,
          cartCount: 1,
          img: value.img
        }
        state.cartArr.push(item);
      }
    },
    clearCart(state:any){
      state.cartArr = []
    },
    addOne(state:any, value:any){
      const goods:any = state.cartArr.find((val:any) => {
        return val.id == value.id;
      })
      goods.cartCount += 1;
    },
    minusOne(state:any, value:any){
      const index = state.cartArr.findIndex((val:any) => {
        return val.id == value.id;
      })
      if (state.cartArr[index].cartCount == 1) {
        state.cartArr.splice(index, 1);
      } else {
        state.cartArr[index].cartCount -= 1;
      }
    },
  },
  actions: {
  },
  getters: {
    getGoodsCount(state:any){
      let count = 0;
      state.cartArr.forEach((item:any) => {
        count += item.cartCount;
      })
      return count;
    }
  },
  modules: {
  }
})
