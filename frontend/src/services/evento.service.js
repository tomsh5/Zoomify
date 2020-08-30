const axios = require('axios');
import httpService from './http.service';
export const eventoService = {
    query,
    remove,
    save,
    getById,
    getEmptyEvento
}


function query(
	filterBy = { txt: "", order: "asc", tags: "", sort: "title" }
) {
	const query = `?txt=${filterBy.txt}&_sort=${filterBy.sort}&_order=${filterBy.order}&tags_like=${filterBy.tags}`;

	return httpService.get(`evento/${query}`);
}

function getEmptyEvento() {
    return {
        title: ''
    }
}

function getById(_id) {
    return httpService.get(`evento/${_id}`)
}

function remove(id) {
    return httpService.delete(`evento/${id}`)
}

function save(evento) {
    return (evento._id) ? _update(evento) : _add(evento)
}

function _update(evento) {
    return httpService.put(`evento/${evento._id}`, evento)
}

function _add(evento) {
    return httpService.post(('evento'), evento)
}