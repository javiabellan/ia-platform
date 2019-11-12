// React
import React          from 'react';
import { Link }       from "@reach/router"
import SwipeableViews from 'react-swipeable-views';

// Material design
import useTheme   from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import AppBar     from '@material-ui/core/AppBar';
import Toolbar    from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tabs       from '@material-ui/core/Tabs';
import Tab        from '@material-ui/core/Tab';
import Grid       from '@material-ui/core/Grid';
import Box        from '@material-ui/core/Box';

// Icons
import ChevronLeft            from 'mdi-material-ui/ChevronLeft';
import TableLarge             from 'mdi-material-ui/TableLarge'
import ChartAreasplineVariant from 'mdi-material-ui/ChartAreasplineVariant'
import FlaskEmpty             from 'mdi-material-ui/FlaskEmpty'
import AddIcon                from '@material-ui/icons/Add';
import EditIcon               from '@material-ui/icons/Edit';

// My components
import ZoomFabDialog   from './ZoomFabDialog.jsx';
import ViewData        from './1-Data/ViewData.jsx';
import ViewCharts      from './2-Charts/ViewCharts.jsx';
import ViewModels      from './3-Models/ViewModels.jsx';
import NewChart        from './2-Charts/NewChart.jsx';
import NewModel        from './3-Models/NewModel.jsx';


// API
import { getDataset } from '../../services/api';



function TabPanel(props)
{
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}



export default function MainPage(props)
{ 
  const theme     = useTheme();

  // Get dataset data & metadata from API
  const datasetID = props.myDataset
  const [dataset, updateDataset] = React.useState(undefined);
  React.useEffect(() => {getDataset(datasetID, updateDataset);}, []);

  const [value, setValue] = React.useState(0);

  function changeTab(event, newValue) {setValue(newValue);}
  function changeIndex(index) {setValue(index);}


  return (
    <div>
      {/********************** NAVBAR **********************/}
      <AppBar position="sticky">
        <Grid container spacing={0}>

          {/**** LEFT: Back button & title ****/}
          <Grid item xs >
            <Toolbar>
              <IconButton component={ Link } to="/"
                edge="start" color="inherit" aria-label="back">
                <ChevronLeft/>
              </IconButton>
              <Typography variant="h5">{dataset? dataset.metadata.name : ''}</Typography>
            </Toolbar>
          </Grid>

          {/**** CENTER: Navigation tabs ****/}
          <Grid item xs={6} >
            <Tabs centered value={value} onChange={changeTab}>
              <Tab label="DATOS"    icon={<TableLarge/>} />
              <Tab label="GRÁFICAS" icon={<ChartAreasplineVariant/>} />
              <Tab label="MODELOS"  icon={<FlaskEmpty/>} />
            </Tabs>
          </Grid>

          {/**** RIGHT: Empty ****/}
          <Grid item xs ></Grid>

        </Grid>
      </AppBar>


      {/********************** PAGES **********************/}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value} onChangeIndex={changeIndex}
      >
        <TabPanel value={value} index={0}> <ViewData table={dataset? dataset.data : undefined}/>   </TabPanel>
        <TabPanel value={value} index={1}> <ViewCharts datasetID={datasetID}/> </TabPanel>
        <TabPanel value={value} index={2}> <ViewModels/> </TabPanel>
      </SwipeableViews>


      {/********************** FAB BUTTONS *********************/}
      <ZoomFabDialog visible={value===0} icon=<EditIcon/> dialog={"Aquí va la edición del dataset en el futuro lejano"} />
      <ZoomFabDialog visible={value===1} icon=<AddIcon/>  dialog=<NewChart/>  />
      <ZoomFabDialog visible={value===2} icon=<AddIcon/>  dialog=<NewModel/>  /> 


    </div>
  );
}
