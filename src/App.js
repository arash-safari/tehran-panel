import React, { Component } from 'react';
import logo from './logo.svg';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import store from './store'
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainSwitch from './MainSwitch';

const theme = createMuiTheme({
  /* theme for v1.x */
  palette: {
    primary: {
      light: '#afbdd4',
      main: '#6d84b4',
      dark: '#3b5998',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    },
    main:{
      white:"#fff",
      text:"#e5e5e5",
      black:"#000",
      greyBlack:"#263238"
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightRegular:300,
    fontWeightMedium:400,

  }
 });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <MainSwitch/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
