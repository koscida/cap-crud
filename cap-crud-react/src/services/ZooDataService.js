import http from "./http-common";

class ZooDataService {
	getAll() {
		return http.get(`/zoos/`);
	}
	get(zooId) {
		return http.get(`/zoos/${zooId}`);
	}
	create(data) {
		return http.post(`/zoos/`, data);
	}
	update(zooId, data) {
		return http.put(`/zoos/${zooId}`, data);
	}
	delete(zooId) {
		return http.delete(`/zoos/${zooId}`);
	}
	deleteAll() {
		return http.delete(`/zoos/`);
	}
	s;
}

const zooDataService = new ZooDataService();
export default zooDataService;
