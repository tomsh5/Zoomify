
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    console.log('filterBy in review:', filterBy)
    const criteria = _buildCriteria(filterBy)
    console.log('criteria  in review:', criteria)
    const collection = await dbService.getCollection('review')
    try {
        // var reviews = await collection.find(criteria).toArray();
        
        
        var reviewA = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: 'id',
                    as: 'byUser'
                }
            }, 
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'evento',
                    localField: 'aboutUserId',
                    foreignField: 'id',
                    as: 'aboutUser'
                }
            }, 
            {
                $unwind: '$aboutUser'
            }
        ]).toArray()

        console.log('reviewA before map in review service:', reviewA)
        reviewA = reviewA.map(review => {
            review.byUser = {id: review.byUser.id, username: review.byUser.username}
            review.aboutUser = {id: review.aboutUser.id, name: review.aboutUser.name}
            delete review.byUserId;
            delete review.aboutUserId;
            return review;
        })
        // console.log('reviews before agregate in review service bknd:', reviews)
        console.log('reviewA after agregate in review service bknd!:', reviewA)
        return reviewA
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

function _buildCriteria(filterBy) {
    console.log('filterBy in build criteria:', filterBy)
    var criteria = {};
    if (filterBy.id) {
        criteria.aboutUserId = ObjectId(filterBy.id)
    }
    console.log('criteria in build criteria:', criteria)
    return criteria;
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({"id":ObjectId(reviewId)})
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}


async function add(review) {
    review.byUserId = ObjectId(review.byUserId);
    review.aboutUserId = ObjectId(review.aboutUserId);

    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}



module.exports = {
    query,
    remove,
    add
}


