

const URL  = "http://localhost:5000/";  // IP MIA
// const URL = "http://192.168.1.121:5000/"; // IP JOSE
//const URL  = "http://10.7.14.30:5000/"; // IP SERVER

const API_DATASET = URL + "dataset/";
const API_VISUAL  = URL + "visual/";

//////////////////////////////////////////////////////////// API_DATASET

export const getDatasets = async (updater) => {
	const response = await fetch(API_DATASET + "all");
	const result   = await response.json();
	updater(result);
};

export const uploadDataset = async (dataset/*, updater*/) => {
	var formData = new FormData();
	formData.append('file', dataset.files[0]);
	formData.append('name', dataset.name);
	formData.append('desc', dataset.desc);

	await fetch(API_DATASET + "new", {method: 'POST', body: formData});

	/*
	const response = await fetch(URL_BACKEND_DATASET,
								{method: 'POST', body: formData});
	const result   = await response.json();
	updater(result);*/
};

export const getDataset = async (datasetId, updater) => {
	const response = await fetch(API_DATASET + datasetId);
	const result   = await response.json();
	updater(result);
};

export const deleteDataset = (datasetId) => {
	fetch(API_DATASET + datasetId, {method: 'DELETE'});
};


//////////////////////////////////////////////////////////// API_VISUAL


export const getCharts = async (updater) => {
	const response = await fetch(API_VISUAL + "vega");
	const result   = await response.json();
	updater(result);
};
