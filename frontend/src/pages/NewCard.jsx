import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { createCard } from '../services/cardAPI';
import { getRaretes } from '../services/rareteAPI';
import { getTypes } from '../services/typeCardAPI';
import { getAttributs } from '../services/attributAPI';
import { getEditions } from '../services/editionAPI';

const NewCard = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [attaque, setAttaque] = useState(0);
  const [defense, setDefense] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [attribut, setAttribut] = useState('');
  const [niveau, setNiveau] = useState(0);
  const [rarete, setRarete] = useState('');
  const [codeEdition, setCodeEdition] = useState('');

  const [raretes, setRaretes] = useState([]);
  const [types, setTypes] = useState([]);
  const [attributs, setAttributs] = useState([]);
  const [editions, setEditions] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const raretesData = await getRaretes();
      const typesData = await getTypes();
      const attributsData = await getAttributs();
      const editionsData = await getEditions();

      setRaretes(raretesData);
      setTypes(typesData);
      setAttributs(attributsData);
      setEditions(editionsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  };

  fetchData();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCardData = {
      NomCarte: nom,
      DescriptionCarte: description,
      TypeCarteId: type,
      ATK: attaque,
      DEF: defense,
      ImageUrl: imageUrl,
      AttributId: attribut,
      NiveauCarte: niveau,
      RareteId: rarete,
      CodeEdition: codeEdition,
    };

    try {
      const result = await createCard(newCardData);
      console.log('Carte créée:', result);
    } catch (err) {
      console.error('Erreur création carte:', err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h3" align="center">
        Création d&apos;une nouvelle carte
      </Typography>

      <TextField
        label="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        required
      />

      <FormControl required>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
        >
          {types.map((t) => (
            <MenuItem key={t.TypeCarteId} value={t.TypeCarteId}>
              {t.NomTypeCarte}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Attaque"
        type="number"
        value={attaque}
        onChange={(e) => setAttaque(Number(e.target.value))}
        required
      />

      <TextField
        label="Défense"
        type="number"
        value={defense}
        onChange={(e) => setDefense(Number(e.target.value))}
        required
      />

      <TextField
        label="URL Image"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <FormControl required>
        <InputLabel>Attribut</InputLabel>
        <Select
          value={attribut}
          onChange={(e) => setAttribut(e.target.value)}
          label="Attribut"
        >
          {attributs.map((a) => (
            <MenuItem key={a.AttributId} value={a.AttributId}>
              {a.NomAttribut}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Niveau"
        type="number"
        value={niveau}
        onChange={(e) => setNiveau(Number(e.target.value))}
        required
      />

      <FormControl required>
        <InputLabel>Rarete</InputLabel>
        <Select
          value={rarete}
          onChange={(e) => setRarete(e.target.value)}
          label="Rarete"
        >
          {raretes.map((r) => (
            <MenuItem key={r.RareteId} value={r.RareteId}>
              {r.NomRarete}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Edition</InputLabel>
        <Select
          value={codeEdition}
          onChange={(e) => setCodeEdition(e.target.value)}
          label="Edition"
        >
          {editions.map((ed) => (
            <MenuItem key={ed.EditionId} value={ed.CodeEdition}>
              {ed.NomEdition}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Créer la carte
      </Button>
    </Box>
  );
};

export default NewCard;
