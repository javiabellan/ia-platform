import requests

URL_BACKEND = "http://0.0.0.0:5000/";

# Colors
GREEN    = '\033[92m'
YELLOW   = '\033[93m'
RED      = '\033[91m'
ENDCOLOR = '\033[0m'

def check(condition):
	if condition: print(GREEN, "OK", ENDCOLOR)
	else:         print(RED, "ERROR", ENDCOLOR)






######################################################### TEST /dataset/ endpoints

API_DATASET = URL_BACKEND + "dataset/"

def test_initial_datasets():
	url      = API_DATASET + "all"
	response = requests.get(url).json()
	
	check(response == [{"id": 1, "file": "iris.csv", "name": "Iris dataset", "desc": "This is the iris dataset. Is about flowers", "date": "2019-04-13", "size": "666 Bytes"}])


def test_upload_dataset(filename):
	url      = API_DATASET + "new"
	files    = {'file': open(filename, 'rb')}
	values   = {'name': 'Test', 'desc': 'Esto es un fichero de test'}
	response = requests.post(url, files=files, data=values).json()
	check( response["size"] == "4.82 KB" )


def test_get_dataset(id):
	url      = API_DATASET + str(id)
	response = requests.get(url).json()
	check( response["metadata"]["size"] == "4.82 KB")


def test_delet_dataset(id):
	url      = API_DATASET + str(id)
	response = requests.delete(url).json()

	check( response["size"] == "4.82 KB" )


print("Initial datasets: ", end=""); test_initial_datasets();
print("Upload dataset:   ", end=""); test_upload_dataset("file1.csv");
print("Get dataset:      ", end=""); test_get_dataset(2);
print("Delete dataset:   ", end=""); test_delet_dataset(2);
print("Initial datasets: ", end=""); test_initial_datasets();
