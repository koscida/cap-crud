import http from "./http-common";

class ZooDataService {
	getAll() {
		return http.get(`/animals/`);
	}
	get(id) {
		return http.get(`/animals/${id}`);
	}
	create(data) {
		return http.post(`/animals/`, data);
	}
	update(id, data) {
		return http.put(`/animals/${id}`, data);
	}
	delete(id) {
		return http.delete(`/animals/${id}`);
	}
	deleteAll() {
		return http.delete(`/animals/`);
	}
	s;
}

const zooDataService = new ZooDataService();
export default zooDataService;
