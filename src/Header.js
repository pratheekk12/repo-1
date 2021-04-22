// import React from 'react';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import {
//     Box,
//     Hidden,
//     IconButton,
//     Tooltip,Grid
//   } from '@material-ui/core';
// import Logo from './Logo'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import {useSelector} from 'react-redux'


// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//       display: 'none',
//     },
//   },
// }));

// export default function PrimarySearchAppBar() {
//   const classes = useStyles();
//   const login = useSelector(state => state.log)
  

//   const logoutUser =()=>{
//       localStorage.clear()
//       window.location.reload()
//   }
 

//   return (
//     <div className={classes.grow}>
//       <Grid container spacing={3} direction="row">
//       <AppBar position="static" style={{backgroundColor:'white'}}>
//         <Toolbar>
//           <Logo/>
//           <Box flexGrow={1} />
//           <Hidden mdDown>
//               {
//                   login ? (
//                     <Tooltip title="Logout">
//                     <IconButton color="black" onClick={() => logoutUser()}>
//                     <ExitToAppIcon />
//                     </IconButton>
//                   </Tooltip>
//                   ) : null
//               }
          
//           </Hidden>
//         </Toolbar>

//       </AppBar>
//       </Grid>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import config from '../modules/ticketing/views/config.json';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Logo from './Logo'
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  fade,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';



const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    width: 40,
    height: 60
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 500,
    marginRight: 15,
    fontSize: '0.96rem',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputRoot: {
    color: 'white'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '30ch'
      }
    }
  }
}));






const TopBar = ({
  className,
  onMobileNavOpen,
  logout,
  searchDist,
  ...rest
}) => {
  


  const classes = useStyles();
  const [notifications] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const login = useSelector(state => state.log)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    > {
      login ? ( <MenuItem >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          
          onClick={()=>{
            localStorage.clear()
            window.location.reload()
          }}
        >
          <ExitToAppIcon />
        </IconButton>
        <p>logout</p>
      </MenuItem>) : null
    }
     
    </Menu>
  );

  return (<div>
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest} style={{ background: 'blue' }}>
      <Toolbar>
        <RouterLink to="/">
          <Logo/>
        </RouterLink>

        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={updateSearchText}
            value={searchText}
            onBlur={distributorID}
          />
        </div> */}
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            ><Typography className={classes.title} variant="h5" noWrap>
              </Typography>
            </Badge>
          </IconButton>
          {/* <IconButton color="inherit">
            <AccountBoxRoundedIcon />
          </IconButton> */}
          {
            login ? (  <Tooltip title="Logout">
            <IconButton color="inherit" onClick={()=>{
              localStorage.clear()
              window.location.reload()
            }}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>) : null
          }
        
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={handleMobileMenuOpen} aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true" >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
    { renderMobileMenu}
    { renderMenu}
  </div>
  );
};



TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  logout: PropTypes.func,
  searchDist: PropTypes.func
};

export default TopBar;