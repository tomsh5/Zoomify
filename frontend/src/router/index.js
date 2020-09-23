import vue from "vue";
import vueRouter from "vue-router";
import home from "../views/home.vue";
import eventoApp from "../views/evento-app.cmp.vue";
import eventoEdit from "../views/evento-edit.cmp.vue";
import eventoDetails from "../views/evento-details.cmp.vue";
import userLogin from "../views/user-login.cmp.vue";
import about from "../views/about.vue";
import userProfile from "../views/user-profile.cmp.vue";
import userDetails from "../components/user-details.cmp.vue";
import joinedEvents from "../components/joined-events.cmp.vue";
import createdEvents from "../components/created-events.cmp.vue";



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
		path: "/profile",
		name: "userProfile",
		component: userProfile,
		linkExactActiveClass: 'is-active',

		children:[
			{
				// UserProfile will be rendered inside User's <router-view>
				// when /user/:id/profile is matched
				path: 'details',
				component: userDetails
			  },
			  {
				// UserPosts will be rendered inside User's <router-view>
				// when /user/:id/posts is matched
				path: 'joined',
				component: joinedEvents
			  },
			  {
				// UserPosts will be rendered inside User's <router-view>
				// when /user/:id/posts is matched
				path: 'created',
				component: createdEvents
			  }

		]
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
