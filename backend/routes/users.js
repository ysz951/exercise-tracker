const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const hashPassword = password => {
  return bcrypt.hash(password, 12);
}

//localhost:5000/users/
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


//localhost:5000/users/add
router.route('/add').post((req, res) => {
  const { username, password } = req.body;
  hashPassword(password)
    .then(password => {
        const newUser = new User({username, password});
        return newUser.save();
    })
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;