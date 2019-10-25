import React      from 'react';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton      from '@material-ui/lab/ToggleButton';
import Tooltip           from '@material-ui/core/Tooltip';
import TableLarge        from 'mdi-material-ui/TableLarge'          // Data icon
import Poll              from 'mdi-material-ui/Poll'                // Stats icon

export default function AddButton(props)
{
  const [view, setView] = React.useState('table');
  function updateView(event, newView) {setView(newView);}

  return (
  	<div>

    <ToggleButtonGroup size="small" exclusive value={view} onChange={updateView}>
      	
      	<ToggleButton value="table">
      		<Tooltip title="Vista de tabla" enterDelay={250} disableTouchListener>
				<TableLarge />
			</Tooltip>
		</ToggleButton>
		
		<ToggleButton value="stats">
			<Tooltip title="Vista estadística" enterDelay={250} disableTouchListener>
				<Poll />
			</Tooltip>
		</ToggleButton>

	</ToggleButtonGroup>
	</div>
  );
}


