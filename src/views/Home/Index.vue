<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <van-tabbar v-model="store.menu">
      <van-tabbar-item
        icon="wap-home"
        @click="$router.push({ name: 'UserHome' })"
        >首页
      </van-tabbar-item>
      <van-tabbar-item icon="column" @click="$router.push({ name: 'Data' })"
        >统计
      </van-tabbar-item>
      <van-tabbar-item
        icon="manager"
        @click="$router.push({ name: 'UserInfo' })"
        >我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { defaultStore } from "../../store";
import "animate.css";

const store = defaultStore();
</script>