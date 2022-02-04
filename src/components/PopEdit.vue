<template>
  <van-popup
    v-model:show="store.editShow"
    class="edit"
    lazy-render
    position="bottom"
    round
    transition-appear
    @closed="props.refresh"
  >
    <div class="filter">
      <div class="select-left">
        <van-button
          v-for="item in filter"
          :class="store.keyboard.pay_type === item.id ? 'active' : ''"
          class="select-btn"
          plain
          round
          size="small"
          @click="store.keyboard.pay_type = item.id"
          >{{ item.name }}
        </van-button>
      </div>
      <van-button
        class="select-btn"
        icon="sort"
        icon-position="right"
        plain
        round
        size="small"
        @click="
          store.dateShow = true;
          store.dateType = 'date';
        "
        >{{ dayjs(store.nowData.time).format("MM-DD") }}
      </van-button>
    </div>
    <van-cell-group inset>
      <div class="money">
        <div class="fix">¥</div>
        <span class="amount animation">{{ store.keyboard.amount }}</span>
      </div>
      <div class="type-list">
        <van-button
          v-for="item in store.keyboard.pay_type === 1
            ? store.typeListOut
            : store.typeListIn"
          :class="{
            active:
              store.keyboard.type_name === item.name &&
              store.keyboard.type_id == item.id,
          }"
          class="type-item"
          plain
          @click="
            store.keyboard.type_name = item.name;
            store.keyboard.type_id = `${item.id}`;
          "
        >
          {{ item.name }}
        </van-button>
      </div>
      <div class="remark">
        <van-cell-group inset>
          <van-field
            v-model="store.keyboard.remark"
            autosize
            label="备注"
            maxlength="50"
            placeholder="请输入备注"
            rows="2"
            show-word-limit
            type="textarea"
          />
        </van-cell-group>
      </div>
    </van-cell-group>
    <van-number-keyboard
      v-model="store.keyboard.amount"
      :show="true"
      close-button-text="完成"
      extra-key="."
      theme="custom"
      @blur="true"
      @close="EditAction"
    />
    <PopDate />
  </van-popup>
</template>

<script setup>
import { defaultStore } from "../store";
import { defineProps } from "vue";
import PopDate from "../components/PopDate.vue";
import dayjs from "dayjs";
import { Post, Put } from "../utils/request";
import { Toast } from "vant/es";

const props = defineProps({
  refresh: {
    type: Function,
    required: false,
  },
  editType: {
    type: String,
    required: true,
  },
});
const store = defaultStore();
const filter = [
  { name: "支出", id: 1 },
  { name: "收入", id: 2 },
];

function EditAction() {
  switch (props.editType) {
    case "edit":
      Put(`/bill/${store.keyboard.id}`, store.keyboard).then((res) => {
        if (res.code === 200) {
          Toast("修改成功");
          store.editShow = false;
        } else {
          Toast(res.msg);
        }
      });
      break;
    case "new":
      Post("/bill", {
        ...store.keyboard,
        date: dayjs(store.nowData.time).unix(),
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          Toast("添加成功");
        } else {
          Toast(res.msg);
        }
      });
      break;
  }
}
</script>
<style lang="scss">
.edit {
  .van-number-keyboard {
    position: relative;
  }
}
</style>
<style lang="scss" scoped>
.filter {
  margin-top: 0.5rem;
  padding: 0.32rem 0.64rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .select-left {
    display: flex;
    align-items: center;
  }

  .select-btn {
    margin-right: 0.16rem;
    padding: 0.10667rem 0.32rem;
    transition: all 0.5s ease;
  }

  .active {
    background-color: #eafbf6;
    border-color: #007fff;
    color: #007fff;
  }
}

.money {
  display: flex;
  align-items: center;
  margin-bottom: 0.32rem;
  border-bottom: 0.02667rem solid #e9e9e9;

  .fix {
    font-size: 0.96rem;
    font-weight: 700;
    vertical-align: top;
  }

  .amount {
    font-size: 1.06667rem;
    padding-left: 0.26667rem;
  }

  .animation:after {
    content: "";
    display: inline-block;
    margin-left: 0.13333rem;
    width: 0.05333rem;
    height: 0.74667rem;
    animation: dot 1s step-start infinite;
  }

  @keyframes dot {
    50% {
      background: #999;
    }
    100% {
      background: #fff;
    }
  }
}

.type-list {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;

  .type-item {
    margin-left: 0.5rem;
  }

  .active {
    background: #1989fa;
    color: #fff;
  }
}
</style>