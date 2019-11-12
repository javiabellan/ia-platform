import React      from 'react';

// Material design
import Container  from '@material-ui/core/Container';
import Grid       from '@material-ui/core/Grid';

// My components
import Chart     from './Chart.jsx';

// API
import { getVegaDataset } from '../../../services/api';
import { getUnivariate }  from '../../../services/api';

export default function ViewCharts({datasetID})
{
  const [dataset, updateDataset] = React.useState(undefined);
  React.useEffect(() => {getVegaDataset(datasetID, updateDataset);}, {});

  const [univariate, updateUnivariate] = React.useState(undefined);
  React.useEffect(() => {getUnivariate(datasetID, updateUnivariate);}, {});

	return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Chart spec={univariate} data={dataset} title={"Histogramas"} img={"yellow-histogram"}/>
        <Chart title={"Densidades"}            img={"yellow-density"}/>
        <Chart title={"Diagramas de caja"}     img={"yellow-box"}/>
        <Chart title={"Puntos"}                img={"grey-scatter"}/>
        <Chart title={"Burbujas"}              img={"grey-bubble"}/>
        <Chart title={"Densidades 2D"}         img={"grey-hex"}/>
        <Chart title={"Coordenadas paralelas"} img={"green-parallel"}/>
        <Chart title={"Gráfico radial"}        img={"green-radar"}/>
        <Chart title={"Gráfico tarta"}         img={"red-pie"}/>
        <Chart title={"Gráfico donut"}         img={"red-donut"}/>
        <Chart title={"Línea"}                 img={"blue-line"}/>
        <Chart title={"Área"}                  img={"blue-area"}/>
        <Chart title={"Componentes princip."}  img={"blue-pca"}/>
      </Grid>
    </Container>
	);
}
