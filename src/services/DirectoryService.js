import $api from '../http';

export default class DirectoryService {
  	static addCategory(title) {
		return $api.post('/addcategory', { title });
	}  

	static removeCategory(id) {
		return $api.post('/removecategory', { id });
	}

	static changeCategory(id, title, position) {
		return $api.post('/changecategory', { id, title, position });
	}

	static addSubCategory(id, title) {
		return $api.post('/addsubcategory', { id, title });
	}

	static removeSubCategory(catId, subCatId) {
		return $api.post('/removesubcategory', { catId, subCatId });
	}

	static changeSubCategory(id, title, position, catId) {
		return $api.post('/changesubcategory', { id, title, position, catId });
	}

	static addPeople(idCat, idSubCat, text) {
		return $api.post('/addpeople', { idCat, idSubCat, text });
	}

	static removePeople(id, employe) {
		return $api.post('/removepeople', { id, employe });
	}

	static getInfo(id) {
		return $api.post('/getinfo', { id });
	}

	static editPeople(info) {
		return $api.post('/editpeople', { info });
	}
}