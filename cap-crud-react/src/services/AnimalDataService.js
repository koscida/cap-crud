import http from "./http-common";

class AnimalDataService {
	getAll(zooId) {
		return http.get(`/zoos/${zooId}/animals/`);
	}
	get(zooId, id) {
		return http.get(`/zoos/${zooId}/animals/${id}`);
	}
	create(zooId, data) {
		return http.post(`/zoos/${zooId}/animals/`, data);
	}
	update(zooId, id, data) {
		return http.put(`/zoos/${zooId}/animals/${id}`, data);
	}
	delete(zooId, id) {
		return http.delete(`/zoos/${zooId}/animals/${id}`);
	}
	deleteAll(zooId) {
		return http.delete(`/zoos/${zooId}/animals/`);
	}
	s;
}

const animalDataService = new AnimalDataService();
export default animalDataService;
