import React    from 'react';
import { Link } from "@reach/router"


// Material design
import makeStyles            from '@material-ui/core/styles/makeStyles';
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography            from '@material-ui/core/Typography';
import Button                from '@material-ui/core/Button';
//import Divider             from '@material-ui/core/Divider';

import ExpandMoreIcon        from '@material-ui/icons/ExpandMore';


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


export default function Dataset(dsMetadata)
{
  const classes = useStyles();

  return (
    <ExpansionPanel>

      {/**************** HEADER *****************/}
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {/**{dsMetadata.icon}**/}
        <Typography className={classes.title}>    {dsMetadata.name} </Typography>
        <Typography className={classes.subtitle}> {dsMetadata.size} </Typography>
        <Typography className={classes.subtitle}> {dsMetadata.date} </Typography>
      </ExpansionPanelSummary>


      {/**************** DETAILS *****************/}
      <ExpansionPanelDetails>
        <Typography>{dsMetadata.desc}</Typography>
      </ExpansionPanelDetails>


      {/**************** BUTTONS *****************/}
      {/*<Divider />*/}
      <ExpansionPanelActions>
        <ButtonEraseDataset id={dsMetadata.id} />
        <Button component={ Link } to={`/workspace`} state={dsMetadata}
          variant="contained" size="small" color="primary"> ANALIZAR </Button>
        

      </ExpansionPanelActions>

    </ExpansionPanel>
  );
}