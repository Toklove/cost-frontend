<template>
  <div class="container">
    <div class="header">
      <div class="money">
        <span class="out"
          >总支出： <b>¥{{ data.total_expense }}</b></span
        >
        <span class="in"
          >总收入：<b>¥{{ data.total_income }}</b></span
        >
      </div>
      <div class="select">
        <van-button
          plain
          size="mini"
          type="primary"
          @click="store.typeSelect()"
        >
          {{ store.nowData.active_name }}
          <van-icon name="descending" />
        </van-button>
        <van-button
          plain
          size="mini"
          type="primary"
          @click="store.dateSelect()"
        >
          {{ dayjs(store.nowData.time).format("YYYY-MM") }}
          <van-icon name="descending" />
        </van-button>
      </div>
    </div>
    <van-pull-refresh
      v-model="data.refresh"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <CardItem
        v-for="item in data.list"
        v-if="data.list != null && data.list !== '[]'"
        :bill="item"
      />
      <van-empty v-else description="暂无数据" image="error" />
    </van-pull-refresh>

    <button class="add">
      <van-icon name="records" />
    </button>
    <PopType :refresh="onRefresh" :v-show="store.typeShow" />
    <PopDate :refresh="onRefresh" :v-show="store.dateShow" />
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { defaultStore } from "../../store";
import PopType from "../../components/PopType.vue";
import PopDate from "../../components/PopDate.vue";
import CardItem from "../../components/CardItem.vue";
import { Get } from "../../utils/request";
import dayjs from "dayjs";

const store = defaultStore();
const data = reactive({
  total_income: 0,
  total_expense: 0,
  list: [],
  refresh: false,
});

function GetData() {
  Get(
    `/bill?type_id=${store.nowData.type_id}&date=${dayjs(
      store.nowData.time
    ).format("YYYY-MM")}`
  ).then((res) => {
    data.total_income = res.data.total_income;
    data.total_expense = res.data.total_expense;
    data.list = res.data.list;
    data.refresh = false;
  });
}

onMounted(() => {
  GetData();
});

function onRefresh() {
  data.refresh = true;
  GetData();
}
</script>

<style lang="scss">
.container {
  .van-pull-refresh {
    height: 80vh;
  }
}
</style>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 2.13333rem;
  background-color: #007fff;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  color: white;
  font-size: 0.32rem;

  .money {
    margin: 0.2rem;

    span {
      margin: 0 0.2rem;
    }

    b {
      font-size: 0.7rem;
      font-family: DINCondensed-Bold, DINCondensed, serif;
    }
  }

  .select {
    padding: 0 0.2rem 0.2rem;
    display: flex;
    justify-content: flex-end;
  }
}

.add {
  position: fixed;
  bottom: 2.66667rem;
  right: 0.8rem;
  z-index: 1000;
  width: 1.33333rem;
  height: 1.33333rem;
  border-radius: 50%;
  box-shadow: 0 0 0.26667rem 0 rgb(0 0 0 / 20%);
  background-color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  border: 1px solid #e9e9e9;
  color: #007fff;
}
</style>