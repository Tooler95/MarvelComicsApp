import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, MenuItem, Menu, Icon} from '@material-ui/core/';
import { SidebarData } from './NavData';
import Settings from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/MoreVert';
import Avenger from '../images/Marvel.png'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    paddingRight: '10%',
  
  },
  nav: {
    backgroundColor: '#151515',
    boxShadow: '5px 5px 10px black',
    padding: '0 10% 0 10%'
  },
  navIcon: {
    width: '60px',
    color: 'red'
  },
  siteName: {
    fontSize: '28px',
    fontFamily: 'roboto',
    color: 'white',
    textShadow: '5px 5px 5px black'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = (anchorEl);
  const isMobileMenuOpen = (mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {handleMenuClose(); handleImages()}}>{props.controls.showImages === true ? 'Show' : 'Hide'} content without Images</MenuItem>
    </Menu>
  );

  const hideImages = props.hideImages
  const handleImages = () => {
    hideImages(!props.controls.showImages)
  }

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
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Settings />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      {SidebarData.map((item, index) => (
          <MenuItem onClick={() => {handleMenuClose(); getMediaType({type: item.type, offset: 0, page: 1, item: ''})}} key={index}>{item.primary}</MenuItem>
      ))}
      
    </Menu>
  );

  const getMediaType = props.value

  return (
    <div className={classes.grow}>
      
      <AppBar>

        <Toolbar className={classes.nav}>
          <img className={classes.navIcon} src={Avenger}></img>
          <MenuItem className={classes.siteName}>Marvel App</MenuItem>
          
          {SidebarData.map((item, index) => (
              <MenuItem onClick={() => getMediaType({type: item.type, offset: 0, page: 1, item: ''})} key={index} className={classes.sectionDesktop}>{item.primary}</MenuItem>
          ))}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Settings />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}