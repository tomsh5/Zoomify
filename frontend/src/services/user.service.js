import httpService from './http.service'

export const userService = {
    login,
    logout,
    signup,
    query,
    getById,
    remove,
    update
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    return httpService.post('auth/login', userCred)

}

function signup(userCred) {
    return httpService.post('auth/signup', userCred)
   
}
function logout() {
    return httpService.post('auth/logout');
}

function query() {
    return httpService.get('user')
}
