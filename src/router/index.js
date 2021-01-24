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
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Register.vue"),
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
                path: "edit-status",
                name: "LogsEdit",
                meta: {
                    permission: {
                        read: true
                    }
                },
                props: true,
                beforeEnter(_to, _from, next) {
                    next();
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/receita/LogsEdit.vue"
                    )
            },
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
                    ),
                children: [
                    {
                        path: "categoria-receita",
                        name: "CategoriaReceita",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/categoria/CategoriaReceita.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-categoria-receita",
                        name: "EditCategoriaReceita",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/categoria/CategoriaReceita.vue"
                            )
                    },
                    {
                        path: "banco",
                        name: "Banco",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/banco/Banco.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-banco",
                        name: "EditBanco",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/banco/Banco.vue"
                            )
                    }
                ]
            },
            {
                path: ":id/edit-receita",
                name: "EditReceita",
                props: true,
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
                    ),
                children: [
                    {
                        path: "categoria-receita",
                        name: "EditingCategoriaReceita",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/categoria/CategoriaReceita.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-categoria-receita",
                        name: "EditingEditCategoriaReceita",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/categoria/CategoriaReceita.vue"
                            )
                    },
                    {
                        path: "banco",
                        name: "EditingBanco",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/banco/Banco.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-banco",
                        name: "EditingEditBanco",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/receita/banco/Banco.vue"
                            )
                    }
                ]
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
            },
            {
                path: "new-planejamento",
                name: "PlanejamentoForm",
                meta: {
                    permission: {
                        read: true
                    }
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/planejamento/PlanejamentoForm.vue"
                    ),
                children: [
                    {
                        path: "categoria-despesa",
                        name: "PlanCategoriaDespesa",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-categoria-despesa",
                        name: "PlanEditCategoriaDespesa",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            )
                    }
                ]
            },
            {
                path: ":id/edit-planejamento",
                name: "EditPlanejamentoForm",
                props: true,
                meta: {
                    permission: {
                        read: true
                    }
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/planejamento/PlanejamentoForm.vue"
                    ),
                children: [
                    {
                        path: "categoria-despesa",
                        name: "EditingPlanCategoriaDespesa",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-categoria-despesa",
                        name: "EditingPlanEditCategoriaDespesa",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            )
                    }
                ]
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
        },
        children: [
            {
                path: "role-info",
                name: "RoleList",
                props: true,
                meta: {
                    permission: {
                        read: true
                    }
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/admin/RoleList.vue"
                    )
            },
            {
                path: "role-change",
                name: "ChangeRoles",
                props: true,
                meta: {
                    permission: {
                        read: true
                    }
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/admin/ChangeRole.vue"
                    )
            }
        ]
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
        },
        children: [
            {
                path: "edit-status",
                name: "LogsEditDespesa",
                meta: {
                    permission: {
                        read: true
                    }
                },
                props: true,
                beforeEnter(_to, _from, next) {
                    next();
                },
                component: () =>
                    import(
                        /* webpackChunkName: "internal" */ "../components/despesa/LogsEdit.vue"
                    )
            },
            {
                path: "new-despesa",
                name: "NewDespesa",
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
                        /* webpackChunkName: "internal" */ "../components/despesa/DespesaForm.vue"
                    ),
                children: [
                    {
                        path: "categoria-despesa",
                        name: "CategoriaDespesa",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-categoria-despesa",
                        name: "EditCategoriaDespesa",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            )
                    },
                    {
                        path: "cartao",
                        name: "Cartao",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/cartao/Cartao.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-cartao",
                        name: "EditCartao",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/cartao/Cartao.vue"
                            )
                    }
                ]
            },
            {
                path: ":id/edit-despesa",
                name: "EditDespesa",
                props: true,
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
                        /* webpackChunkName: "internal" */ "../components/despesa/DespesaForm.vue"
                    ),
                children: [
                    {
                        path: "categoria-despesa",
                        name: "EditingCategoriaDespesa",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-categoria-despesa",
                        name: "EditingEditCategoriaDespesa",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/categoria/CategoriaDespesa.vue"
                            )
                    },
                    {
                        path: "cartao",
                        name: "EditingCartao",
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/cartao/Cartao.vue"
                            ),
                        meta: {
                            permission: {
                                read: true
                            }
                        }
                    },
                    {
                        path: ":idCat/edit-cartao",
                        name: "EditingEditCartao",
                        props: true,
                        meta: {
                            permission: {
                                read: true
                            }
                        },
                        beforeEnter(_to, _from, next) {
                            next();
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "internal" */ "../components/despesa/cartao/Cartao.vue"
                            )
                    }
                ]
            }
        ]
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
