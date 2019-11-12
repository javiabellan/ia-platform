import altair


#         __      ___                 _ _          _   _             
#         \ \    / (_)               | (_)        | | (_)            
#          \ \  / / _ ___ _   _  __ _| |_ ______ _| |_ _  ___  _ __  
#           \ \/ / | / __| | | |/ _` | | |_  / _` | __| |/ _ \| '_ \ 
#            \  /  | \__ \ |_| | (_| | | |/ / (_| | |_| | (_) | | | |
#             \/   |_|___/\__,_|\__,_|_|_/___\__,_|\__|_|\___/|_| |_|


def chart_base(varName):
	return alt.Chart().mark_bar().properties(
		width=300, height=200,
		title=varName
	)

def chart_numerical(varName):
	return chart_base(varName).encode(
		x=alt.X(varName, type='quantitative', bin=alt.Bin(maxbins=16), title=None),
		y=alt.Y('count()', axis=None)
	)

def chart_categorical(varName):
	return chart_base(varName).encode(
		x=alt.X('count()', axis=None),
		y=alt.Y(varName, type='nominal', title=None,
			sort=alt.EncodingSortField(field=varName, op="count", order="descending")),
	)



def univariate_charts(df, data_url, include_num=True, include_cat=True, include_date=False):
    allVarNames = get_varNames(df)
    allVarTypes = get_varTypes(df)
    
    varNames = []
    varTypes = []
    charts   = []
    filters  = []
    
	# 1) Generate charts and filters
	for varName, varType in zip(allVarNames, allVarTypes):
		if include_num and varType=="num":
			varNames.append(varName)
			varTypes.append(varType)
			charts.append(chart_numerical(varName))
			filters.append(alt.selection_interval(name=varName, encodings=['x']))
		elif include_cat and varType=="cat":
			varNames.append(varName)
			varTypes.append(varType)
			charts.append(chart_categorical(varName))
			filters.append(alt.selection_multi(name=varName, encodings=['y']))

	# 2) Crossfilter charts
	filteredCharts = []
	for (chart, myFilter, varName, varType) in zip(charts, filters, varNames, varTypes):
		# Colors
		if varType=="num":
			background = chart.mark_bar(color='teal', opacity=0.15)
			highlight  = chart.mark_bar(color='teal')

		if varType=="cat":
			background = chart.mark_bar(color='lightgray')
			highlight  = chart.encode(color=varName + ":N")

		# Add my filter to modify others
		background = background.add_selection(myFilter)

		# Add others filters that modify me
		for f in filters: highlight = highlight.transform_filter(f)

		filteredCharts.append(alt.layer(background, highlight))

	return alt.concat(*filteredCharts, data=data_url, columns=2).to_dict()

