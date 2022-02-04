<template>
  <div class="item">
    <div class="header">
      <div class="date">{{ bill.date }}</div>
      <div class="money">
        <span class="out">
          <img alt="支" src="//s.yezgea02.com/1615953405599/zhi%402x.png" />
          <span>¥ {{ outMoney }}</span>
        </span>
        <span class="in">
          <img
            alt="收"
            src="//s.yezgea02.com/1615953405599/shou%402x.png"
          /><span>¥ {{ inMoney }}</span></span
        >
      </div>
    </div>
    <div class="body">
      <van-cell
        v-for="item in bill.bills"
        :label="item.remark"
        :title="item.type_name"
        @click="$router.push({ name: 'Detail', params: { id: item.id } })"
      >
        <template #value
          ><span :class="item.pay_type === 2 ? 'plus' : 'reduce'"
            >{{ item.pay_type === 2 ? "+" : "-" }} {{ item.amount }}</span
          >
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  bill: {
    type: Object,
    required: true,
  },
});
let outMoney = 0,
  inMoney = 0;
props.bill.bills.forEach((r: { pay_type: number; amount: string }) => {
  if (r.pay_type === 1) {
    outMoney += parseInt(r.amount);
  } else {
    inMoney += parseInt(r.amount);
  }
});
</script>

<style lang="scss" scoped>
.item {
  .header {
    padding: 0 0.26667rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9f9f9;
    color: rgba(0, 0, 0, 0.9);
    height: 1.06667rem;

    .date {
      font-weight: 700;
      font-size: 0.42667rem;
    }

    .money {
      font-size: 0.38rem;

      .out,
      .in {
        margin-left: 0.53333rem;
      }

      img {
        width: 0.53333rem;
        margin-right: 0.10667rem;
        vertical-align: -0.10667rem;
      }
    }
  }
}
</style>