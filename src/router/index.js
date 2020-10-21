import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/dashboard",
        name: "DashBoard",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/DashBoard.vue")
    },
    {
        path: "/receita",
        name: "Receita",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Receitas.vue")
    },
    {
        path: "/planejamento",
        name: "Planejamento",
        component: () =>
            import(
                /* webpackChunkName: "internal" */ "../views/Planejamento.vue"
            )
    },
    {
        path: "/administrador",
        name: "Administrador",
        component: () =>
            import(
                /* webpackChunkName: "internal" */ "../views/Administrador.vue"
            )
    },
    {
        path: "/relatorio",
        name: "Relatorio",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Relatorios.vue")
    },
    {
        path: "/despesa",
        name: "Despesa",
        component: () =>
            import(/* webpackChunkName: "internal" */ "../views/Despesas.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;
