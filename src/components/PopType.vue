<template>
  <van-popup
    v-model:show="store.typeShow"
    lazy-render
    position="bottom"
    transition-appear
    @closed="props.refresh"
  >
    <div class="type-header">请选择类型</div>
    <div class="content">
      <div class="type-item">
        <van-button
          :class="{ active: store.nowData.active_name === '全部类型' }"
          class="btn"
          @click="setType({ name: '全部类型', id: 'all' })"
          >全部类型
        </van-button>
      </div>
      <div class="title">支出</div>
      <div class="type-item">
        <van-button
          v-for="item in store.typeListOut"
          :key="item"
          :class="{
            active:
              store.nowData.active_name === item.name &&
              store.nowData.type_id === item.id,
          }"
          class="btn"
          @click="setType(item)"
          >{{ item.name }}
        </van-button>
      </div>
      <div class="title">收入</div>
      <div class="type-item">
        <van-button
          v-for="item in store.typeListIn"
          :key="item"
          :class="{
            active:
              store.nowData.active_name === item.name &&
              store.nowData.type_id === item.id,
          }"
          class="btn"
          @click="setType(item)"
          >{{ item.name }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { defaultStore } from "../store";
import { defineProps, onMounted } from "vue";
import { Get } from "../utils/request";

const props = defineProps({
  refresh: {
    type: Function,
    required: true,
  },
});
const store = defaultStore();
onMounted(() => {
  if (store.typeListOut.length === 0 && store.typeListIn.length === 0) {
    Get("/type/list").then((res) => {
      res.data.list.forEach((res) => {
        if (res.type === 1) {
          store.typeListOut.push(res);
        } else {
          store.typeListIn.push(res);
        }
      });
    });
  }
});

function setType(item) {
  store.nowData.active_name = item.name;
  store.nowData.type_id = item.id;
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

    .active {
      background: #1989fa;
      color: #fff;
    }
  }
}
</style>