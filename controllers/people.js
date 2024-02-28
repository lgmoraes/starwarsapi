const axios = require("axios");

exports.getAllPeople = async (req, res, next) => {
  try {
    Promise.all([
      axios.get("https://swapi.dev/api/people/"),
      axios.get("https://swapi.dev/api/films/"),
    ]).then((responses) => {
      const filmsList = responses[1].data.results;

      const simplifiedCharacters = responses[0].data.results.map(
        ({ name, height, gender, films }) => ({ name, height, gender, films })
      );

      simplifiedCharacters.forEach((char) => {
        const episodes = char.films.map((film) => film.split("/")[5]);
        const titles = episodes.map(
          (ep) => filmsList.find((f) => f.episode_id == ep).title
        );
        char.films = titles;
      });

      res.send(simplifiedCharacters);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    res.status(500).send("Erreur lors de la récupération des données");
  }
};

exports.getPeople = async (req, res, next) => {
  try {
    Promise.all([
      axios.get(`https://swapi.dev/api/people/${req.params.id}`),
      axios.get("https://swapi.dev/api/films/"),
    ]).then((responses) => {
      const char = responses[0].data;
      const filmsList = responses[1].data.results;

      const episodes = char.films.map((film) => film.split("/")[5]);
      const titles = episodes.map(
        (ep) => filmsList.find((f) => f.episode_id == ep).title
      );
      char.films = titles;

      res.send({
        name: char.name,
        height: char.height,
        gender: char.gender,
        films: char.films,
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    res.status(500).send("Erreur lors de la récupération des données");
  }
};
