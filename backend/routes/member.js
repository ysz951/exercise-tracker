const router = require('express').Router();
let Member = require('../models/member.model');
const bcrypt = require('bcryptjs');

const hashPassword = password => {
    return bcrypt.hash(password, 12);
}
//localhost:5000/members/
router.route('/').get((req, res) => {
    Member.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


//localhost:5000/members/add
router.route('/add').post((req, res) => {
  const { username, password } = req.body;
  hashPassword(password)
    .then(password => {
        const newUser = new Member({username, password});
        return newUser.save();
    })
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  
  
//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;