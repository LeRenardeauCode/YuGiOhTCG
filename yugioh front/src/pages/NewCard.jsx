import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import { useState } from 'react';
import { createCard } from '../services/cardAPI';

const NewCard = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(0);
  const [attaque, setAttaque] = useState(0);
  const [defense, setDefense] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [attribut, setAttribut] = useState(0);
  const [niveau, setNiveau] = useState(0);
  const [rarete, setRarete] = useState(0);
  const [codeEdition, setCodeEdition] = useState('');

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
      // Ici tu peux réinitialiser le formulaire ou rediriger
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
      <h1>Création d'une nouvelle carte</h1>

      <TextField label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
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
        <Select value={type} onChange={(e) => setType(e.target.value)} label="Type">
          <MenuItem value={1}>Type 1</MenuItem>
          <MenuItem value={2}>Type 2</MenuItem>
          <MenuItem value={3}>Type 3</MenuItem>
          <MenuItem value={4}>Type 4</MenuItem>
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
      <TextField label="URL Image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

      <FormControl required>
        <InputLabel>Attribut</InputLabel>
        <Select value={attribut} onChange={(e) => setAttribut(e.target.value)} label="Attribut">
          <MenuItem value={1}>Attribut 1</MenuItem>
          <MenuItem value={2}>Attribut 2</MenuItem>
          <MenuItem value={3}>Attribut 3</MenuItem>
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
        <Select value={rarete} onChange={(e) => setRarete(e.target.value)} label="Rarete">
          <MenuItem value={1}>Rarete 1</MenuItem>
          <MenuItem value={2}>Rarete 2</MenuItem>
          <MenuItem value={3}>Rarete 3</MenuItem>
          <MenuItem value={4}>Rarete 4</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Code Edition" value={codeEdition} onChange={(e) => setCodeEdition(e.target.value)} />

      <Button type="submit" variant="contained" color="primary">
        Créer la carte
      </Button>
    </Box>
  );
};

export default NewCard;
