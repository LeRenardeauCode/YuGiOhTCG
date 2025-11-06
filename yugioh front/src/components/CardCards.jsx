import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function MediaCard({ carte }) {
    const {
        NomCarte,
        ImageUrl,
        DescriptionCarte,
        ATK,
        DEF,
        EffetCarte,
    } = carte;

    return (
        <Card
            sx={{
                width: 200,
                margin: 2,
                borderRadius: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                },
                background: 'linear-gradient(210deg, #00000021 60%, #f7e7a525 50%)',
                color: "#FFFAFA"
            }}
        >
            <CardMedia
                component="img"
                sx={{ height: 160, objectFit: 'cover' }}
                image={ImageUrl || '/default-card-image.jpg'}
                alt={NomCarte}
                title={NomCarte}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap sx={{ color: "#FFFAFA"}}>
                    {NomCarte}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "#FFFAFA", minHeight: 48, mb: 1 }}
                    noWrap
                >
                    {DescriptionCarte}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        color: "#FFFAFA",
                    }}
                >
                    <span>ATK: {ATK ?? 'N/A'}</span>
                    <span>DEF: {DEF ?? 'N/A'}</span>
                </Box>
                {EffetCarte && (
                    <Typography
                        variant="body2"
                        color="#FFFAFA"
                        sx={{ marginTop: 1, fontStyle: 'italic' }}
                    >
                        Effet: {EffetCarte}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center"}}>
                <Button size="small"  sx={{ color: "#FFFFF0", boxShadow: 2, border: 1, '&:hover': { backgroundColor: '#8B0000' }}}>
                    Partager
                </Button>
                <Button size="small" sx={{ color: "#FFFFF0", boxShadow: 2, border: 1, '&:hover': { backgroundColor: '#8B0000' }}} >
                    En savoir plus
                </Button>
            </CardActions>
        </Card>
    );
}