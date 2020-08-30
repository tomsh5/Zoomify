
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        // users.forEach(user => delete user.password);

        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({"id":ObjectId(userId)})
        delete user.password

        user.givenReviews = await reviewService.query({byUserId: ObjectId(user.id) })
        user.givenReviews = user.givenReviews.map(review => {
            delete review.byUser
            return review
        })


        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    console.log('getByEmail:', email);
    const collection = await dbService.getCollection('user')
    console.log('collection', collection);
    try {
        const user = await collection.findOne({email})
        console.log('got it! user:', user);
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({"id":ObjectId(userId)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user.id = ObjectId(user.id);

    try {
        await collection.replaceOne({"id":user.id}, {$set : user})
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user.id}`)
        throw err;
    }
}

async function add(user) {
    user.imgUrl = '';
    user.createdEventos = [];
    user.signedEventos = [];
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.fullName = {'$regex':`.*${filterBy.txt}.*\i`}
    }
    if (filterBy.minBalance) {
        criteria.balance = {$gte : +filterBy.minBalance}
    }
    return criteria;
}


