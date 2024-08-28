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
    path: "/perfil/:username/:id?",
    name: "perfil",
    meta: {
      title: "index",
      authRequired: false,
    },
    component: () => import("../views/perfil/Index.vue"),
  },

  //projeto
  {
    path: "/projetos",
    name: "projetos",
    meta: {
      title: "projetos",
      authRequired: false,
    },
    component: () => import("../views/projetos/index.vue"),
  },

  //Formação
  {
    path: "/formacao",
    name: "formacao",
    meta: {
      title: "formacao",
      authRequired: false,
    },
    component: () => import("../views/formacao/index.vue"),
  },

  //Egressos
  {
    path: "/egressos",
    name: "egressos",
    meta: {
      title: "egressos",
      authRequired: false,
    },
    component: () => import("../views/egressos/estudante/index.vue"),
  },
  //Egressos
  {
    path: "/egressos/lista",
    name: "lista",
    meta: {
      title: "lista",
      authRequired: false,
    },
    component: () => import("../views/egressos/admin/index.vue"),
  },

  //Experiencia
  {
    path: "/experiencia",
    name: "experiencia",
    meta: {
      title: "experiencia",
      authRequired: false,
    },
    component: () => import("../views/experiencia/index.vue"),
  },
];

export default routes;
