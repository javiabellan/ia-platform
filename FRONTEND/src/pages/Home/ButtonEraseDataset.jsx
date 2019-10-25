import React from 'react';

// Material design
import Button            from '@material-ui/core/Button';
import Dialog            from '@material-ui/core/Dialog';
import DialogActions     from '@material-ui/core/DialogActions';
import DialogContent     from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle       from '@material-ui/core/DialogTitle';

// API
import { deleteDataset } from '../../services/api';

export default function ButtonEraseDataset({id})
{
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {setOpen(true);};
  const handleClose     = () => {setOpen(false);};

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}> BORRAR </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Borrar Dataset 1
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que quieres borrar el dataset? Esto borrará también los gráficos y los modelos que hayas hecho sobre él.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCELAR
          </Button>
          <Button onClick={() => {deleteDataset(id); setOpen(false);}} color="primary" autoFocus>
            BORRAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}