import { useState, useEffect } from "react";
import { getAllCards } from "../services/cardAPI";
import CardCards from '../components/CardCards';
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";

function CardPage() {
    const [cards, setCards] = useState([]);

    const fetchCards = async () => {
        try {
            const response = await getAllCards();
            console.log(response);
            setCards(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <>
            <Container>
                <Typography variant="h3" align="center" sx={{ mt: 4 }}>Cartes</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mt: 4, mx: 'auto', justifyContent: "center" }}>

                    {cards.map(carte => (
                        <CardCards key={carte.CarteId} carte={carte} />
                    ))}

                </Box>
            </Container>
        </>
    );
}

export default CardPage;
