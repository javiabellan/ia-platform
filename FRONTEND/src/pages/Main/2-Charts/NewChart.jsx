import React      from 'react';

// Material design
import DialogTitle   from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Typography    from '@material-ui/core/Typography';
import Stepper       from '@material-ui/core/Stepper';
import Step          from '@material-ui/core/Step';
import StepLabel     from '@material-ui/core/StepLabel';
import Grid          from '@material-ui/core/Grid';

const steps = ['Elegir gráfica', 'Elegir variables'];

const univariateCharts = [
  "yellow-histogram",
  "yellow-density",
  "yellow-box",
  "yellow-violin",
  "yellow-joy"
]

const bivariateCharts = [
  "grey-scatter",
  "grey-scatterColor",
  "grey-scatterBubble",
  "grey-hex",
  "grey-heatmap"
]

const temporalCharts = [
  "blue-line",
  "blue-area",
  "blue-areaStacked",
  "blue-stream",
  "blue-confidence"
]

const mapCharts = [
  "purple-map",
  "purple-mapChoropleth",
  "purple-mapBubble",
  "purple-mapGraph",
  "purple-mapHex"
]

const flowCharts = [
  "pink-graph",
  "pink-arc",
  "pink-bundle",
  "pink-chord",
  "pink-sankey"
]

const multidimCharts = [
  "blue-pca",
  "grey-correlogram",
  "green-parallel",
  "green-radar",
  "green-hive"
]








// "green-bar",
// "green-barGrouped",
// "green-lollipop"

// "red-barGrouped"
// "red-barStacked"

export default function NewChart()
{
	const [activeStep, setActiveStep] = React.useState(0);

  return (
    <>
      {/**************** Dialog Title ****************/}
      <DialogTitle>
        <Typography component="h1" variant="h4" align="center">
          Nueva Gráfica
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      {/**************** Dialog Content ****************/}
      <DialogContent>
        <Typography variant="h6" gutterBottom>Distribución de 1 variable</Typography>
        <Grid container spacing={2}>
          {univariateCharts.map(chartName => (
            <Grid item key={chartName}><img src={require("./img150x150/"+chartName+".png")} alt="Chart icon"/></Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom>Graficos temporales</Typography>
        <Grid container spacing={2}>
          {temporalCharts.map(chartName => (
            <Grid item key={chartName}><img src={require("./img150x150/"+chartName+".png")} alt="Chart icon"/></Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom>Distribución de 2 variables o más</Typography>
        <Grid container spacing={2}>
          {bivariateCharts.map(chartName => (
            <Grid item key={chartName}><img src={require("./img150x150/"+chartName+".png")} alt="Chart icon"/></Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom>Conexiones</Typography>
        <Grid container spacing={2}>
          {flowCharts.map(chartName => (
            <Grid item key={chartName}><img src={require("./img150x150/"+chartName+".png")} alt="Chart icon"/></Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom>Multidimensional</Typography>
        <Grid container spacing={2}>
          {multidimCharts.map(chartName => (
            <Grid item key={chartName}><img src={require("./img150x150/"+chartName+".png")} alt="Chart icon"/></Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom>Mapas</Typography>
        <Grid container spacing={2}>
          {mapCharts.map(chartName => (
            <Grid item key={chartName}><img src={require("./img150x150/"+chartName+".png")} alt="Chart icon"/></Grid>
          ))}
        </Grid>


      </DialogContent>

      <DialogActions></DialogActions>
    </>
  );
}