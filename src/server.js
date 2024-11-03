// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permet de lire les requêtes JSON

// Connectez-vous à MongoDB
mongoose.connect('mongodb://localhost:27017/nomDeVotreDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch((error) => console.error('Erreur de connexion MongoDB:', error));

// Définissez votre modèle utilisateur
const utilisateurSchema = new mongoose.Schema({
  nomUtilisateur: String,
  motDePasse: String,
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

// Créez une route pour enregistrer un utilisateur
app.post('/register', async (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;
  const utilisateur = new Utilisateur({ nomUtilisateur, motDePasse });
  await utilisateur.save();
  res.send({ message: 'Utilisateur enregistré avec succès' });
});

// Créez une route pour authentifier un utilisateur
app.post('/login', async (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;
  const utilisateur = await Utilisateur.findOne({ nomUtilisateur, motDePasse });
  if (utilisateur) {
    res.send({ message: 'Connexion réussie', utilisateur });
  } else {
    res.status(400).send({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }
});

// Démarrez le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur exécuté sur le port ${PORT}`);
});