const eventoService = require('./evento.service')
const logger = require('../../services/logger.service')

async function getEvento(req, res) {
    
    const evento = await eventoService.getById(req.params._id)
    res.send(evento)
}
  
async function getEventos(req, res) {

    const eventos = await eventoService.query(req.query)
    
    logger.debug(eventos);
    res.send(eventos)
}

async function deleteEvento(req, res) {
    await eventoService.remove(req.params._id)
    res.end()
}

async function updateEvento(req, res) {
    const evento = req.body;
    await eventoService.update(evento)
    res.send(evento)
}

async function addEvento(req, res) {
    const evento = req.body;
    await eventoService.add(evento)
    res.send(evento)
}

module.exports = {
    getEvento,
    getEventos,
    deleteEvento,
    updateEvento,
    addEvento
}