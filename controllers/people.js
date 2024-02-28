const axios = require("axios");

exports.getAllPeople = async (req, res, next) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    const simplifiedCharacters = response.data.results.map(
      ({ name, height, gender, films }) => ({ name, height, gender, films })
    );
    res.send(simplifiedCharacters);
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
    res.send({
      name: response.data.name,
      height: response.data.height,
      gender: response.data.gender,
      films: response.data.films,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    res.status(500).send("Erreur lors de la récupération des données");
  }
};
