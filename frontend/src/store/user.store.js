import Vue from "vue";
import Vuex from "vuex";
import {userService} from "../services/user.service.js";

var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

Vue.use(Vuex);

export const userStore = {
	strict: true,
	state: {
		loggedInUser: null,
		// 	_id: "5f16cdd6edfffbaab19a5352",
		// 	fullName : "Arthur Read",
		// 	// imgUrl : "https://i.imgur.com/glxWil9.jpg",
		// 	eventos :[]

		users: [],
	},
	getters: {
		userPrefs(state) {
			return state.userPrefs;
		},
		users(state) {
			return state.users;
		},
		loggedInUser(state) {
			return state.loggedInUser;
		},
		
	},
	mutations: {
		setUser(state, { user }) {
			console.log('user in setUser', user);
			state.loggedInUser = user;
		},
		setUsers(state, { users }) {
			state.users = users;
		},
		removeUser(state, { userId }) {
			state.users = state.users.filter((user) => user._id !== userId);
		},
		updateUser(state, { savedUser }) {
			const idx = state.users.findIndex(
				(user) => user.id === savedUser.id
			);
			state.users.splice(idx, 1, savedUser);
		},
	},
	actions: {
		async login(context, {userCred}) {
			const user = await userService.login(userCred);
            context.commit({type: 'setUser', user})
            return user;
		},
		
		async signup(context, {userCred}) {
            const user = await userService.signup(userCred)
            context.commit({type: 'setUser', user})
            return user;
		},
		async logout(context) {
			await userService.logout();
			context.commit({ type: "setUser", user: null });
		},
		async loadUsers(context) {
			const users = await userService.query();
			context.commit({ type: "setUsers", users });
		},
		async removeUser(context, { userId }) {
			await userService.remove(userId);
			context.commit({ type: "removeUser", userId });
		},
		async updateUser(context, { user }) {
			user = await userService.update(user);
			context.commit({ type: "setUser", user });
		},

		async addEventoToUser (context, { evento }){
			console.log('evento in store', evento);
			var loggedInUser = context.getters.loggedInUser;
			const userCopyToUpdate = _.cloneDeep(loggedInUser)
			console.log('user in store', userCopyToUpdate);
			userCopyToUpdate.eventos.push(evento)
			await userService.update(userCopyToUpdate)
			// context.commit({type: "updateUser", savedUser });

		}
	},
};
