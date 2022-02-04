<script lang="ts" setup>
import "animate.css";
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import url("./assets/css/default.scss");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f5f5f5;
}

.container {
  position: absolute;
  width: 100%;
  height: 80vh;
}
</style>