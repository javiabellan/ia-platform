import React      from 'react';

// Material design
import Grid          from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import Dialog        from '@material-ui/core/Dialog';
import DialogTitle   from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


// Vega plot library
import { Vega }      from 'react-vega';


export default function Chart({spec, data, title, img})
{
  const [open, setOpen] = React.useState(false); // Open and close dialog

  return (
    <Grid item xs={6} sm={4} md={3} lg={2} style={{textAlign: "center"}}>

      <ButtonBase mx="auto" focusRipple onClick={() => setOpen(true)}>
        <img src={require("./img150x150/"+img+".png")} />
      </ButtonBase>

      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
        
      <Dialog maxWidth={"xl"} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Vega spec={spec} data={data} />
        </DialogContent>
      </Dialog>

    </Grid>
	);
}



