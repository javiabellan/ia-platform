# General imports
import os
import json
import datetime

# Web Server imports
from flask            import Flask, request, send_from_directory
from flask_restplus   import Api, Resource
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
DATAFRAME = -1


################################################################ START

app = Flask(__name__)                          # Flask
api = Api(app, version='0.2', title='BACKEND', # Flask Restplus
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

################################################################ HOME
#
# @api.route('/')
# class Home(Resource):
# 	def get(self):
# 		return {
# 			#"flask":             flask.__version__,
# 			#"flask_sqlalchemy":  flask_sqlalchemy.__version__,
# 			#"h2o":               h2o.__version__
# 		}


apiDataset = api.namespace('dataset', description='Operations related to dataset')
apiVisual  = api.namespace('visual',  description='Operations related to visualization')

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

		# TO-DO: Chech that dataset don't exists

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



#@api.param('id', 'Dataset file name')
@apiDataset.route('/<string:id>')
class Dataset(Resource):

	def get(self, id): ################################ GET DATASET (DATA & METADATA)
		"""
		Get 1 dataset by Id (Data & metadata)
		"""

		# Get dataset metadata (From quering database)
		dataset_metadata = DatasetTable.query.get(id).to_dict()

		# Get dataset data (From reading CSV)
		global DATAFRAME
		filePath     = os.path.join(FILES_DIR, dataset_metadata["file"])
		DATAFRAME    = pandas.read_csv(filePath)
		dataset_head = DATAFRAME.head(15).to_dict(orient='split')

		return {
			"metadata": dataset_metadata,
			"data":     dataset_head
		}


	def delete(self, id): ################################ DELETE DATASET (DATA & METADATA)
		"""
		Delete dataset (CSV_file & Database)
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

@apiVisual.route('/vega')
class ChartHello(Resource):

	def get(self): ################################ GET CHART

		global DATAFRAME
		print(type(DATAFRAME))
		chart = altair.Chart(DATAFRAME).mark_point().encode(
			x='SepalLength',
			y='SepalWidth',
			color='Species'
		)#.interactive()

		return chart.to_dict()






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
	app.run(debug=True, port=5000, host='0.0.0.0')







#  ___  ___           _     _               _                           _             
#  |  \/  |          | |   (_)             | |                         (_)            
#  | .  . | __ _  ___| |__  _ _ __   ___   | |     ___  __ _ _ __ _ __  _ _ __   __ _ 
#  | |\/| |/ _` |/ __| '_ \| | '_ \ / _ \  | |    / _ \/ _` | '__| '_ \| | '_ \ / _` |
#  | |  | | (_| | (__| | | | | | | |  __/  | |___|  __/ (_| | |  | | | | | | | | (_| |
#  \_|  |_/\__,_|\___|_| |_|_|_| |_|\___|  \_____/\___|\__,_|_|  |_| |_|_|_| |_|\__, |
#                                                                               __/ |
#                                                                              |___/ 

# def df_read(filePath):
# 	# CHOOSE ONE:
# 	# dataFrame = h2o.import_file(filePath)  # h2o
# 	# dataFrame = datatable.fread(filePath)  # datatable
# 	# dataframe = pandas.read_csv(filePath)  # pandas

# 	return pandas.read_csv(filePath)


# def df_head(dataFrame):
# 	return dataFrame.head(10).to_json(orient='split')


# def autoML(df, target, time):
# 	aml = h2o.automl(max_time_secs=time)
# 	aml.train(y=target, training_frame=df)

# 	return aml.leaderboard()

