
const User = require('../Models/user');


const getUsers = (req, res) => {

    User.getAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};


const getUserByEmail = (req, res) => {
    const searchTerm = req.params.email; // Use req.params to get parameters from the URL path
    if (!searchTerm) {
        return res.status(400).send("email parameter is missing");
    }

    User.getUser(searchTerm, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};
const addUser = async (req, res) => {
    try {
        const { firstName, lastName, email, birth, password } = req.body;
        await User.addUser({ firstName, lastName, email, birth, password });
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getUserByEmail, getUsers, addUser }