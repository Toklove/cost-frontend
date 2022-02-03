<template>
  <div>
    <div class="bg"></div>
    <div class="login">
      <div class="banner"></div>
      <van-tabs v-model="active" color="#597FE7">
        <van-tab title="登录">
          <van-form
            class="form"
            label-align="center"
            show-error
            submit-on-enter
          >
            <van-field
              v-model="user.username"
              :rules="[{ required: true, message: '请填写用户名' }]"
              label="用户名"
              name="用户名"
              placeholder="用户名"
            />
            <van-field
              v-model="user.password"
              :rules="[{ required: true, message: '请填写密码' }]"
              label="密码"
              name="密码"
              placeholder="密码"
              type="password"
            />
            <div style="margin: 16px">
              <van-button
                block
                native-type="submit"
                type="primary"
                @click="Login"
                >提交
              </van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="注册">
          <van-form
            class="form"
            label-align="center"
            show-error
            submit-on-enter
          >
            <van-field
              v-model="user.username"
              :rules="[{ required: true, message: '请填写用户名' }]"
              label="用户名"
              name="用户名"
              placeholder="用户名"
            />
            <van-field
              v-model="user.password"
              :rules="[{ required: true, message: '请填写密码' }]"
              label="密码"
              name="密码"
              placeholder="密码"
              type="password"
            />
            <van-field
              v-model="user.again"
              :rules="[{ required: true, message: '请再次填写密码' }]"
              label="密码"
              name="密码"
              placeholder="再次填写密码"
              type="password"
            />
            <div style="margin: 16px">
              <van-button
                block
                native-type="submit"
                type="primary"
                @click="Register"
                >提交
              </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Toast } from "vant/es";
import { Post } from "../../utils/request";
import router from "../../router";

const active = ref(1);
const user = reactive({
  username: "",
  password: "",
  again: "",
});

function Login() {
  if (!user.username || !user.password) {
    Toast("请完善用户信息");
  }
  Post("/user/login", {
    username: user.username,
    password: user.password,
  }).then((res) => {
    console.log(res);
    if (res.code === 200) {
      Toast("登录成功");
      window.localStorage.setItem("accessToken", res.data.token);
      setTimeout(() => {
        router.push({ name: "UserHome" });
      }, 800);
    } else {
      Toast(res.msg);
    }
  });
}

function Register() {
  if (!user.username || !user.password || !user.again) {
    Toast("请完善用户信息");
    return;
  }
  if (user.password !== user.again) {
    Toast("两次密码不一致");
    return;
  }
  Post("/user/register", {
    username: user.username,
    password: user.password,
  }).then((res) => {
    if (res.code === 200) {
      Toast("注册成功");
      active.value = 2;
    } else {
      Toast(res.msg);
    }
  });
}
</script>

<style lang="scss">
.van-tabs__wrap {
  .van-tabs__nav--line {
    background: none;
  }
}

.van-cell {
  background: none;
}
</style>
<style lang="scss" scoped>
.bg {
  width: 100%;
  position: absolute;
  min-height: 100vh;
  background-image: -webkit-linear-gradient(
    233deg,
    #6fb9f8,
    #3daaf85e,
    #49d3fc1a,
    #3fd3ff00
  );
  background-image: linear-gradient(
    217deg,
    #6fb9f8,
    #3daaf85e,
    #49d3fc1a,
    #3fd3ff00
  );
}

.login {
  position: absolute;
  width: 100%;

  .banner {
    height: 5.33333rem;
    background: url(//s.yezgea02.com/1616032174786/cryptocurrency.png) no-repeat
      center;
    -webkit-tap-highlight-color: transparent;
    background-size: 120%;
    border-bottom-left-radius: 0.32rem;
    border-bottom-right-radius: 0.32rem;
  }

  .form {
    margin-top: 0.3rem;
  }
}
</style>