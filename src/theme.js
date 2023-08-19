import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },

  colorSchemes: {
    light: {},
    dark: {}
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },

    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' }
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: { fontSize: '0.875rem' }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '0.5px' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&:Mui-focused fieldset': { borderWidth: '1px !important' }
        }
      }
    }
  }
  // ...other properties
})
export default theme
