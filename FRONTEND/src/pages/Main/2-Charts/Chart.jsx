import React      from 'react';

// Material design
import Grid          from '@material-ui/core/Grid';
import Paper         from '@material-ui/core/Paper';
import Button        from '@material-ui/core/Button';
import Dialog        from '@material-ui/core/Dialog';
import DialogTitle   from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// Vega plot library
import { Vega }      from 'react-vega';


export default function Chart({spec, data, title})
{
  const [open, setOpen] = React.useState(false); // Open and close dialog

	return (
		<Grid item xs={12} md={4} lg={3}>
      <Paper>

        <Button color="primary" onClick={() => setOpen(true)}>{title}</Button>
        
        <Dialog maxWidth={"xl"} open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Vega spec={spec} data={data} />
          </DialogContent>
        </Dialog>

      </Paper>
    </Grid>
	);
}



