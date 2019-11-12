# TODO
# - Microservicios: https://medium.com/@sonusharma.mnnit/building-a-microservice-in-python-ff009da83dac


# General imports
import os
import json
import datetime

# Web Server imports
from flask            import Flask, request, send_from_directory
from flask_restplus   import Api, Resource, reqparse
from werkzeug         import secure_filename
from flask_cors       import CORS
from flask_sqlalchemy import SQLAlchemy

# Data Science imports
import pandas      # Data manipulation
import altair      # Data visualization
import pickle      # Model storage
# import h2o       # Auto ML
# import datatable # Data manipulation


################################################################ CONSTANTS

FILES_DIR = "files"
DB_NAME   = "database.db"
DATAFRAME = None


################################################################ START

app = Flask(__name__)                          # Flask
api = Api(app, version='0.3', title='BACKEND', # Flask Restplus
  description = "Backend of EXPACOM in Python with Flask.") 
CORS(app)                                      # Flask CORS

# Database
app.config['SQLALCHEMY_DATABASE_URI']        = "sqlite:///" + DB_NAME
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# h2o.init()           # Start H2O

# Create FILES_DIR if not exists
if not os.path.exists(FILES_DIR):
	os.makedirs(FILES_DIR)



#              ______      _       ______                
#              |  _  \    | |      | ___ \               
#              | | | |__ _| |_ __ _| |_/ / __ _ ___  ___ 
#              | | | / _` | __/ _` | ___ \/ _` / __|/ _ \
#              | |/ / (_| | || (_| | |_/ / (_| \__ \  __/
#              |___/ \__,_|\__\__,_\____/ \__,_|___/\___|


################################################################ CREATE DB

class DatasetTable(db.Model):
	id   = db.Column(db.Integer,     primary_key=True)
	file = db.Column(db.String(100), unique=True, nullable=False)
	name = db.Column(db.String(50),  unique=True, nullable=False)
	desc = db.Column(db.String(250))
	date = db.Column(db.Date)
	size = db.Column(db.Integer) 

	def to_dict(self):
		return {
			"id":   self.id,
			"file": self.file,
			"name": self.name,
			"desc": self.desc,
			"date": str(self.date),
			"size": prettySize(self.size)
		}

db.drop_all()
db.create_all()

################################################################ FILL DB

iris_ds = DatasetTable(
		id   = 1,
		file = "iris.csv",
		name = "Iris dataset",
		desc = "This is the iris dataset. Is about flowers",
		date = datetime.date(2019, 4, 13),
		size = 666)

db.session.add(iris_ds)
db.session.commit()




#              _____          _             _       _       
#             |  ___|        | |           (_)     | |      
#             | |__ _ __   __| |_ __   ___  _ _ __ | |_ ___ 
#             |  __| '_ \ / _` | '_ \ / _ \| | '_ \| __/ __|
#             | |__| | | | (_| | |_) | (_) | | | | | |_\__ \
#             \____/_| |_|\__,_| .__/ \___/|_|_| |_|\__|___/
#                              | |                          
#                              |_|                    

apiDataset = api.namespace('dataset', description='Operations related to dataset')
apiVisual  = api.namespace('visual',  description='Operations related to visualization')
apiML      = api.namespace('ml',      description='Operations related to machine learning')


@apiDataset.route("/all")
class DatasetList(Resource):
	
	def get(self): ################################ GET ALL DATASETS (METADATA)
		"""
		Get all datasets (Metadata).
		"""
		datasets_db   = DatasetTable.query.all()
		datasets_dict = [dataset.to_dict() for dataset in datasets_db]
		return datasets_dict, 200
	

@apiDataset.route("/new")
class DatasetList(Resource):
	def post(self): ################################ CREATE NEW DATASET
		"""
		Create new dataset (CSV file, name & description)
		"""
		if 'file' not in request.files: return "Not file found", 300

		# Get the POST data (FLask) (Content-Type: multipart/form-data)
		file = request.files['file']
		name = request.form['name']
		desc = request.form['desc']

		# TODO: Chech that dataset don't exists

		# Save file in FILES_DIR
		fileName = secure_filename(file.filename)
		filePath = os.path.join(FILES_DIR, fileName) # String
		file.save(filePath)

		# Save into DB
		newDataset = DatasetTable( 
			file = fileName,
			name = name,
			desc = desc,
			date = datetime.date.today(),
			size = os.path.getsize(filePath) # Size in bytes
		)
		db.session.add(newDataset)
		db.session.commit()

		return newDataset.to_dict(), 201



