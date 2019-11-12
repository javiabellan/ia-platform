import React from 'react';

// Material design
import Fab           from '@material-ui/core/Fab';
import AddIcon       from '@material-ui/icons/Add';
import makeStyles    from '@material-ui/core/styles/makeStyles';

import TextField     from '@material-ui/core/TextField';
import Button        from '@material-ui/core/Button';
import Dialog        from '@material-ui/core/Dialog';
import DialogTitle   from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContentText from '@material-ui/core/DialogContentText';

import {DropzoneArea}    from 'material-ui-dropzone';


import { uploadDataset } from '../../services/api';




const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right:  theme.spacing(4)
  }
}));


const datasetReducer = (prevState, newState) => ({...prevState, ...newState});

export default function ButtonLoadCSV()
{
  const classes = useStyles();
  
  const [open,     setOpen]     = React.useState(false); // Open and close dialog
  const [disabled, setDisabled] = React.useState(true);  // Disabled UPLOAD bttn
  const [dataset,  setDataset]  = React.useReducer(datasetReducer, {files: [], name: "", desc: ""});

  const handleClose     = () => {setOpen(false);    setDisabled(true);};
  const handleSaveClick = () => {uploadDataset(dataset); setOpen(false)};

  return (
    <div>

      {/**************** BUTTON ****************
      <Button color="primary" onClick={() => setOpen(true)}>
        SUBIR CSV
      </Button>*/}
      <Fab color="primary" onClick={() => setOpen(true)} className={classes.fab}>
        <AddIcon />
      </Fab>

      {/**************** DIALOG *****************/}
      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>Subir CSV</DialogTitle>

        <DialogContent>

          <DropzoneArea
            dropzoneText  = "Arrastra o haz click para subir tu fichero CSV"
            filesLimit    = {1}
            acceptedFiles = {[".csv"]}
            onChange      = { (files) => { setDataset({files: files}); setDisabled(false); } }
          />

          <TextField fullWidth
            label   = "Nombre"
            margin  = "dense"
            variant = "outlined"
            value   = { dataset.name /* Lectura */}
            onChange= { (ev) => setDataset({name: ev.target.value}) /* Escritura */}
          />

          <TextField fullWidth multiline rows="3"
            label   = "Descripción (opcional)"
            margin  = "dense"
            variant = "outlined"
            value   = {dataset.desc /* Lectura */}
            onChange= {(ev) => setDataset({desc: ev.target.value}) /* Escritura */}
          />

        </DialogContent>


        {/**************** BUTTONS *****************/}
        <DialogActions>

          <Button onClick={handleClose} color="primary">
            CANCELAR
          </Button>

          <Button
            color="primary"
            disabled={disabled}
            onClick={handleSaveClick}>SUBIR
          </Button>
            
        </DialogActions>

      </Dialog>

    </div>
  );
}