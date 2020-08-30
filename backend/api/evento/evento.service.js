
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const sortBy = _buildSortBy(filterBy)
    const criteria = _buildCriteria(filterBy)

    const collection = await dbService.getCollection('evento')
    try {

        const eventos = await collection.find(criteria).sort(sortBy).toArray();


        return eventos
    } catch (err) {
        console.log('ERROR: cannot find eventos')
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.title = {$regex:new RegExp(filterBy.txt,'i')}
    }
 
    if (filterBy.tags_like) {
        criteria.tags = filterBy.tags_like
    }
    if (filterBy.minBalance) {
        criteria.balance = {$gte : +filterBy.minBalance}
    }
    
    return criteria;
}
function _buildSortBy(filterBy) {
    const sortBy = {};
    if (filterBy._order&& filterBy._sort) {
        filterBy._order = filterBy._order === 'asc' ? 1 : -1
        sortBy[filterBy._sort] = filterBy._order
    }

    return sortBy;
}

async function getById(eventoId) {
    
    const collection = await dbService.getCollection('evento')

    try {
        
        const evento = await collection.findOne({"_id":ObjectId(eventoId)})
        return evento
    } catch (err) {
        console.log(`ERROR: while finding evento ${eventoId}`)
        throw err;
    }
}

async function remove(eventoId) {
    const collection = await dbService.getCollection('evento')
    try {
        await collection.deleteOne({"_id":ObjectId(eventoId)})
    } catch (err) {
        console.log(`ERROR: cannot remove evento ${eventoId}`)
        throw err;
    }
}

async function update(evento) {
    const collection = await dbService.getCollection('evento')
    evento._id = ObjectId(evento._id);

    try {
        await collection.replaceOne({"_id":evento._id}, {$set : evento})
        return evento
    } catch (err) {
        console.log(`ERROR: cannot update evento ${evento._id}`)
        throw err;
    }
}

async function add(evento) {
    const collection = await dbService.getCollection('evento')
    try {
        await collection.insertOne(evento);
        return evento;
    } catch (err) {
        console.log(`ERROR: cannot insert evento`)
        throw err;
    }
}




