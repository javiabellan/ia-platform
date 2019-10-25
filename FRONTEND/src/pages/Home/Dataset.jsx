import React    from 'react';
import { Link } from "@reach/router"


// Material design
import makeStyles            from '@material-ui/core/styles/makeStyles';
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography            from '@material-ui/core/Typography';
import ExpandMoreIcon        from '@material-ui/icons/ExpandMore';
import Button                from '@material-ui/core/Button';
//import Divider             from '@material-ui/core/Divider';

// My components
import ButtonEraseDataset  from './ButtonEraseDataset.jsx';


const useStyles = makeStyles(theme => ({
  title: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(15),
    color:    theme.palette.text.secondary,
    flexBasis: '20%',
    flexShrink: 0,
  },
}));


export default function Dataset(atrs)
{
  const classes = useStyles();

  return (
    <ExpansionPanel>

      {/**************** HEADER *****************/}
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {/**{atrs.icon}**/}
        <Typography className={classes.title}>    {atrs.name} </Typography>
        <Typography className={classes.subtitle}> {atrs.size} </Typography>
        <Typography className={classes.subtitle}> {atrs.date} </Typography>
      </ExpansionPanelSummary>


      {/**************** DETAILS *****************/}
      <ExpansionPanelDetails>
        <Typography>{atrs.desc}</Typography>
      </ExpansionPanelDetails>


      {/**************** BUTTONS *****************/}
      {/*<Divider />*/}
      <ExpansionPanelActions>
        <ButtonEraseDataset id={atrs.id} />
        <Button component={ Link } to={`/dataset/${atrs.id}`}
          variant="contained" size="small" color="primary"> ANALIZAR </Button>
        

      </ExpansionPanelActions>

    </ExpansionPanel>
  );
}