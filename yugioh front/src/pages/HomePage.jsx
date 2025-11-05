import { useState, useEffect } from "react";
import { allCards } from '../services/cardAPI';

function HomePage() {
    const [cards, setCards] = useState([]);


    const fetchCards = async () => {
        try {
            const response = await allCards();
            setCards(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <div>Liste des cartes</div>
            <ul>
                {cards.map((carte) => (
                    <li key={carte.CarteId}>{carte.NomCarte}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage