import { createTheme, MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { AppRouter } from './router';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'teal',
});

function App() {
  return (
    <MantineProvider theme={theme}>
    <ToastContainer />
    <AppRouter />
    </MantineProvider>
  )
}

export default App
