import h2o
import sklearn
import xgboost
import lightgbm
import catboost
import yellowbrick
import eli5
import pickle

#   __  __            _     _               _                           _             
#  |  \/  |          | |   (_)             | |                         (_)            
#  | \  / | __ _  ___| |__  _ _ __   ___   | |     ___  __ _ _ __ _ __  _ _ __   __ _ 
#  | |\/| |/ _` |/ __| '_ \| | '_ \ / _ \  | |    / _ \/ _` | '__| '_ \| | '_ \ / _` |
#  | |  | | (_| | (__| | | | | | | |  __/  | |___|  __/ (_| | |  | | | | | | | | (_| |
#  |_|  |_|\__,_|\___|_| |_|_|_| |_|\___|  |______\___|\__,_|_|  |_| |_|_|_| |_|\__, |
#                                                                                __/ |
#                                                                               |___/ 

def autoML(df, target, time):
	aml = h2o.automl(max_time_secs=time)
	aml.train(y=target, training_frame=df)

	return aml.leaderboard()