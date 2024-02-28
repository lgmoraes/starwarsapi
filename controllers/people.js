const axios = require("axios");

exports.getAllPeople = async (req, res, next) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    res.send(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    res.status(500).send("Erreur lors de la récupération des données");
  }
};

exports.getPeople = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/${req.params.id}/`
    );
    res.send(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    res.status(500).send("Erreur lors de la récupération des données");
  }
};
