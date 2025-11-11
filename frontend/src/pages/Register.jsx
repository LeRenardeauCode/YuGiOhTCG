import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Container,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authAPI";

export default function Register() {
  const [formData, setFormData] = useState({
    PrenomUser: "",
    NomUser: "",
    Mail: "",
    MotDePasse: "",
    confirmPassword: "",
    DateNaissance: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.MotDePasse !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.MotDePasse.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        PrenomUser: formData.PrenomUser,
        NomUser: formData.NomUser,
        Mail: formData.Mail,
        MotDePasse: formData.MotDePasse,
        DateNaissance: formData.DateNaissance,
      };
      await register(dataToSend);

      console.log("✅ Inscription réussie");
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, backgroundColor: "#1a1a1a", color: "#FFD700" }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, textAlign: "center", fontWeight: 700 }}
          >
            Inscription
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Prénom"
              fullWidth
              required
              value={formData.PrenomUser}
              onChange={(e) =>
                setFormData({ ...formData, PrenomUser: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "#FFD700" },
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": { borderColor: "#FFD700" },
                  "&:hover fieldset": { borderColor: "#FFA500" },
                },
              }}
            />

            <TextField
              label="Nom"
              fullWidth
              required
              value={formData.NomUser}
              onChange={(e) =>
                setFormData({ ...formData, NomUser: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "#FFD700" },
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": { borderColor: "#FFD700" },
                  "&:hover fieldset": { borderColor: "#FFA500" },
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={formData.Mail}
              onChange={(e) =>
                setFormData({ ...formData, Mail: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "#FFD700" },
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": { borderColor: "#FFD700" },
                  "&:hover fieldset": { borderColor: "#FFA500" },
                },
              }}
            />

            <TextField
              label="Mot de passe"
              type="password"
              fullWidth
              required
              value={formData.MotDePasse}
              onChange={(e) =>
                setFormData({ ...formData, MotDePasse: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "#FFD700" },
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": { borderColor: "#FFD700" },
                  "&:hover fieldset": { borderColor: "#FFA500" },
                },
              }}
            />

            <TextField
              label="Confirmer le mot de passe"
              type="password"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "#FFD700" },
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": { borderColor: "#FFD700" },
                  "&:hover fieldset": { borderColor: "#FFA500" },
                },
              }}
            />

            <TextField
              label="Date de naissance"
              type="date"
              fullWidth
              value={formData.DateNaissance}
              onChange={(e) =>
                setFormData({ ...formData, DateNaissance: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": { color: "#FFD700" },
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": { borderColor: "#FFD700" },
                  "&:hover fieldset": { borderColor: "#FFA500" },
                },
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
                backgroundColor: "#FFD700",
                color: "#000",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#FFA500" },
              }}
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Déjà un compte ?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#FFD700",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Se connecter
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
