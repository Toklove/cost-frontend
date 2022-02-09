<template>
  <div class="container">
    <div class="header">
      <div class="userinfo">
        <span class="nickname">昵称：{{ store.userInfo.username }}</span>
        <span class="slogan"
          ><img
            alt=""
            src="//s.yezgea02.com/1615973630132/geqian.png"
            style="width: 30px; height: 30px; vertical-align: -10px"
          />{{ store.userInfo.slogan }}</span
        >
      </div>
      <div class="avatar">
        <van-image
          :src="store.userInfo.avatar"
          fit="cover"
          height="2rem"
          round
          width="2rem"
        />
      </div>
    </div>
    <div class="cell">
      <van-cell-group>
        <van-cell
          is-link
          title="修改用户信息"
          @click="$router.push({ name: 'UserEdit' })"
        />
        <van-cell is-link title="重置密码" @click="pass.show = true" />
      </van-cell-group>
    </div>
    <van-button
      class="logout"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      @click="logout"
      >退出登录
    </van-button>
    <van-dialog
      v-model:show="pass.show"
      :showConfirmButton="false"
      title="修改密码"
    >
      <van-cell-group inset style="padding-bottom: 0.69333rem">
        <van-field v-model="pass.pass" placeholder="请输入新密码" />
        <van-field v-model="pass.again" placeholder="请确认新密码" />
        <div class="dialog-btn">
          <van-button type="danger" @click="pass.show = false"
            >取消
          </van-button>
          <van-button type="primary" @click="ResetPass">确认</van-button>
        </div>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { defaultStore } from "../../store";
import { Get, Put } from "../../utils/request";
import { Toast } from "vant";

const pass = reactive({
  pass: "",
  again: "",
  show: false,
});
const store = defaultStore();
onMounted(() => {
  store.menu = 2;
  Get("/user/userinfo").then((res) => {
    store.userInfo = res.data.userInfo;
  });
});

function logout() {
  window.localStorage.removeItem("accessToken");
  location.reload();
}

function ResetPass() {
  if (pass.pass !== pass.again) {
    Toast("两次输入的密码不一致，请重试");
    return;
  }
  Put("/user/userinfo", { password: pass.pass }).then((res) => {
    if (res.code === 200) {
      Toast("修改成功");
      setTimeout(() => {
        pass.show = false;
      }, 1000);
    } else {
      Toast(res.msg);
    }
  });
}
</script>

<style lang="scss" scoped>
.header {
  height: 4.26667rem;
  background: url(//s.yezgea02.com/1615971681107/%E4%BD%8D%E5%9B%BE%402x.png)
    no-repeat;
  background-size: cover;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  padding: 0.64rem;

  .userinfo {
    color: #fff;
    display: flex;
    flex-flow: column;

    .nickname {
      font-size: 0.42667rem;
      font-weight: 700;
      margin-bottom: 0.16rem;
      -webkit-align-self: baseline;
      align-self: baseline;
      background-color: #597fe7;
      padding: 0.05333rem 0.26667rem;
      border-radius: 0.53333rem;
    }

    .slogan {
      font-weight: bolder;
      font-size: 0.3rem;
    }
  }
}

.cell {
  width: 90%;
  position: absolute;
  top: 3.2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0.08rem 0.05333rem 0.53333rem 0.26667rem rgb(0 0 0 / 10%);
  border-radius: 0.26667rem;
  overflow: hidden;
}

.logout {
  width: 90%;
  position: absolute;
  bottom: 1.86667rem;
  left: 50%;
  transform: translateX(-50%);
}

.dialog-btn {
  width: 80%;
  margin: 0.5rem auto 0;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;

  .van-button {
    flex: 1;
  }
}
</style>