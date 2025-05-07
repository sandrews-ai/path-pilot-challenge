import { ThemeProvider } from '@mui/material';
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import appTheme from './theme/AppTheme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const phOptions = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

root.render(
  <React.StrictMode>
    <Theme>
      <Provider store={store} >
        <ThemeProvider theme={appTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Theme>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
