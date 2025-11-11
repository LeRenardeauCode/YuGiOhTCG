import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Container,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PeopleIcon from '@mui/icons-material/People';
import StyleIcon from '@mui/icons-material/Style';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalDecks: 0
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload);

    // Vérifier si admin ou modérateur
    if (payload.roleId !== 5 && payload.roleId !== 7) {
      navigate('/'); // Rediriger si pas admin/modérateur
      return;
    }

    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      // Récupérer les stats depuis le backend
      const [users, cards] = await Promise.all([
        api.get('/api/users'),
        api.get('/api/allCards')
      ]);

      setStats({
        totalUsers: users.data.length || 0,
        totalCards: cards.data.length || 0,
        totalDecks: 0 // À implémenter plus tard
      });
    } catch (err) {
      console.error('Erreur chargement stats:', err);
    }
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" sx={{ color: '#FFD700', fontWeight: 700, mb: 4 }}>
          Tableau de bord
        </Typography>

        <Grid container spacing={3}>
          {/* Carte Utilisateurs */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#1a1a1a', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <PeopleIcon sx={{ fontSize: 60, color: '#FFD700', mb: 2 }} />
                <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 700 }}>
                  {stats.totalUsers}
                </Typography>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Utilisateurs
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Carte Cartes */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#1a1a1a', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <StyleIcon sx={{ fontSize: 60, color: '#FFD700', mb: 2 }} />
                <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 700 }}>
                  {stats.totalCards}
                </Typography>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Cartes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Carte Decks */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#1a1a1a', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <CollectionsIcon sx={{ fontSize: 60, color: '#FFD700', mb: 2 }} />
                <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 700 }}>
                  {stats.totalDecks}
                </Typography>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Decks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Zone d'administration */}
        <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: '#1a1a1a' }}>
          <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 3 }}>
            Actions rapides
          </Typography>
          <Typography sx={{ color: '#fff' }}>
            • Gestion des utilisateurs (à venir)<br />
            • Gestion des cartes (à venir)<br />
            • Modération des decks (à venir)
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
