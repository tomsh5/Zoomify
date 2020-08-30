const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    console.log('loogin in auth', req.body);
    try {
        const user = await authService.login(email, password)
        console.log('success login in auth!!', user);
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
console.log(req.body);
    try {
        const { email, password, fullName,isAdmin=false } = req.body
        logger.debug(email + ", " + fullName + ', ' + password + ',' + isAdmin)
        const account = await authService.signup(email, password, fullName,isAdmin)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(email, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}