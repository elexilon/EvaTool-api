const router = require('express').Router()
const { SchoolClass } = require('../models')

router.get('/classes', (req, res, next) => {
  SchoolClass.find()
    .sort({ createdAt: -1 })
    .then((classes) => res.json(classes))
    .catch((error) => next(error))
  })
  .get('/classes/:id', (req, res, next) => {
    const id = req.params.id
    SchoolClass.findById(id)
      .then((schoolClasses) => {
        if (!schoolClasses) { return next() }
        res.json(schoolClasses)
      })
      .catch((error) => next(error))
  })
  .post('/classes', (req, res, next) => {
    let newClass = req.body

    SchoolClass.create(newClass)
      .then((schoolClass) => res.json(schoolClass))
      .catch((error) => next(error))
  })

module.exports = router
