import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Login.vue"),
        meta: {
            public: true
        },
        beforeEnter(_to, _from, next) {
            store.commit("LOGOUT");
            next();
        }
    },
    {
        path: "/dashboard",
        name: "DashBoard",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/DashBoard.vue"),
        meta: {
            home: true
        }
    },
    {
        path: "/receita",
        name: "Receita",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Receitas.vue"),
        meta: {
            permission: {
                read: true
            }
        }
    },
    {
        path: "/planejamento",
        name: "Planejamento",
        component: () =>
            import(
                /* webpackChunkName: "internal" */ "../views/Planejamento.vue"
            ),
        meta: {
            permission: {
                read: true
            }
        }
    },
    {
        path: "/administrador",
        name: "Administrador",
        component: () =>
            import(
                /* webpackChunkName: "internal" */ "../views/Administrador.vue"
            ),
        meta: {
            permission: {
                read: true
            }
        }
    },
    {
        path: "/relatorio",
        name: "Relatorio",
        component: () =>
            import(
                /* webpackChunkName: "internal" */ "../views/Relatorios.vue"
            ),
        meta: {
            permission: {
                read: true
            }
        }
    },
    {
        path: "/despesa",
        name: "Despesa",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Despesas.vue"),
        meta: {
            permission: {
                read: true
            }
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    if (
        (to.meta.permission || to.meta.home) &&
        localStorage.getItem("refreshToken")
    ) {
        next();
    } else if (to.meta.public) {
        next();
    } else {
        next({
            name: "Login"
        });
    }
});

export default router;
