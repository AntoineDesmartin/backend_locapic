var express = require("express");
var router = express.Router();

require("../models/connection");
const Marker = require("../models/marqueur");

// 👉 À partir du backend déjà généré, créez les 3 routes décrites ci-dessous
//  en suivant les exemples de requêtes et de réponses : veillez à bien respecter
//  les noms des données reçues en paramètres d’URL ou dans le body pour chacune des routes.

// Vous devrez intégrer Mongoose à votre backend et modéliser une collection chargée d’enregistrer
//  tous les marqueurs d’un utilisateur en base de données.

// POST /places : ajout d’un marqueur en base de données (via req.body)

// Exemple de requête : POST /places

// { nickname: 'Max', name: 'Lyon', latitude: 45.758, longitude: 4.835 }

// Exemple de réponse :

// { result: true }

router.post("/places", (req, res) => {
  const newMarker = new Marker({
    nickname: req.body.nickname,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  newMarker.save().then((data) => {
    console.log(data);
    res.json({ result: true });
  });
});

// GET /places/:nickname : récupération de tous les marqueurs d’un utilisateur
// en fonction de son surnom (via req.params)

// Exemple de requête : GET /places/Max

// Exemple de réponse :

// { result: true, places: [{ nickname: 'John', name: 'Lyon', latitude: 45.758, longitude: 4.835 }, ...] }

router.get("/places/:nickname", (req, res) => {
  Marker.find({ nickname: req.params.nickname }).then((data) => {
    if (data) {
      res.json({ result: true, places: data });
    } else {
      res.json({ result: false });
    }
  });
});

// DELETE /places : suppression d’un marqueur à partir de son nom
// et du surnom de l’utilisateur (via req.body)

// Exemple de requête : DELETE /places

// { nickname: 'Max', name: 'Lyon' }

// Exemple de réponse :

// { result: true }

router.delete("/places", (req, res) => {
  Marker.findOne({ nickname: req.body.nickname, name: req.body.name }).then((data) => {
      //  res.json(data);
      if (data) {
        Marker.deleteOne({nickname: req.body.nickname,name: req.body.name,}).then((data) => {
            res.json({ result: true });
        });
      }else{
        res.json({ result: false });
      }
    }
  );
});

module.exports = router;