args_dataset = reqparse.RequestParser()
args_dataset.add_argument("data",       type=str, default="top",  choices=("all", "top", "bottom", "subsample", "describe"))
args_dataset.add_argument("rows",       type=int, default=10)
args_dataset.add_argument("decimals",   type=int, default=2)
args_dataset.add_argument("jsonFormat", type=str, default="split", choices=("split", "records"))

@apiDataset.route("/<string:id>")
class Dataset(Resource):

	@apiDataset.expect(args_dataset)
	def get(self, id): ################################ GET DATASET (DATA & METADATA)
		"""
		Get 1 dataset by Id (Data & metadata)
		"""
		args = args_dataset.parse_args(request)  #args = request.args

		################ Get dataset (from quering database)
		global DATAFRAME
		if DATAFRAME is None:
			dataset_metadata = DatasetTable.query.get(id).to_dict()
			filePath         = os.path.join(FILES_DIR, dataset_metadata["file"])
			DATAFRAME        = pandas.read_csv(filePath)

		################ Transform dataset
		if   args.data=="all":       DF = DATAFRAME
		if   args.data=="top":       DF = DATAFRAME.head(args.rows)
		elif args.data=="bottom":    DF = DATAFRAME.tail(args.rows)
		elif args.data=="subsample": DF = DATAFRAME.sample(args.rows)
		elif args.data=="describe":  DF = DATAFRAME.describe()

		return DF.round(args.decimals).to_dict(orient=args.jsonFormat)


	def delete(self, id): ################################ DELETE DATASET (DATA & METADATA)
		"""
		Delete dataset (CSV file & Database)
		"""

		dataset2delete  = DatasetTable.query.get(id)
		#dataset2delete = DatasetTable.query.filter_by(id=id)

		# Remove file
		filePath = os.path.join(FILES_DIR, dataset2delete.to_dict()["file"])
		os.remove(filePath)

		db.session.delete(dataset2delete)
		db.session.commit()

		return dataset2delete.to_dict()



################################################################ DOWNLOAD FILE
# @app.route("/download/<file>")
# def download_file(file):
# 	return send_from_directory(FILES_DIR, file, as_attachment=True)


################################################################ LIST FILES (from dir)
# @api.route("/data")
# def list_files():
#     files = []
#     for filename in os.listdir(FILES_DIR):
#         path = os.path.join(FILES_DIR, filename)
#         if os.path.isfile(path):
#             files.append(filename)
#     return jsonify(files)



################################################################
################################################################  ENDPOINTS
################################################################  VISUALIZATION
################################################################


################################### AUXILIAR PANDAS FUNCS
def get_varNames(df):
	return df.columns.values.tolist()

def get_varTypes(df):
	types = [dtype.name for dtype in df.dtypes.values.tolist()]
	types = [t.replace('object',         'cat')  for t in types]
	types = [t.replace('category',       'cat')  for t in types]
	types = [t.replace('bool',           'cat')  for t in types]
	types = [t.replace('int64',          'num')  for t in types]
	types = [t.replace('float64',        'num')  for t in types]
	types = [t.replace('datetime64[ns]', 'date') for t in types]
	types = [t.replace('timedelta[ns]',  'date') for t in types]
	return types






################################################################ AUXILIAR

# format size in bytes
# TODO: 1024 or 1000?
def prettySize(size):
	KB = 1024
	MB = KB * 1024
	GB = MB * 1024

	if   size<KB: return str(size)              + " Bytes"
	elif size<MB: return str(round(size/KB, 2)) + " KB"
	elif size<GB: return str(round(size/MB, 2)) + " MB"
	else:         return str(round(size/GB, 2)) + " GB"


################################################################ DEPLOYMENT
if __name__ == "__main__":
	# Run in production with:
	# gunicorn -w 4 -b 0.0.0.0:5000 backend:app
	# or
	# uwsgi --http :9090 --wsgi-file backend.py --master --processes 4 --threads 2
	app.run(debug=True, port=5000, host='0.0.0.0')







#  ___  ___           _     _               _                           _             
#  |  \/  |          | |   (_)             | |                         (_)            
#  | .  . | __ _  ___| |__  _ _ __   ___   | |     ___  __ _ _ __ _ __  _ _ __   __ _ 
#  | |\/| |/ _` |/ __| '_ \| | '_ \ / _ \  | |    / _ \/ _` | '__| '_ \| | '_ \ / _` |
#  | |  | | (_| | (__| | | | | | | |  __/  | |___|  __/ (_| | |  | | | | | | | | (_| |
#  \_|  |_/\__,_|\___|_| |_|_|_| |_|\___|  \_____/\___|\__,_|_|  |_| |_|_|_| |_|\__, |
#                                                                               __/ |
#                                                                              |___/ 



