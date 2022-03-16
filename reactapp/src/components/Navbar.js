import * as React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = props.nav;

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LinkRouter
            to='/'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            style={{ textDecoration: 'none' }}
          // onClick={window.scrollTo(0, 0)}
          >
            <Link sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <img
                src="./images/general/egdo_logo.png"
                className="img-fluid"
                alt="Logo."
                style={{ display: { xs: 'none' } }}
              />
            </Link>
          </LinkRouter>

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
                <Link
                  href={`#${page}`}
                >

                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <LinkRouter
                key='act'
                to='/blog'
                underline='none'
                style={{ textDecoration: 'none' }}
              //ml={5}
              >
                <Link underline='none'>
                  <MenuItem key="Blog" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Blog</Typography>
                  </MenuItem>
                </Link>
              </LinkRouter>
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
              style={{ textDecoration: 'none' }}
            // onClick={window.scrollTo(0, 0)}
            >
              <img
                src="./images/general/egdo_logo.png"
                className="img-fluid"
                alt="Logo."
              />
            </LinkRouter>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }} >
            {pages.map((page) => (
              <Link
                href={`#${page}`}
                key={page}
                underline='none'
                onClick={handleCloseNavMenu}
                mr={8}
                className='underline'
              >
                {page}
              </Link>
            ))}
            <LinkRouter
              key='act'
              to='/blog'
              underline='none'
              style={{ textDecoration: 'none' }}
            //ml={5}
            >
              <Link underline='none' mr={6}>
                Blog
              </Link>
            </LinkRouter>
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