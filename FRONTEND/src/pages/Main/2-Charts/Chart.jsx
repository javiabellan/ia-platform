import React      from 'react';

// Material design
import Grid       from '@material-ui/core/Grid';
import Paper      from '@material-ui/core/Paper';

import ChartHistogram     from './ChartHistogram.jsx';


export default function Chart(props)
{
  //const theme   = useTheme();
  //const classes = useStyles();

	return (
		<Grid item xs={12} md={4} lg={3}>
	      <Paper>
	        <ChartHistogram/>
	      </Paper>
	    </Grid>
	);
}



