import { defineStore } from "pinia";

export const defaultStore = defineStore("default", {
  state: () => {
    return {
      dateShow: false,
      dateType: "date",
      typeShow: false,
      editShow: false,
      keyboard: {
        pay_type: 1,
        remark: "",
        amount: "",
        type_name: "",
        type_id: 0,
      },
      nowData: {
        type_id: "all",
        active_name: "全部类型",
        time: new Date(),
      },
      typeListIn: [],
      typeListOut: [],
      menu: 0,
      userInfo: {
        username: "TokLove",
        avatar: "https://q1.qlogo.cn/g?b=qq&nk=2586438083&s=640",
        slogan: "冰冻三尺非一日之寒",
      },
    };
  },
  actions: {
    typeSelect() {
      this.typeShow = true;
    },
    dateSelect() {
      this.dateShow = true;
      this.dateType = "year-month";
    },
  },
});
