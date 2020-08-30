import vue from "vue";
import vueRouter from "vue-router";
import home from "../views/home.vue";
import eventoApp from "../views/evento-app.cmp.vue";
import eventoEdit from "../views/evento-edit.cmp.vue";
import eventoDetails from "../views/evento-details.cmp.vue";
import userLogin from "../views/user-login.cmp.vue";
import about from "../views/about.vue"



vue.use(vueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: home,
	},
	{
		path: "/events",
		name: "eventos",
		component: eventoApp,
	},
	{
		path: "/event/edit/:_id?",
		name: "eventoEdit",
		component: eventoEdit,
	},
	{
		path: "/event/details/:_id",
		name: "eventoDetails",
		component: eventoDetails,
	},
	{
		path: "/login",
		name: "userLogin",
		component: userLogin,
	},
	{
		path: "/about",
		name: "about",
		component: about,
	},
];

const router = new vueRouter({
	routes,
});

export default router;
