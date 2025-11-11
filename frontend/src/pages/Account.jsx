import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Container,
  Avatar,
  Grid,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Account() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadUserFromToken();
    loadProfile();
  }, [navigate]);

  const loadUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (err) {
        console.error('Erreur décodage token:', err);
        navigate('/login');
      }
    }
  };

  const loadProfile = async () => {
    try {
      const response = await api.get('/api/profile');
      setProfile(response.data);
    } catch (err) {
      console.error('Erreur chargement profil:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleName = (roleId) => {
    switch(roleId) {
      case 5: return 'Administrateur';
      case 6: return 'Utilisateur';
      case 7: return 'Modérateur';
      default: return 'Inconnu';
    }
  };

  const getRoleColor = (roleId) => {
    switch(roleId) {
      case 5: return '#FF0000';
      case 6: return '#FFD700';
      case 7: return '#FFA500';
      default: return '#FFD700';
    }
  };

  if (loading || !profile) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography sx={{ color: '#FFD700' }}>Chargement...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#1a1a1a' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: user ? getRoleColor(user.roleId) : '#FFD700',
                fontSize: '3rem',
                fontWeight: 700,
                margin: '0 auto',
                mb: 2
              }}
            >
              {profile.PrenomUser?.charAt(0)}{profile.NomUser?.charAt(0)}
            </Avatar>
            <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 700, mb: 1 }}>
              {profile.PrenomUser} {profile.NomUser}
            </Typography>
            <Chip 
              label={user ? getRoleName(user.roleId) : 'Utilisateur'}
              sx={{ 
                bgcolor: user ? getRoleColor(user.roleId) : '#FFD700',
                color: user?.roleId === 6 ? '#000' : '#fff',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PersonIcon sx={{ color: '#FFD700', fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Prénom
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFD700' }}>
                    {profile.PrenomUser}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PersonIcon sx={{ color: '#FFD700', fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Nom
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFD700' }}>
                    {profile.NomUser}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <EmailIcon sx={{ color: '#FFD700', fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Email
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFD700' }}>
                    {profile.MAIL}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CakeIcon sx={{ color: '#FFD700', fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Date de naissance
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFD700' }}>
                    {profile.DateNaissance ? new Date(profile.DateNaissance).toLocaleDateString('fr-FR') : 'Non renseignée'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CalendarMonthIcon sx={{ color: '#FFD700', fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Membre depuis
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFD700' }}>
                    {profile.DateInscription ? new Date(profile.DateInscription).toLocaleDateString('fr-FR') : 'Inconnue'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
