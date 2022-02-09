import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Toast } from "vant";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/auth",
    name: "Auth",
    component: () => import("../views/Auth/Index.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/Home/Index.vue"),
    children: [
      {
        path: "/",
        name: "UserHome",
        component: () => import("../views/Home/Home.vue"),
      },
      {
        path: "/user/info",
        name: "UserInfo",
        component: () => import("../views/User/Index.vue"),
      },
      {
        path: "/data",
        name: "Data",
        props: true,
        component: () => import("../views/data/Index.vue"),
      },
    ],
  },
  {
    path: "/bill/detail/:id",
    name: "Detail",
    props: true,
    component: () => import("../views/Detail/Index.vue"),
  },
  {
    path: "/user/edit",
    name: "UserEdit",
    props: true,
    component: () => import("../views/User/Edit.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("accessToken") && to.path != "/user/auth") {
    Toast("未登录");
    next({ name: "Auth" });
  } else if (localStorage.getItem("accessToken") && to.path == "/user/auth") {
    Toast("已登录");
    next({ name: "UserHome" });
  } else {
    next();
  }
});
export default router;
