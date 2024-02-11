// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify' // Cấu hình react-toastify
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm' // Cấu hình Mui Dialog

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        dialogProps: {
          maxWidth: 'xs'
        },
        confirmationButtonProps: {
          color: 'secondary',
          variant: 'outlined'
        },
        cancellationButtonProps: {
          color: 'inherit'
        },
        allowClose: false,
        buttonOrder: ['confirm', 'cancel']
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer position='bottom-left' theme='colored' />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
