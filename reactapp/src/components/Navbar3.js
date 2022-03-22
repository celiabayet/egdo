import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import '../stylesheets/App.css'

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

  const pages = [
    {name: 'Accueil', route: '/'},
    {name: 'Qui sommes-nous ?', route: '/'}, 
    {name: 'Elève', route: '/espace-eleve'},
    {name: 'Insertion', route: '/espace-insertion'},
    {name: 'Bénévole', route: '/espace-benevole'},
    {name: 'Blog', route: '/blog'}];

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo */}
          <LinkRouter
            to='/'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <img
                onClick={window.scrollTo(0, 0)}
                src="./images/general/egdo_logo.png"
                className="img-fluid"
                alt="Logo."
                style={{ display: { xs: 'none' } }}
              />
          </LinkRouter>

          {/* Mobile navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <LinkRouter  
                  to={page.route}
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                  style={{ textDecoration: 'none' }}
                  >
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </LinkRouter>
                
              ))}
              <LinkRouter
                key='act'
                to='/j-agis'
                underline='none'
                style={{ textDecoration: 'none' }}
                ml={4}>
                <Link underline='none'>
                  <MenuItem key="J-agis" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">J'agis</Typography>
                  </MenuItem>
                </Link>
              </LinkRouter>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            mr={7}
          >
            <LinkRouter
              to="/"
              ml={2}
              style={{ textDecoration: 'none'}}
              onClick={window.scrollTo(0, 0)}
            >
              <img
                src="./images/general/egdo_logo.png"
                className="img-fluid"
                alt="Logo."
              />
            </LinkRouter>
          </Typography>

          {/* Web navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around', alignItems: 'center' }} >
            {pages.map((page) => (
                <LinkRouter  
                  underline='none'
                  to={page.route}
                  // style={{ textDecoration: 'none' }}
                  >
                  <MenuItem key={page.name} onClick={handleCloseNavMenu} className='link-router underline'>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </LinkRouter>
                
              ))}
            <LinkRouter
              key='act'
              to='/j-agis'
              underline='none'
              style={{ textDecoration: 'none' }}
              ml={4}>
              <Button color='secondary' variant='contained'>
                J'agis
              </Button>
            </LinkRouter>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;