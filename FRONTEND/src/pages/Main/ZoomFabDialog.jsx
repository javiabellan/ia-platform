import React      from 'react';

// Material design
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme   from '@material-ui/core/styles/useTheme';
import Zoom       from '@material-ui/core/Zoom';
import Fab        from '@material-ui/core/Fab';
import Dialog     from '@material-ui/core/Dialog';



const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right:  theme.spacing(4)
  }
}));


export default function ZoomFabDialog({visible, icon, dialog})
{
  const classes   = useStyles();

  const theme     = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit:  theme.transitions.duration.leavingScreen,
  };

  const [open, setOpen] = React.useState(false); // Open and close dialog

  return (
    <div>

      {/**************** BUTTON *****************/}
      <Zoom
        in={visible}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${visible ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab color="primary" onClick={() => setOpen(true)} className={classes.fab}>
          {icon}
        </Fab>
      </Zoom>
      

      {/**************** DIALOG *****************/}
      <Dialog fullWidth={true} maxWidth={"md"}
              open={open} onClose={() => setOpen(false)}>
        {dialog}
      </Dialog>

    </div>
  );
}