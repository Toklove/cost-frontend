<template>
  <div class="container">
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="账单详情"
      @click-left="$router.go(-1)"
    />
    <div class="item">
      <div class="card">
        <div class="name">{{ data.type_name }}</div>
        <div :class="data.pay_type === 1 ? 'reduce' : 'plus'" class="amount">
          {{ data.pay_type === 1 ? "-" : "+" }} {{ data.amount }}
        </div>
        <div class="info">
          <div class="info-item">
            <span class="title">记录时间</span
            ><span class="context">{{
              dayjs.unix(data.date).format("YYYY-MM-DD hh:mm:ss")
            }}</span>
          </div>
          <div class="info-item">
            <span class="title">备注</span
            ><span class="context">{{ data.remark }}</span>
          </div>
        </div>
        <div class="button">
          <span class="delete" @click="confirm"
            ><van-icon name="delete" />删除</span
          ><span class="edit" @click="edit"
            ><van-icon name="records" />修改</span
          >
        </div>
      </div>
    </div>
    <PopEdit edit-type="edit" />
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { Delete, Get } from "../../utils/request";
import PopEdit from "../../components/PopEdit.vue";

import dayjs from "dayjs";
import { Dialog, Toast } from "vant/es";
import router from "../../router";
import { defaultStore } from "../../store";

const store = defaultStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const data = ref({
  amount: "20",
  date: 1643689448,
  id: 2,
  pay_type: 1,
  remark: "备注信息",
  type_id: "2",
  type_name: "服饰",
  user_id: 13,
});
onMounted(() => {
  Get(`/bill/${props.id}`).then((res) => {
    console.log(res);
    data.value = res.data.bill;
  });
});

function edit() {
  store.editShow = true;
  store.keyboard = data;
  store.nowData.time = dayjs.unix(data.value.date).$d;
}

function confirm() {
  Dialog.confirm({
    title: "请确认",
    message: "您是否要删除该数据",
  })
    .then(() => {
      // on confirm
      Delete(`/bill/${data.value.id}`, {}).then((res) => {
        if (res.code === 200) {
          Toast("删除成功");
          setTimeout(() => {
            router.push({ name: "UserHome" });
          }, 800);
        } else {
          Toast(res.msg);
        }
      });
    })
    .catch(() => {
      // on cancel
      Toast("已取消");
    });
}
</script>

<style lang="scss" scoped>
.card {
  padding: 0 0.32rem;
  display: flex;
  flex-flow: column;
  background: #fff;
  text-align: center;

  .name {
    font-size: 0.4rem;
    padding: 0.64rem 0 0.32rem 0;
  }

  .amount {
    font-size: 0.64rem;
    font-weight: 600;
    margin-bottom: 0.64rem;
  }

  .info {
    display: flex;
    flex-flow: column;

    .info-item {
      display: flex;
      font-size: 0.37333rem;
      text-align: left;
      padding: 0.1rem 0;

      .title {
        color: rgba(0, 0, 0, 0.5);
        flex: 1;
      }

      .context {
        flex: 3;
      }
    }
  }

  .button {
    padding: 0.64rem 0 0.64rem 0;
    display: flex;
    font-size: 0.42667rem;

    .delete,
    .edit {
      flex: 1;
    }

    .delete {
      color: red;
    }
  }
}
</style>