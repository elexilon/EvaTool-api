const passport = require('passport')
const mongoose = require('mongoose')
const passportJWT = require('passport-jwt')
const { User } = require('../models')
const jwtOptions = require('./jwt')

const JwtStrategy = passportJWT.Strategy

const tokenStrategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  const user = User.findById(jwtPayload.id)
    .then((user) => {
      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
    .catch((err) => next(err, false))
})

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(tokenStrategy)

module.exports = passport
