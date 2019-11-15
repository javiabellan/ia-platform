import React      from 'react';

// Material design
import { makeStyles } from '@material-ui/core/styles';
import Container      from '@material-ui/core/Container';
import MUIDataTable   from "mui-datatables";

//import Button         from '@material-ui/core/Button';
//import IconButton     from '@material-ui/core/IconButton';
//import Typography     from '@material-ui/core/Typography';
import Chip           from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';

// Icons
import WatchLaterIcon  from '@material-ui/icons/WatchLater';  // Clock -> yellow
import CheckCircleIcon from '@material-ui/icons/CheckCircle'; // Done  -> green
import CloudIcon       from '@material-ui/icons/Cloud';       // Cloud -> blue

// Colors
import { red, orange, yellow, green, blue } from '@material-ui/core/colors';

// TODO:
// - Dense table          in mui-datatable
// - Center align columns in mui-datatable

const useStyles = makeStyles(theme => ({
  red:    {color: red[500]},
  orange: {color: orange[500]},
  yellow: {color: yellow[500]},
  green:  {color: green[500]},
  blue:   {color: blue[500]}
}));

const options = {
  /////////////////// Top Bar options
  download:    false,
  print:       false,
  filter:      false,
  search:      false,
  viewColumns: false,

  pagination: false,      // Bottom Bar options
  selectableRows: "none", // Left Checkboxes
  elevation:  3,          // Material shadow

  /////////////////// Translation to spanish
  textLabels: {
    body: {
      noMatch: "Lo siento, no se ha encontrado ningún entrenamiento",
      toolTip: "Ordenar",
      columnHeaderTooltip: column => `Ordenar por ${column.label}`
    },
    toolbar: {
      search:      "Buscar",
      viewColumns: "Mostrar Columnas",
      filterTable: "Filtrar",
    },
    filter: {
      all: "Todos",
      title: "Filtros",
      reset: "RESTABLECER",
    },
    viewColumns: {
      title: "Columnas",
      titleAria: "Mostrar/Ocultar Columnas de la tabla",
    }
  }
};

export default function ViewModels()
{
  const classes = useStyles();

  const columns = [
    {name: "Nombre"},
    {name: "Fecha y hora"},
    {name: "Duración"},
    {name: "Modelos"},
    {name: "Puntuación"},
    {
      name: "Estado",
      options: {
        customBodyRender: (value) => {
          var statusIcon=0;
          if      (value==="Entrenando")    {statusIcon=<WatchLaterIcon  className={classes.orange}/>}
          else if (value==="Completado")    {statusIcon=<CheckCircleIcon className={classes.green}/>}
          else if (value==="En producción") {statusIcon=<CloudIcon       className={classes.blue}/>}
          return (<Chip icon={statusIcon} label={value}/>);
        }
      }
    }
  ];

  const data = [
    ["Predicción de cancer",     "1301090400", "10 min",  "5", "98% precisión", "Entrenando"],
    ["Segmentación de clientes", "1303090400", "1 min", "2",  "96% fiabilidad", "Completado"],
    ["Segmentación de clientes", "1524379940", <LinearProgress variant="determinate" value={30} />, "2", "96% fiabilidad", "En producción"]
  ];

	return (
		<div>
			<Container maxWidth="lg">

        <MUIDataTable title={false} columns={columns} data={data} options={options} />

			</Container>
		</div>
	);
}

