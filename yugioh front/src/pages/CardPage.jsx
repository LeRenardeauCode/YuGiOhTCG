import { useState, useEffect } from "react";
import { getAllCards } from "../services/cardAPI";
import CardCards from '../components/CardCards';
import Box from "@mui/material/Box";

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
            <h1>Cartes</h1>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                {cards.map(carte => (
                    <CardCards key={carte.CarteId} carte={carte} />
                ))}

            </Box>
        </>
    );
}

export default CardPage;
