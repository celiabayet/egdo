import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5CBAE2',
      light: '#A4D3E8',
      dark: '#295263',
    },
    secondary: {
      main: '#FEE271',
      dark: '#756612',
      light: '#FAF5E2'
    },
    infos: {
      main: '#80CCEA'
    }
  },
  typography: {
    fontFamily: 'IBM Plex Sans'
  }
});

theme.props = {
  MuiButton: {
    //disableElevation: true,
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiInput: {
    disableUnderline: true,
  },
  MuiTooltip: {
    arrow: true,
  },
};

theme.components = {
  //Typography
  MuiTypography: {
    styleOverrides: {
      h2: {
        color: '#003D55',
        fontWeight: 700,
        textAlign: 'center'
      },
      h3: {
        color: '#003D55',
        fontWeight: 600,
        textAlign: 'center'
      },
      h4: {
        color: theme.palette.primary.main,
        textAlign: 'center',
        // fontSize: 'large'
      },
      h5: {
        color: theme.palette.primary.dark,
        textAlign: 'center',
        fontWeight: 800,
        fontSize: 'large'
      },
      body1: {
        color: theme.palette.primary.dark,
        // textAlign: 'center',
        fontWeight: 900,
      },
      body2: {
        color: theme.palette.primary.dark,
        textAlign: 'center',
        fontWeight: 900,
      },
    }
  },
  // Tabs
  MuiTab: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.secondary.light,
          topBorderRadius: '20px',
          fontWeight: 600,
        },
        color: theme.palette.primary.dark,
        topBorderRadius: '20px',
        fontWeight: 600,
      }
    }
  },
  // Buttons
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        textTransform: 'none',
        color: theme.palette.primary.dark,
        fontWeight: 700,
      },
      contained: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.dark,
        underline: 'none',
        borderRadius: '20px',
        fontWeight: 700,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.light,
        },
      },
      containedPrimary: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        underline: 'none',
        borderRadius: '20px',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.primary.light,
        },
      },
      containedSecondary: {
        fontWeight: 700,
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
        underline: 'none',
        borderRadius: '20px',
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.dark,
        },
      },
    }
  },
  // Links
  MuiLink: {
    styleOverrides: {
      root: {
        my: 2,
        display: 'block',
      },
      underlineNone: {
        fontWeight: '600',
        color: theme.palette.primary.dark,
        '&:hover': {
          color: theme.palette.secondary.main,
        }
      }

    }
  },
  // Cards
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: 'none',
        borderRadius: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: 'none',
        margin: 0
      }
    }
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        bottomBorderRadius: '20px',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: 'none',
        // backgroundImage: 'url(${"./light-blue.jpg"})',
        backgroundColor: 'none',
        // backgroundColor: theme.palette.primary.light,
        // color: theme.palette.secondary.light,
        fontWeight: 500
      }
    }
  },
  MuiCardMedia: {
    styleOverrides: {
      root: {
        // borderRadius: '20px',
        height: '40%',
      }
    }
  },
  // MuiInputLabel: {
  //     root: {
  //     textTransform: 'uppercase',
  //     fontSize: '1.5rem',
  //     },
  // },
  // MuiInput: {
  //     root: {
  //     top: theme.spacing(2),
  //     border: `1px solid ${grey[500]}`,
  //     outline: `1px solid transparent`,
  //     padding: theme.spacing(1),
  //     '&$focused': {
  //         border: `1px solid ${theme.palette.primary.main}`,
  //         outline: `1px solid ${theme.palette.primary.main}`,
  //     },
  //     },
  // },
  // MuiTooltip: {
  //     tooltip: {
  //     backgroundColor: '#fff',
  //     border: `2px solid ${theme.palette.primary.main}`,
  //     color: theme.palette.primary.main,
  //     },
  //     arrow: {
  //     color: theme.palette.primary.main,
  //     },
  // },
};

export default theme;