const express = require('express');
const AuthService = require('./auth-service');
const { requireAuth } = require('../middleware/jwt-auth');
let User = require('../models/user.model');
const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body
    const loginUser = { user_name, password }
    
    for (const [key, value] of Object.entries(loginUser)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    }
    User.findOne({ username: user_name })
      .then(mem => {
        if (!mem) {
          throw new Error("Incorrect user_name");
        }
        return AuthService.comparePasswords(loginUser.password, mem.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect user_name or password',
              })
            const sub = mem.username;
            const payload = { user_id: mem.id };
          
            
            // console.log(payload);
            res.send({
              authToken: AuthService.createJwt(sub, payload),
            });
            // return res.json("Login");
          })
      }) 
      .catch(err => {
        res.status(400).json('Error: ' + err.message)
      });
  })

authRouter.post('/refresh', requireAuth, (req, res) => {
  const sub = req.user.username;
  const payload = { user_id: req.user.id };
  // console.log(req.user.id)
  // res.end()
  res.send({
    authToken: AuthService.createJwt(sub, payload),
  });
})

module.exports = authRouter;
