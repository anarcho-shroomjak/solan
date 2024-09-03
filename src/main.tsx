import React from 'react'
import ReactDOM from 'react-dom/client'
import OfferPage from './pages/OfferPage.tsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./store/store.ts";
import {createTheme, ThemeProvider} from "@mui/material";
import Root from "./Root.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import {History} from "@mui/icons-material";
import HistoryPage from "./pages/HistoryPage.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a6544',
      // main: '#5f7859',
    },
    secondary: {
      main: '#dca95c',
      // main: '#ffc778',
    },
    error: {
      main: '#c67d7b',
      // main: '#ff7971',
    },
    info: {
      main: '#383a37',
    },
    mode:'light',
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // loader: rootLoader,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: "offers/:id",
        element: <OfferPage />,
        // loader: eventLoader,
      },
      {
        path: 'offers',
        element: <HistoryPage />,
      },
      // {
      //   path: 'offers/create',
      //   element: <OfferPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
