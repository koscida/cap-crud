import http from "./http-common";

class AnimalDataService {
	getAll(zooId) {
		return http.get(`/zoos/${zooId}/animals/`);
	}
	get(zooId, animalId) {
		return http.get(`/zoos/${zooId}/animals/${animalId}`);
	}
	create(zooId, data) {
		return http.post(`/zoos/${zooId}/animals/`, data);
	}
	update(zooId, animalId, data) {
		return http.put(`/zoos/${zooId}/animals/${animalId}`, data);
	}
	delete(zooId, animalId) {
		return http.delete(`/zoos/${zooId}/animals/${animalId}`);
	}
	deleteAll(zooId) {
		return http.delete(`/zoos/${zooId}/animals/`);
	}
	s;
}

const animalDataService = new AnimalDataService();
export default animalDataService;
