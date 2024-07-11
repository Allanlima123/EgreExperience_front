import Home from "../views/dashboard/Home.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    meta: {
      title: "home",
      authRequired: true,
    },
    component: Home,
  },

  //Rotas Login
  {
    path: "/",
    name: "/",
    meta: {
      title: "Login",
      authRequired: true,
    },
    component: () => import("../views/dashboard/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login",
      authRequired: false,
    },
    component: () => import("../views/account/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "Register",
      authRequired: false,
    },
    component: () => import("../views/account/Register.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      title: "Logout",
      authRequired: false,
    },
    component: () => import("../views/account/Logout"),
  },

  //Perfil
  {
    path: "/perfil",
    name: "perfil",
    meta: {
      title: "index",
      authRequired: false,
    },
    component: () => import("../views/perfil/Index.vue"),
  },
  {
    path: "/perfil/editar",
    name: "editar",
    meta: {
      title: "editar",
      authRequired: false,
    },
    component: () => import("../views/perfil/Editar.vue"),
  }


  //
];

export default routes;
