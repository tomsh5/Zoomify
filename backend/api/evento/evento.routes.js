const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getEvento, getEventos, deleteEvento, updateEvento,addEvento} = require('./evento.controller')
const router = express.Router()


router.get('/', getEventos)
router.get('/:_id', getEvento)
router.post('/', addEvento)
router.put('/:_id',updateEvento)
router.delete('/:_id',requireAdmin, deleteEvento)

module.exports = router