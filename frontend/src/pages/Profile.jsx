import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Paper,
  Container,
  Divider,
  Avatar
} from '@mui/material';
import api from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    PrenomUser: '',
    NomUser: '',
    Mail: '',
    DateNaissance: ''
  });
  const [passwords, setPasswords] = useState({
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
    loadUserFromToken();
  }, []);

  const loadUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    }
  };

  const loadProfile = async () => {
    try {
      const response = await api.get('/api/profile');
      setProfile({
        PrenomUser: response.data.PrenomUser,
        NomUser: response.data.NomUser,
        Mail: response.data.Mail,
        DateNaissance: response.data.DateNaissance?.split('T')[0] || ''
      });
    } catch (err) {
        console.error('Erreur chargement profil:', err);
      setError('Erreur lors du chargement du profil');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      await api.put('/api/profile', profile);
      setSuccess('Profil mis à jour avec succès !');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (passwords.nouveauMotDePasse !== passwords.confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    
    try {
      await api.put('/api/profile/password', {
        ancienMotDePasse: passwords.ancienMotDePasse,
        nouveauMotDePasse: passwords.nouveauMotDePasse
      });
      setSuccess('Mot de passe modifié avec succès !');
      setPasswords({ ancienMotDePasse: '', nouveauMotDePasse: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const getRoleName = (roleId) => {
    switch(roleId) {
      case 1: return 'Administrateur';
      case 2: return 'Utilisateur';
      case 3: return 'Modérateur';
      default: return 'Inconnu';
    }
  };

  const getRoleColor = (roleId) => {
    switch(roleId) {
      case 1: return '#FF0000';
      case 2: return '#FFD700';
      case 3: return '#FFA500';
      default: return '#FFD700';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* En-tête du profil */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#1a1a1a' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: user ? getRoleColor(user.roleId) : '#FFD700',
                fontSize: '2rem',
                fontWeight: 700
              }}
            >
              {profile.PrenomUser.charAt(0)}{profile.NomUser.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 700 }}>
                {profile.PrenomUser} {profile.NomUser}
              </Typography>
              <Typography variant="body1" sx={{ color: '#fff' }}>
                {profile.Mail}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: user ? getRoleColor(user.roleId) : '#FFD700',
                  fontWeight: 600
                }}
              >
                Rôle: {user ? getRoleName(user.roleId) : ''}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Modification du profil */}
        <Paper elevation={3} sx={{ p: 4, mb: 3, backgroundColor: '#1a1a1a' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#FFD700', fontWeight: 700 }}>
            Informations personnelles
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          
          <form onSubmit={handleProfileUpdate}>
            <TextField
              label="Prénom"
              fullWidth
              value={profile.PrenomUser}
              onChange={(e) => setProfile({...profile, PrenomUser: e.target.value})}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                }
              }}
            />
            
            <TextField
              label="Nom"
              fullWidth
              value={profile.NomUser}
              onChange={(e) => setProfile({...profile, NomUser: e.target.value})}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                }
              }}
            />
            
            <TextField
              label="Email"
              fullWidth
              disabled
              value={profile.Mail}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': { color: '#888' },
                '& .MuiOutlinedInput-root': { 
                  color: '#888',
                  '& fieldset': { borderColor: '#444' },
                }
              }}
            />
            
            <TextField
              label="Date de naissance"
              type="date"
              fullWidth
              value={profile.DateNaissance}
              onChange={(e) => setProfile({...profile, DateNaissance: e.target.value})}
              InputLabelProps={{ shrink: true }}
              sx={{ 
                mb: 3,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                }
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained"
              disabled={loading}
              sx={{ 
                backgroundColor: '#FFD700',
                color: '#000',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#FFA500' }
              }}
            >
              Enregistrer les modifications
            </Button>
          </form>
        </Paper>

        {/* Changement de mot de passe */}
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#1a1a1a' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#FFD700', fontWeight: 700 }}>
            Changer le mot de passe
          </Typography>
          
          <form onSubmit={handlePasswordChange}>
            <TextField
              label="Ancien mot de passe"
              type="password"
              fullWidth
              value={passwords.ancienMotDePasse}
              onChange={(e) => setPasswords({...passwords, ancienMotDePasse: e.target.value})}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                }
              }}
            />
            
            <TextField
              label="Nouveau mot de passe"
              type="password"
              fullWidth
              value={passwords.nouveauMotDePasse}
              onChange={(e) => setPasswords({...passwords, nouveauMotDePasse: e.target.value})}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                }
              }}
            />
            
            <TextField
              label="Confirmer le nouveau mot de passe"
              type="password"
              fullWidth
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              sx={{ 
                mb: 3,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                }
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained"
              disabled={loading}
              sx={{ 
                backgroundColor: '#8B0000',
                color: '#FFD700',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#660000' }
              }}
            >
              Modifier le mot de passe
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
