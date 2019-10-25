import React      from 'react';

// Material design
import Container  from '@material-ui/core/Container';
import Grid       from '@material-ui/core/Grid';

// My components
import Chart     from './Chart.jsx';


export default function ViewCharts()
{

	return (
		<Container maxWidth="lg">
      <Grid container spacing={3}>
        <Chart/>
        <Chart/>
        <Chart/>
        <Chart/>
        <Chart/>
      </Grid>

    </Container>
	);
}

