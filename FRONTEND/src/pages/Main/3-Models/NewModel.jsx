import React      from 'react';

// Material design
import { makeStyles } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';

import DialogTitle    from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import DialogActions  from '@material-ui/core/DialogActions';

import FormLabel        from '@material-ui/core/FormLabel';
import FormGroup        from '@material-ui/core/FormGroup';
import FormControl      from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel       from '@material-ui/core/InputLabel';


import TextField      from '@material-ui/core/TextField';
import Typography     from '@material-ui/core/Typography';
import Slider         from '@material-ui/core/Slider';
import Checkbox       from '@material-ui/core/Checkbox';
import Collapse       from '@material-ui/core/Collapse';
import IconButton     from '@material-ui/core/IconButton';
import Button         from '@material-ui/core/Button';
import Select         from '@material-ui/core/Select';
import MenuItem       from '@material-ui/core/MenuItem';
import Chip           from '@material-ui/core/Chip';

// Icons
import AccessTime     from '@material-ui/icons/AccessTime';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles(theme => ({
  expandBtn: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandBtnClose: {transform: 'rotate(0deg)'   },
  expandBtnOpen:  {transform: 'rotate(180deg)' },
  btnLeft:        {marginLeft: 'auto'          }
}));


// TODO: Log scale slider:
// https://github.com/mui-org/material-ui/issues/16574
function prettifySeconds(seconds) {
  if      (seconds<60)    {return `${seconds} s`;}
  else if (seconds<60*60) {return `${seconds} m`;}
}


export default function ViewModels()
{
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [targetVar,    setTarget]   = React.useState(3);
  const [excludedVars, setExcluded] = React.useState([]);
  const [trainingTime, setTime]     = React.useState(3600);
  const handleTarget   = event => {setTarget(event.target.value);};
  const handleExcluded = event => {setExcluded(event.target.value);};

  const timeMarks = [
    {value: 15*60,   label: "Rápido (15 min)"},
    {value: 1*60*60, label: "Recomendado (1 hora)"},
    {value: 6*60*60, label: "Super preciso (6 horas)"}
  ];

	return (<>
    <DialogTitle>Crear un nuevo modelo: ¿Qué variable quieres predecir en el futuro?</DialogTitle>

    <DialogContent>{/*dividers={true}*/}

      <Grid container spacing={2}>
        
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" margin="dense" fullWidth>
            <FormLabel>Datos</FormLabel>
            <Select  value={targetVar} onChange={handleTarget}>
              <MenuItem value={1}>Variable 1</MenuItem>
              <MenuItem value={2}>Variable 2</MenuItem>
              <MenuItem value={3}>Variable 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControl variant="outlined" margin="dense" fullWidth>
            <FormLabel>Variables a excluir</FormLabel>
            <Select multiple value={excludedVars} onChange={handleExcluded}>
              <MenuItem value={1}>Variable 1</MenuItem>
              <MenuItem value={2}>Variable 2</MenuItem>
              <MenuItem value={3}>Variable 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/*<Slider
        defaultValue={40}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks={timeMarks}
        min={1}
        max={100}
      />*/}
      
      <Grid item xs={12}><FormLabel>Duración del entranamiento</FormLabel></Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item><AccessTime/></Grid>
        <Grid item xs>
          <Slider
            min={1} max={100} step={1}
            defaultValue={40}
            valueLabelDisplay="auto"
            valueLabelFormat={prettifySeconds}
            marks={[
              {value: 15, label: "Rápido (15 min)"},
              {value: 30, label: "Recomendado (1 hora)"},
              {value: 60, label: "Super preciso (6 horas)"}
            ]}
          />
        </Grid>
      </Grid>


      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <FormControl>
          <FormLabel>Modelos</FormLabel>
          <FormGroup row>
            <FormControlLabel label="Neural Network"    control={<Checkbox checked={true}/>} />
            <FormControlLabel label="Gradient Boosting" control={<Checkbox checked={true}/>} />
            <FormControlLabel label="Random Forest"     control={<Checkbox checked={true}/>} />
            <FormControlLabel label="GLM"               control={<Checkbox checked={true}/>} />
          </FormGroup>
        </FormControl>

        <ul>
          <li>Variables a excluir</li>
          <li>Seleccionar datos de validación (porcentaje, random)</li>
          <li>Forma de validar (conjunto, crossVal, Hold1Out)</li>
          <li>Modelos a usar (NN, GB, Tree, Esambles)</li>
          <li>Feature engeneering automático</li>
          <li>Feature selection automático</li>
        </ul>
      </Collapse>
    </DialogContent>

    <DialogActions>
      <IconButton size="small"
        className={[classes.expandBtn, expanded ? classes.expandBtnOpen : classes.expandBtnclose]}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      ><ExpandMoreIcon />
      </IconButton>Ajustes avanzados
      <Button className={classes.btnLeft} variant="contained" size="medium" color="primary">
        Entrenar modelo
      </Button>
    </DialogActions>
	</>);
}

