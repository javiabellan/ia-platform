import React      from 'react';

// Material design
import Grid       from '@material-ui/core/Grid';
import Paper      from '@material-ui/core/Paper';
import Button     from '@material-ui/core/Button';
import Dialog     from '@material-ui/core/Dialog';

import { Vega }   from 'react-vega';


export default function Chart(props)
{

  // Dialog
  const [open,     setOpen]     = React.useState(false); // Open and close dialog

  const spec = {
    "config": {
      "view": {"width": 400, "height": 200},
      "mark": {"tooltip": null}
    },
    "data": {"name": "table"},
    "mark": "bar",
    "encoding": {
      "x": {"type": "nominal",      "field": "category"},
      "y": {"type": "quantitative", "field": "amount"}
    },
    "selection": {
      "selector001": {
        "type": "interval",
        "bind": "scales",
        "encodings": ["x", "y"]
      }
    },
    "$schema": "https://vega.github.io/schema/vega-lite/v3.4.0.json",
    "datasets": {
      "table": [
        {"category": "A", "amount": 28},
        {"category": "B", "amount": 55},
        {"category": "C", "amount": 43},
        {"category": "D", "amount": 91},
        {"category": "E", "amount": 81},
        {"category": "F", "amount": 53},
        {"category": "G", "amount": 19},
        {"category": "H", "amount": 87}
      ]
    }
  };

  /*const barData = {
    "table": [
      {"category": "A", "amount": 28},
      {"category": "B", "amount": 55},
      {"category": "C", "amount": 43},
      {"category": "D", "amount": 91},
      {"category": "E", "amount": 81},
      {"category": "F", "amount": 53},
      {"category": "G", "amount": 19},
      {"category": "H", "amount": 87}
    ]
  };*/

	return (
		<Grid item xs={12} md={4} lg={3}>
	      <Paper>
	        {/*<ChartHistogram/>*/}
	        
          <Vega spec={spec}/> {/*data={barData}*/}

          <Button color="primary" onClick={() => setOpen(true)}>ABRIR</Button>
          
          <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={() => setOpen(false)}>
            hola
          </Dialog>
	      </Paper>
	    </Grid>
	);
}



