import React      from 'react';

// Material design
import Container  from '@material-ui/core/Container';
import Grid       from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper      from '@material-ui/core/Paper';
import Box        from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

// Icons
import ArrowSplitHorizontal  from 'mdi-material-ui/ArrowSplitHorizontal';
import TableColumnPlusBefore from 'mdi-material-ui/TableColumnPlusBefore';

// My components
import ButtonDataSwitch from './ButtonDataSwitch.jsx';
import DataTable        from './DataTable.jsx';

// API
import { getDataset }   from '../../../services/api';



export default function ViewData({datasetID})
{
  // Get dataset data from API
  const [dataset, updateDataset] = React.useState(undefined);
  React.useEffect(() => {getDataset(datasetID, updateDataset);}, []);

	return (
	<div>
		<Container maxWidth="lg">

      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h4" gutterBottom>
            Datos
          </Typography>
        </Box>
        <Box>
          <ButtonDataSwitch/>
        </Box>
      </Box>
      
      {/*table={dataset? dataset.data : undefined}*/}
      { dataset &&
        (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <DataTable table={dataset.data}/>
              </Paper>
            </Grid>
          </Grid>
        )
      }

      <IconButton><ArrowSplitHorizontal /></IconButton>
      <IconButton><TableColumnPlusBefore /></IconButton>

    </Container>
        
  </div>
	);
}

