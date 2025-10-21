import * as rareteModel from "../Models/rareteModel.js";


export const getAllRaretes = async (req, res) => {
  try {
    const raretes = await rareteModel.getAllRaretes();
    res.status(200).json(raretes);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};

export const createRarete = async (req, res) => {
  console.log("Body reçu:", req.body);  // pour tester ce qui arrive

  if (!req.body) {
    return res.status(400).json({ error: "Body manquant" });
  }

  const { NomRarete } = req.body;
  if (!NomRarete) {
    return res.status(400).json({ error: "NomRarete est requis" });
  }
  try {
    const result = await rareteModel.createRarete(NomRarete);
    res.status(201).json({ message: "Rareté créée", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur rareté" });
  }
};

export const updateRarete = async (req, res) => {
  const id = req.params.id;
  const { NomRarete } = req.body;

  if (!NomRarete) {
    return res.status(400).json({ error: "Le champ NomAttribut est requis" });
  }

  try {
    const result = await rareteModel.updateRarete(id, NomRarete);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rareté non trouvée" });
    }

    res.status(200).json({ message: "Rareté mis à jour" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteRarete = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await rareteModel.deleteRarete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rareté non trouvée" });
    }

    res.status(200).json({ message: "Rareté supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
