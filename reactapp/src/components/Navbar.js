import React, { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { HashLink as RouterLink } from 'react-router-hash-link';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Link } from '@mui/material'
import { useHistory } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../stylesheets/App.css';

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory()
  useEffect(() => {
    console.log(history.location)
  }, [history])

  const pages = [
    { name: 'Accueil', menu: [], route: '/' },
    { name: 'Qui sommes-nous ?', menu: [{ name: 'Nos actions', anchor: 'Actions' }, { name: 'Histoire', anchor: 'Histoire' }, { name: "L'équipe", anchor: 'Equipe' }], route: '/' },
    { name: 'Elève', menu: [{ name: 'Actualités', anchor: 'Actualites' }, { name: 'Sorties', anchor: 'Sorties' }, { name: 'Football', anchor: 'Football' }, { name: 'Taekwendo', anchor: 'Taekwendo' }], route: '/espace-eleve' },
    { name: 'Insertion', menu: [{ name: 'Actualités', anchor: 'Actualites' }, { name: 'Evènements', anchor: 'Evenements' }, { name: 'Sports & Insertion', anchor: 'Programme' }, { name: 'Football', anchor: 'Football' }, { name: 'Taekwendo', anchor: 'Taekwendo' }], route: '/espace-insertion' },
    { name: 'Bénévole', menu: [{ name: 'Actualités', anchor: 'Actualites' }, { name: 'Soutien scolaire', anchor: 'Soutien' }, { name: 'Sorties', anchor: 'Sorties' }], route: '/espace-benevole' },
    { name: 'Blog', menu: [], route: '/blog' }
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

  return (

    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Mobile navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
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
              {pages.map((page, index) => (
                <LinkRouter
                  to={page.route}
                  underline='none'
                >
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </LinkRouter>

              ))}
              <LinkRouter
                key='act'
                to='/j-agis'
                underline='none'
              >
                <MenuItem key="J-agis" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">J'agis</Typography>
                </MenuItem>
              </LinkRouter>
            </Menu>
          </Box>
          <LinkRouter
            to="/"
            ml={2}
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            style={{ textDecoration: 'none' }}
          >
            <img
              src="./images/general/egdo_logo.png"
              className="img-fluid"
              alt="Logo"
              onClick={() => window.scrollTo(0, 0)}
            />
          </LinkRouter>

          {/* Web navbar */}
          <LinkRouter
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img
              onClick={() => window.scrollTo(0, 0)}
              src="./images/general/egdo_logo.png"
              className="img-fluid"
              alt="Logo"
              style={{ display: { xs: 'none' } }}
            />
          </LinkRouter>
          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
          >
            {pages.map((page, index) => {
              return page.menu.length === 0
                ? <LinkRouter
                  underline='none'
                  to={page.route}
                >
                  <Button key={index}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Button>
                </LinkRouter>
                : <>
                  <Button
                    key={index}
                    endIcon={<KeyboardArrowDownIcon />}
                    // aria-controls={open ? 'basic-menu' : undefined}
                    // aria-haspopup="true"
                    // aria-expanded={open ? 'true' : undefined}
                    onClick={e => handleClick(index, e)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorEl && anchorEl[index]}
                    open={Boolean(anchorEl && anchorEl[index])}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {page.menu.map(item => {
                      return (
                        <LinkRouter
                          underline='none'
                          to={`${page.route}#${item.anchor}`}
                        >
                          <MenuItem key={page.name} onClick={handleCloseNavMenu} className='link-router underline' >
                            <Typography textAlign="center">{item.name}</Typography>
                          </MenuItem>
                        </LinkRouter>
                      )
                    })}
                  </Menu>
                </>
            })
            }

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