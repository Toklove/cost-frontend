<template>
  <div class="container">
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="用户信息"
      @click-left="$router.go(-1)"
    />
    <div class="userinfo">
      <h1 class="title items">个人资料</h1>
      <div class="items">
        <div class="title">头像</div>
        <div class="avatar">
          <van-image
            :src="store.userInfo.avatar"
            fit="cover"
            height="3rem"
            round
            width="3rem"
          />
          <div class="desc">
            <span>支持 jpg、png、jpeg 格式大小 500KB 以内的图片</span>
            <van-uploader
              :after-read="afterRead"
              :max-size="500 * 1024"
              multiple
              @oversize="onOversize"
            >
              <van-button size="small" type="primary">点击上传</van-button>
            </van-uploader>
          </div>
        </div>
      </div>
      <van-cell-group class="items">
        <van-field
          v-model="store.userInfo.slogan"
          label="个性签名"
          placeholder="请输入个性签名"
        />
      </van-cell-group>
      <van-button size="large" type="primary" @click="saveUserInfo"
        >保存
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { defaultStore } from "../../store";
import { Toast } from "vant/es";
import { Get, Put, request } from "../../utils/request";
import { onMounted } from "vue";

const store = defaultStore();
const onOversize = (file) => {
  Toast("文件大小不能超过 500kb");
};
const afterRead = (file) => {
  let targetFormData = new FormData();
  targetFormData.append("file", file.file);
  console.log(file);
  request({
    method: "post",
    url: "/upload",
    data: targetFormData,
  }).then((res) => {
    console.log(res);
    Toast(res.data.msg);
    store.userInfo.avatar = `${request.defaults.baseURL.slice(0, -3)}${
      res.data.data.res
    }`;
  });
};

onMounted(() => {
  Get("/user/userinfo").then((res) => {
    store.userInfo = res.data.userInfo;
  });
});

function saveUserInfo() {
  Put("/user/userinfo", {
    avatar: store.userInfo.avatar,
    slogan: store.userInfo.slogan,
  }).then((res) => {
    console.log(res);
    if (res.code === 200) {
      Toast(res.msg);
    } else {
      Toast("修改失败请重试");
    }
  });
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  height: 100vh;
}

.userinfo {
  padding: 0 0.26667rem;

  .title {
    font-size: 0.6rem;
    margin: 0.67em 0;
  }

  .items {
    border-bottom: 0.02667rem solid #e9e9e9;
    padding-bottom: 0.26667rem;

    .avatar {
      display: flex;
      justify-content: space-between;

      .desc {
        span {
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>