import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { createTheme,ThemeProvider } from '@mui/material/styles';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


const theme = createTheme({
  direction: 'rtl',
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </CacheProvider >
    </BrowserRouter>
  </React.StrictMode>
);


