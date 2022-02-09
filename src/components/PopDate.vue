<template>
  <van-popup
    v-model:show="store.dateShow"
    lazy-render
    position="bottom"
    transition-appear
    @closed="props.refresh"
  >
    <van-datetime-picker
      v-model="store.nowData.time"
      :formatter="formatter"
      :max-date="date.maxDate"
      :min-date="date.minDate"
      :type="store.dateType"
      title="选择年月"
      @confirm="complete"
    />
  </van-popup>
</template>

<script setup>
import { defaultStore } from "../store";
import { defineProps, reactive } from "vue";

const store = defaultStore();
const props = defineProps({
  refresh: {
    type: Function,
    required: false,
  },
});
const formatter = (type, val) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  if (type === "day") {
    return `${val}日`;
  }
  return val;
};
const date = reactive({
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2025, 10, 1),
});

function complete() {
  store.dateShow = false;
}
</script>

<style lang="scss" scoped>
.type-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 1.49333rem;
  text-align: center;
  font-size: 0.37333rem;
  line-height: 1.49333rem;
  color: rgba(0, 0, 0, 0.9);
  background-color: #fff;
}

.content {
  padding: 10px;
  display: flex;
  flex-flow: column;

  .title {
    color: rgba(0, 0, 0, 0.9);
    margin: 0.26667rem 0;
    font-size: 0.37333rem;
  }

  .type-item {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    .btn {
      width: 3rem;
      margin-bottom: 0.2rem;
    }
  }
}
</style>