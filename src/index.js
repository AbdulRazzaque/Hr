import React from 'react';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store,Persister} from './components/redux/Store'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react'
import { createRoot } from 'react-dom/client';


const theme = createTheme({
  palette: {
    primary: {
      main: "#5a1e96",
    },
    secondary: {
      main: "#fc0303",
    },
    tertiary:{
      main:"#b66dff"
    },
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
         '&:focus':{
           outline:'none'
         }
        }
      }
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
         '&:focus':{
           outline:'none'
         }
        }
      }
    },
    MuiTab:{
      styleOverrides:{
        root:{
          '&:focus':{
            outline:'none'
          }
        }
      }
    },
    MuiPagination:{
      styleOverrides:{
        root:{
          '&:focus':{
            outline:'none'
          }
        }
      }
    },
    MuiPaginationItem:{
      styleOverrides:{
        root:{
          '&:focus':{
            outline:'none'
          }
        }
      }
    }
  }
});



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={Persister}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
