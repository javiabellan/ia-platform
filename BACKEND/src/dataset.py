import os
import numpy as np
import pandas
#import datatable
#import h2o
#import featuretools


#                        _____        _                 _   
#                       |  __ \      | |               | |  
#                       | |  | | __ _| |_ __ _ ___  ___| |_ 
#                       | |  | |/ _` | __/ _` / __|/ _ \ __|
#                       | |__| | (_| | || (_| \__ \  __/ |_ 
#                       |_____/ \__,_|\__\__,_|___/\___|\__|

class Dataset:

	# Constructor
	def __init__(self, name, description, csv_path):
		self.name        = name
		self.description = description
		self.filePath    = csv_path    #os.path.join(FILES_DIR, csv_path)
		self.df          = self.get_df()
		self.varNames    = self.get_varNames()
		self.varTypes    = self.get_varTypes()
		self.rows        = len(self.df)


	def get_df(self):
		# return h2o.import_file(self.filePath) # h2o
		# return datatable.fread(self.filePath) # datatable
		return pandas.read_csv(self.filePath)   # pandas


	################################################## Information about variables
	def get_varNames(self):
		return self.df.columns.values.tolist()

	def get_varTypes(self):
		types = [dtype.name for dtype in self.df.dtypes.values.tolist()]
		types = [t.replace('object',         'cat')  for t in types]
		types = [t.replace('category',       'cat')  for t in types]
		types = [t.replace('bool',           'cat')  for t in types]
		types = [t.replace('int64',          'num')  for t in types]
		types = [t.replace('float64',        'num')  for t in types]
		types = [t.replace('datetime64[ns]', 'date') for t in types]
		types = [t.replace('timedelta[ns]',  'date') for t in types]
		return types

	def varMissings(self):
		total = df.isnull().sum().sort_values(ascending=False)
		percent = (df.isnull().sum()/df.isnull().count()*100).sort_values(ascending=False)
		return pd.concat([total, percent], axis=1, keys=['Total', 'Percent missing'])


	def df_size(self):
		size_in_bytes = self.df.memory_usage().sum()
		return prettySize(size_in_bytes)

	def file_size(self):
		size_in_bytes = os.path.getsize(self.filePath)
		return prettySize(size_in_bytes)

	def file_modifDate(self):
		return os.path.getmtime(self.filePath)


	def sample_top(self, rows=10):
		return self.df.head(rows).to_dict()


	def sample_bottom(self, rows=10):
		return self.df.tail(rows)


	def sample_random(self, rows=10):
		return self.df.sample(rows)

	def describe(self):
		return self.df.describe()


	def to_dict


	def reduce_mem_usage(self, verbose=True):
		start_mem = self.df.memory_usage().sum()
		numerics = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']

		for col in self.df.columns:
			col_type = self.df[col].dtypes
			if col_type in numerics:
				c_min = self.df[col].min()
				c_max = self.df[col].max()
				if str(col_type)[:3] == 'int':
					if      np.iinfo(np.int8).min<c_min and c_max<np.iinfo(np.int8).max:    self.df[col] = self.df[col].astype(np.int8)
					elif   np.iinfo(np.int16).min<c_min and c_max<np.iinfo(np.int16).max:   self.df[col] = self.df[col].astype(np.int16)
					elif   np.iinfo(np.int32).min<c_min and c_max<np.iinfo(np.int32).max:   self.df[col] = self.df[col].astype(np.int32)
					elif   np.iinfo(np.int64).min<c_min and c_max<np.iinfo(np.int64).max:   self.df[col] = self.df[col].astype(np.int64)  
				else:
					if   np.finfo(np.float16).min<c_min and c_max<np.finfo(np.float16).max: self.df[col] = self.df[col].astype(np.float16)
					elif np.finfo(np.float32).min<c_min and c_max<np.finfo(np.float32).max: self.df[col] = self.df[col].astype(np.float32)
					elif np.finfo(np.float64).min<c_min and c_max<np.finfo(np.float64).max: self.df[col] = self.df[col].astype(np.float64)

		end_mem    = self.df.memory_usage().sum()
		percentage = str(round(100*(start_mem-end_mem)/start_mem, 2))
		if verbose: print("Mem. usage decreased to "+prettySize(end_mem)+" ("+percentage+"% reduction)")

	# 	################ Transform dataset
	# if   args.data=="all":       DF = DATAFRAME
	# if   args.data=="top":       DF = DATAFRAME.head(args.rows)
	# elif args.data=="bottom":    DF = DATAFRAME.tail(args.rows)
	# elif args.data=="subsample": DF = DATAFRAME.sample(args.rows)
	# elif args.data=="describe":  DF = DATAFRAME.describe()

	# return DF.round(args.decimals).to_dict(orient=args.jsonFormat)



def prettySize(size):
	KB = 1024
	MB = KB * 1024
	GB = MB * 1024

	if   size<KB: return str(size)              + " Bytes"
	elif size<MB: return str(round(size/KB, 2)) + " KB"
	elif size<GB: return str(round(size/MB, 2)) + " MB"
	else:         return str(round(size/GB, 2)) + " GB"