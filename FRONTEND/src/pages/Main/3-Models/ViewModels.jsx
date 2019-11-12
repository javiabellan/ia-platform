import React      from 'react';

// Material design
import { makeStyles } from '@material-ui/core/styles';
import Container      from '@material-ui/core/Container';
import Card           from '@material-ui/core/Card';
import CardContent    from '@material-ui/core/CardContent';
import CardActions    from '@material-ui/core/CardActions';
import Collapse       from '@material-ui/core/Collapse';
import IconButton     from '@material-ui/core/IconButton';
import Button         from '@material-ui/core/Button';
import Typography     from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Select         from '@material-ui/core/Select';
import MenuItem       from '@material-ui/core/MenuItem';




const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expandBtn: {
    //marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandBtnClose: {transform: 'rotate(0deg)'   },
  expandBtnOpen:  {transform: 'rotate(180deg)' },
  btnLeft:        {marginLeft: 'auto'          }
}));

export default function ViewModels()
{
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [targetVar, setTargetVar] = React.useState(3);
  const handleTargetVar = event => {
    setTargetVar(event.target.value);
  };

	return (
		<div>
			<Container maxWidth="lg">

        <Card>

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              ¿Qué variable quieres predecir?
            </Typography>
            <Select value={targetVar} onChange={handleTargetVar}>
              <MenuItem value={1}>Variable 1</MenuItem>
              <MenuItem value={2}>Variable 2</MenuItem>
              <MenuItem value={3}>Variable 3</MenuItem>
            </Select>
          </CardContent>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Aquí se pondrán ajustes avanzados para los usuarios expertos.
              </Typography>
            </CardContent>
          </Collapse>

          <CardActions disableSpacing>
            <IconButton
              className={[classes.expandBtn, expanded ? classes.expandBtnOpen : classes.expandBtnclose]}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            ><ExpandMoreIcon />
            </IconButton>
            <Button className={classes.btnLeft} variant="contained" size="large" color="primary">Predecir</Button>
          </CardActions>

        </Card>

			</Container>
		</div>
	);
}

