import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Initial",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Initial.vue"),
        meta: {
            public: true
        },
        beforeEnter(_to, _from, next) {
            store.commit("LOGOUT");
            next();
        }
    },
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
        },
        children: [
            {
                path: "forget-password",
                name: "ForgetPassword",
                meta: {
                    public: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/global/ForgetPassword.vue"
                    )
            }
        ]
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
        },
        children: [
            {
                path: "new-receita",
                name: "NewReceita",
                meta: {
                    permission: {
                        read: true
                    }
                },
                beforeEnter(_to, _from, next) {
                    console.log("Testando antes de entrar");
                    next();
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/receita/ReceitaForm.vue"
                    )
            }
        ]
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
        },
        children: [
            {
                path: "categorias-planejamento",
                name: "PlanejamentosCategorias",
                props: true,
                meta: {
                    permission: {
                        read: true
                    }
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/planejamento/CategoriaPlanejamento.vue"
                    )
            }
        ]
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
