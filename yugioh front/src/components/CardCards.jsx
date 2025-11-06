import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={ImageUrl || '/default-card-image.jpg'}
                title={NomCarte}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {NomCarte}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {DescriptionCarte}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ marginTop: 1 }}>
                    ATK: {ATK ?? 'N/A'} | DEF: {DEF ?? 'N/A'}
                </Typography>
                {EffetCarte && (
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        Effet: {EffetCarte}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small">Partager</Button>
                <Button size="small">En savoir plus</Button>
            </CardActions>
        </Card>
    );
}