import React from 'react';

// Material design
import makeStyles      from '@material-ui/core/styles/makeStyles';
import SpeedDial       from '@material-ui/lab/SpeedDial';
import SpeedDialIcon   from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

// Icons
import FileDelimited from 'mdi-material-ui/FileDelimited'; // CSV
import FileExcel     from 'mdi-material-ui/FileExcel';     // Excel
import Database      from 'mdi-material-ui/Database';      // Database
import Api           from 'mdi-material-ui/Api';           // API
import Web           from 'mdi-material-ui/Web';           // Web sraping



const useStyles = makeStyles(theme => ({
  bottomRight: {
    position: 'absolute', // 'absolute' or 'fixed' ??
    bottom: theme.spacing(4),
    right:  theme.spacing(4)
  }
}));

const DoNothing = () => {};
const LoadCSV   = () => {};

const dataIcons = [
  { icon: <FileDelimited />, name: 'CSV',           action: LoadCSV   },
  { icon: <FileExcel />,     name: 'Excel',         action: DoNothing },
  { icon: <Database />,      name: 'Base de Datos', action: DoNothing },
  { icon: <Api />,           name: 'API',           action: DoNothing },
  { icon: <Web />,           name: 'Web scraping',  action: DoNothing }
];


export default function ButtonLoad(props)
{
	// Style to bottom right
	const classes = useStyles();

	// Open and close funcionality
	const [open, setOpen] = React.useState(false);
	const handleOpen      = () => {setOpen(true);};
	const handleClose     = () => {setOpen(false);};
	//function handleOpen(event) {setOpen(true);}
	//function handleClose(event) {setOpen(false);}

	return (

		<SpeedDial
      ariaLabel = "Add"
      className = {classes.bottomRight}
      icon      = {<SpeedDialIcon />}
      onClose   = {handleClose}
      onOpen    = {handleOpen}
      open      = {open}
    >
      {dataIcons.map(dataIcon => (
        <SpeedDialAction
          buttonprops={{ color: "secondary" }}
          key={dataIcon.name}
          icon={dataIcon.icon}
          tooltipTitle={dataIcon.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
	);
}