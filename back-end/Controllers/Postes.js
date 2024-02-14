const Postes = require('../Models/Postes.js')

const getAll = (req, res) => {
      Postes.getAll((err, result) => {
            if (err) {
                  res.status(500).send(err)
            } else {
                  res.status(200).json(result)
            }
      })
}
const getOne = (req, res) => {
      nameId = req.params.id
      Postes.getOne(nameId, (err, result) => {
            if (err) {
                  res.status(400).send(err)
            } else {
                  res.status(202).json(result)
            }
      })
}
const add = (req, res) => {
      Postes.add(req.body, (err, result) => {
            if (err) {
                  res.status(500).send(err)
            } else {
                  res.status(200).json(result)
            }
      })
}
const Delete = (req, res) => {
      Postes.Delete(req.params.id, (err) => {
            if (err) {
                  res.status(500).send(err);
            } else {
                  res.status(204).send();
            }
      });
}
const update = (req, res) => {
      Postes.update(req.params.id, req.body, (err, result) => {
            if (err) {
                  res.status(500).send(err);
            } else if (!result) {
                  res.status(404).send("News is not found");
            } else {
                  res.status(200).send();
            }
      });
}
const searchByTitle = (req, res) => {
      const searchTerm = req.query.title;
      if (!searchTerm) {
            return res.status(400).send("Title parameter is missing");
      }

      Postes.searchByTitle(searchTerm, (err, result) => {
            if (err) {
                  res.status(500).send(err);
            } else {
                  res.status(200).json(result);
            }
      });
};

module.exports = {
      getAll,
      getOne,
      add,
      Delete,
      update,
      searchByTitle,
}