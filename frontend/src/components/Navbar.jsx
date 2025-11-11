import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { logout } from '../services/authAPI';

const pages = [
  { label: 'Accueil', path: '/' },
  { label: 'Cartes', path: '/card' },
  { label: 'Nouvelle Carte', path: '/new-card' }
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  // Récupérer les infos utilisateur au chargement
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Décoder le token JWT pour récupérer les infos
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          userId: payload.userId,
          mail: payload.mail,
          roleId: payload.roleId
        });
      } catch (error) {
        console.error('Erreur décodage token:', error);
      }
    }
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
    setUser(null);
    handleCloseUserMenu();
  };

  const handleMenuClick = (action) => {
    handleCloseUserMenu();
    
    switch (action) {
      case 'Profil':
        navigate('/profile');
        break;
      case 'Mon Compte':
        navigate('/account');
        break;
      case 'Tableau de bord':
        // Accessible uniquement aux admins et modérateurs
        if (user?.roleId === 5 || user?.roleId === 7) {
          navigate('/dashboard');
        }
        break;
      case 'Déconnexion':
        handleLogout();
        break;
      default:
        break;
    }
  };

  // Options du menu selon le rôle
  const getMenuSettings = () => {
    if (!user) return [];

    const baseSettings = ['Profil', 'Mon Compte'];
    
    // Admin (roleId = 1) ou Modérateur (roleId = 3) voient le tableau de bord
    if (user.roleId === 5 || user.roleId === 7) {
      return [...baseSettings, 'Tableau de bord', 'Déconnexion'];
    }
    
    // User normal (roleId = 2)
    return [...baseSettings, 'Déconnexion'];
  };

  const settings = getMenuSettings();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFD700',
              textDecoration: 'none',
            }}
          >
            Yu-Gi-Oh Master
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: '#FFD700' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(({ label, path }) => (
                <MenuItem
                  key={label}
                  component={Link}
                  to={path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: '#FFD700',
                    '&:hover': { backgroundColor: '#8B0000' }
                  }}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#FFD700' }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFD700',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ label, path }) => (
              <Button
                key={label}
                component={Link}
                to={path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: '#FFD700',
                  display: 'block',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#8B0000' }
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              // Si connecté, afficher l'avatar
              <>
                <Tooltip title="Ouvrir paramètres">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, background: "black" }}>
                    <Avatar 
                      alt={user.mail} 
                      sx={{ bgcolor: user.roleId === 5 ? '#FF0000' : user.roleId === 7 ? '#FFA500' : '#FFD700' }}
                    >
                      {user?.mail?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar-user"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleMenuClick(setting)}
                      sx={{
                        background: "black",
                        color: '#FFD700',
                        '&:hover': { backgroundColor: '#8B0000' }
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              // Si non connecté, afficher boutons Login/Register
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: '#FFD700',
                    border: '1px solid #FFD700',
                    '&:hover': { backgroundColor: '#8B0000' }
                  }}
                >
                  Connexion
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    color: '#000',
                    backgroundColor: '#FFD700',
                    '&:hover': { backgroundColor: '#FFA500' }
                  }}
                >
                  Inscription
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
