import React from 'react';

// Material design
import AppBar     from '@material-ui/core/AppBar';
import Toolbar    from '@material-ui/core/Toolbar';
import Container  from '@material-ui/core/Container';
import Box        from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// My components
import Dataset       from './Dataset.jsx';
import ButtonLoadCSV from './ButtonLoadCSV.jsx';

// My API data
import { getDatasets } from '../../services/api';



export default function HomePage()
{
  const [datasets, updateDatasets] = React.useState([]);
  React.useEffect(() => {getDatasets(updateDatasets)}, []);
  return (
    <div>

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">EXPACOM</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm"> {/*'sm' 'md' 'lg */}
        
        <Typography variant="subtitle1" color="textSecondary">Hoy</Typography>
        <Box mb={2}>
          {datasets.map(ds => (
          <Dataset key={ds.id}
            id   = {ds.id}
            file = {ds.file}
            name = {ds.name}
            desc = {ds.desc}
            date = {ds.date}
            size = {ds.size}
          />))}
        </Box>
        
        <Typography variant="subtitle1" color="textSecondary">Ayer</Typography>
        <Box mb={2}>
          <Dataset />
          <Dataset />
        </Box>

        <Typography variant="subtitle1" color="textSecondary">Esta semana</Typography>
        <Box mb={2}>
          <Dataset />
          <Dataset />
          <Dataset />
        </Box>

        <ButtonLoadCSV/>
        
      </Container>
    </div>
          
  );
}

