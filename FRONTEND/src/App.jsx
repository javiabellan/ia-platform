import React               from 'react';
import { Router }          from "@reach/router"

// Material design
import { createMuiTheme }  from '@material-ui/core/styles';
import { teal, pink, red } from '@material-ui/core/colors';
import { ThemeProvider }   from '@material-ui/styles';
import CssBaseline         from '@material-ui/core/CssBaseline';

// My pages
import HomePage            from './pages/Home'; 
import MainPage            from './pages/Main';
//import LoginPage         from './pages/Login';
//import RegisterPage      from './pages/Register';
//import SettingsPage      from './pages/Settings';


const Theme = createMuiTheme({
  palette: {
    primary:   teal,
    secondary: pink,
    error:     red,
    white:     pink
  }
});

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Router>
        <HomePage path="/" />
        <MainPage path="/workspace" />
        {/*<SettingsPage path="/settings" */}
        {/*<LoginPage    path="/login"    */}
        {/*<RegisterPage path="/register" */}
      </Router>
    </ThemeProvider>
  );
}
