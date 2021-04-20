<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in imgs" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
  <van-form @submit="onSubmit">
    <van-field
      v-model="state.username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="state.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px; text-align: center">
      <van-button
        type="primary"
        native-type="submit"
        style="margin-right: 10px"
      >
        提交
      </van-button>
      <van-button type="warning" @click="clearForm"> 重置 </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from "vue";
export default defineComponent({
  name: "Login",
  setup() {
    const { proxy }: any = getCurrentInstance();
    const imgs = reactive([
      "https://file.xdclass.net/video/2021/1-lbt/VIP/vip1299.png",
      "https://file.xdclass.net/video/2021/62-paas/lbt-paas.png",
      "https://file.xdclass.net/video/2021/59-Postman/59lbt.png",
    ]);
    const state = reactive({
      username: "",
      password: "",
    });
    const onSubmit = () => {
      toLogin()
    };
    const clearForm = () => {
      state.username = "";
      state.password = "";
    };
    const toLogin = () => {
      proxy.$toast.loading({
        message: "正在登陆...",
        forbidClick: true,
      });
      proxy.$http
        .post("/api/login", {
          name: state.username,
          password: state.password,
        })
        .then((res: any) => {
          if (res.data.code == 0) {
            proxy.$toast.success("登陆成功");
            localStorage.setItem('token', res.data.data.token)
            proxy.$router.push({
              path: '/home'
            })
          } else {
            proxy.$toast.fail(res.data.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    return {
      imgs,
      state,
      onSubmit,
      clearForm,
      toLogin,
    };
  },
});
</script>

<style scoped>
img {
  width: 100%;
}
</style>