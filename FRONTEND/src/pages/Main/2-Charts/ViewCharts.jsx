import React      from 'react';

// Material design
import Container  from '@material-ui/core/Container';
import Grid       from '@material-ui/core/Grid';

// My components
import Chart     from './Chart.jsx';

// API
import { getVegaDataset } from '../../../services/api';
import { getUnivariate } from '../../../services/api';

export default function ViewCharts({datasetID})
{
  const [dataset, updateDataset] = React.useState(undefined);
  React.useEffect(() => {getVegaDataset(datasetID, updateDataset);}, {});

  const [univariate, updateUnivariate] = React.useState(undefined);
  React.useEffect(() => {getUnivariate(datasetID, updateUnivariate);}, {});

	return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Chart spec={univariate} data={dataset} title={"Análisis univariate"}/>
        <Chart title={"Empty chart"}/>
      </Grid>
    </Container>
	);
}

