import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Paper,
  Container 
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authAPI';

export default function Login() {
  const [formData, setFormData] = useState({ Mail: '', MotDePasse: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const data = await login(formData);
      console.log('✅ Connexion réussie:', data);
      
      // Redirection vers l'accueil
      navigate('/');
      window.location.reload(); // Force le refresh de la NavBar
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#1a1a1a', color: '#FFD700' }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 700 }}>
            Connexion
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={formData.Mail}
              onChange={(e) => setFormData({...formData, Mail: e.target.value})}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                  '&:hover fieldset': { borderColor: '#FFA500' },
                }
              }}
            />
            
            <TextField
              label="Mot de passe"
              type="password"
              fullWidth
              required
              value={formData.MotDePasse}
              onChange={(e) => setFormData({...formData, MotDePasse: e.target.value})}
              sx={{ 
                mb: 3,
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': { 
                  color: '#FFD700',
                  '& fieldset': { borderColor: '#FFD700' },
                  '&:hover fieldset': { borderColor: '#FFA500' },
                }
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              disabled={loading}
              sx={{ 
                mb: 2,
                backgroundColor: '#FFD700',
                color: '#000',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#FFA500' }
              }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Pas encore de compte ?{' '}
                <Link 
                  to="/register" 
                  style={{ color: '#FFD700', textDecoration: 'none', fontWeight: 600 }}
                >
                  S'inscrire
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
