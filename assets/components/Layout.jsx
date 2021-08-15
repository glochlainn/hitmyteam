import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/layout.scss';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Tooltip } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1, 1, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  active: {
    color: '#ffd736',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  activeIcon: {
    color: '#ffd736',
  },
  toolbarUser: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [openAppbar, setOpenAppbar] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const [openSettings, setOpenSettings] = React.useState(false);
  const [summonerName, setSummonerName] = React.useState('');
  const [summonerNameError, setSummonerNameError] = React.useState(false);

  const handleClickOpen = () => {
    setOpenSettings(true);
  };

  const handleClose = () => {
    setOpenSettings(false);
  };

  const handleDrawerOpen = () => {
    setOpenAppbar(true);
  };

  const handleDrawerClose = () => {
    setOpenAppbar(false);
  };

  const mainMenuItems = [
    {
      text: 'Profil',
      icon: <AccountBoxIcon />,
      path: '/profil',
    },
  ];

  const secondMenuItems = [
    {
      text: 'Paramètres',
      icon: <SettingsIcon />,
      onClick: handleClickOpen,
    },
    {
      text: 'Déconnexion',
      icon: <ExitToAppIcon color='error' />,
      path: '/deconnexion',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSummonerNameError(false);

    if ((summonerName == '')) {
      setSummonerNameError(true);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openAppbar,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: openAppbar,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className='nav-text'>
            {mainMenuItems.map((item) => (
              <Typography variant='h6' noWrap>
                HitMyTeam
              </Typography>
            ))}
            <Avatar className={classes.avatar}></Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openAppbar,
          [classes.drawerClose]: !openAppbar,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openAppbar,
            [classes.drawerClose]: !openAppbar,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography>HMT</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {mainMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon className={location.pathname == item.path ? classes.activeIcon : null}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondMenuItems.map((item) => (
            <ListItem button key={item.text} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog open={openSettings} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Paramètres</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez saisir votre nom d'invocateur afin de remplir votre profil. Vous devrez ensuite
            le valider en ajoutant la clé qui sera générée, dans l'onglet "Verifications" sur votre
            client League of Legends.
          </DialogContentText>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setSummonerName(e.target.value)}
              autoFocus
              margin='dense'
              label="Nom d'invocateur"
              type='text'
              fullWidth
              error={summonerNameError}
              required
            />
            <Tooltip title='Envoyer' aria-label='envoyer' placement='top' arrow>
              <IconButton type='submit' color='default'>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Annuler
          </Button>
          <Button type='submit' color='primary'>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}