<template>
  <div class="container">
    <div class="total">
      <van-button class="time" size="small" @click="store.dateSelect()"
        >{{ dayjs(store.nowData.time).format("YYYY-MM") }} |
        <van-icon name="calendar-o" />
      </van-button>
      <div class="title">共支出</div>
      <div class="expense">¥{{ payItem.total_expense.toFixed(2) }}</div>
      <div class="income">共收入¥{{ payItem.total_income.toFixed(2) }}</div>
    </div>
    <div class="data">
      <div class="header">
        <div class="title">收支构成</div>
        <div class="tabs">
          <van-button
            v-for="item in buttonList"
            :key="item"
            :class="{ active: payItem.pay_type === item.id }"
            class="tab"
            size="mini"
            @click="setType(item.id)"
            >{{ item.name }}
          </van-button>
        </div>
      </div>
      <div id="customerChart" style="width: 100%; height: 100%"></div>
    </div>
    <PopDate :refresh="refresh" />
  </div>
</template>

<script setup>
import * as echarts from "echarts/core";
import { LegendComponent, TooltipComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, reactive, ref } from "vue";
import { defaultStore } from "../../store";
import { Get } from "../../utils/request";
import PopDate from "../../components/PopDate.vue";
import dayjs from "dayjs";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
const store = defaultStore();
store.menu = 1;
const payItem = reactive({
  total_expense: 0,
  total_income: 0,
  pay_type: 1,
});
const buttonList = [
  { name: "支出", id: 1 },
  { name: "收入", id: 2 },
];
const option = ref({
  tooltip: {
    trigger: "item",
    formatter: "{c}元｜{d}%",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "暂无数据",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
  ],
});

async function getData() {
  await Get(
    `/bill/data?date=${dayjs(store.nowData.time).format("YYYY-MM")}`
  ).then((res) => {
    const result = [];
    payItem.total_expense = res.data.total_expense;
    payItem.total_income = res.data.total_income;
    res.data.total_data.forEach((r) => {
      if (r.pay_type === payItem.pay_type) {
        result.push({
          value: r.number,
          name: r.type_name,
        });
      }
    });
    option.value.series[0].data = result;
    let myChart = echarts.init(document.querySelector("#customerChart"));
    option.value && myChart.setOption(option.value);
  });
}

onMounted(async () => {
  await getData();
});

async function refresh() {
  echarts.dispose(document.querySelector("#customerChart"));
  await getData();
}

function setType(type) {
  payItem.pay_type = type;
  refresh();
}
</script>

<style lang="scss" scoped>
.total {
  background-color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  justify-content: center;
  padding: 0.64rem 0;
  height: 30vh;
  margin-bottom: 0.26667rem;

  .time {
    background: #f5f5f5;
    margin-bottom: 0.42667rem;
  }

  .title {
    color: #007fff;
    margin-bottom: 0.21333rem;
    font-size: 0.32rem;
    font-weight: 500;
  }

  .expense {
    font-size: 0.64rem;
    color: #007fff;
    font-weight: 600;
    margin-bottom: 0.42667rem;
  }

  .income {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    font-size: 0.2rem;
  }
}

.data {
  height: 70vh;
  padding: 0 0.42667rem;
  background-color: #fff;
  margin-bottom: 0.26667rem;

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.32rem 0;

    .title {
      font-size: 0.48rem;
      color: rgba(0, 0, 0, 0.9);
    }

    .tabs {
      display: flex;
      justify-content: space-between;

      .van-button {
        margin-left: 0.26667rem;
        background-color: #f5f5f5;
        border-radius: 0.10667rem;
        padding: 0.1rem 0.2rem;
        transition: all 0.5s ease;
      }

      .active {
        background: #1989fa;
        color: #fff;
      }
    }
  }
}
</style>