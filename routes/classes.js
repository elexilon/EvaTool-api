const router = require('express').Router()
const { SchoolClass } = require('../models')
const passport = require('../config/auth')

const authenticate = passport.authorize('jwt', { session: false })

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
  .put('/classes/:id', (req, res, next) => {
    const classId = req.params.id
    let updaClass = req.body

    SchoolClass.findOneAndUpdate(classId, updaClass)
    .then((schoolClass) => {
      if (!schoolClass) { return next() }
      res.status = 200
      res.json(schoolClass)
    })
    .catch((error) => next(error))
  })
  .patch('/classes/:id', (req, res, next) => {
    const classId = req.params.id
    let updaClass = req.body

    SchoolClass.findOneAndUpdate(classId, updaClass)
    .then((schoolClass) => {
      if (!schoolClass) { return next() }
      res.status = 200
      res.json(schoolClass)
    })
    .catch((error) => next(error))

  })
  .patch('/classes/:id/students', authenticate, (req, res, next) => {
    const id = req.params.id
    const patchForGame = req.body

    SchoolClass.findById(id)
      .then((schoolClass) => {
        if (!schoolClass) { return next() }
        const updatedClass = { ...schoolClass, ...patchForGame }
        SchoolClass.findByIdAndUpdate(id, { $set: updatedClass }, { new: true })
        .then((schoolClass) => {
          if (!schoolClass) { return next() }
          res.status = 200
          res.json(schoolClass)
        })
        .catch((error) => next(error))
      })
      .catch((error) => next(error))

  })
  .patch('/classes/:id/update', authenticate, (req, res, next) => {
    const id = req.params.id
    const student = req.body

    SchoolClass.findById(id)
      .then((schoolClass) => {
        if (!schoolClass) { return next() }

        schoolClass.students.filter((g) => (g._id.toString() === student._id))[0].evaluations = student.evaluations


        SchoolClass.findByIdAndUpdate(id, { $set: schoolClass }, { new: true })
        .then((schoolClass) => {
          if (!schoolClass) { return next() }
          res.status = 200
          res.json(schoolClass)
        })
        .catch((error) => next(error))
      })
      .catch((error) => next(error))

  })
  .patch('/classes/:id/students/:studentid', authenticate, (req, res, next) => {
    const id = req.params.id
    const studentId = req.params.studentid

    SchoolClass.findById(id)
      .then((schoolClass) => {
        if (!schoolClass) { return next() }

        const students = schoolClass.students.filter((g) => (g._id.toString() !== studentId))
        const studentsClass = {
          students: students,
        }
        const updatedClass = { ...schoolClass, ...studentsClass  }

        SchoolClass.findByIdAndUpdate(id, { $set: updatedClass }, { new: true })
        .then((schoolClass) => {
          if (!schoolClass) { return next() }
          res.status = 200
          res.json(schoolClass)
        })
        .catch((error) => next(error))
      })
      .catch((error) => next(error))

  })
  .delete('/classes/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    console.log(id)
    SchoolClass.findByIdAndRemove(id)
    .then((schoolClass) => {
      if (!schoolClass) { return next() }
      res.status = 204
    })
    .catch((error) => next(error))
  })

module.exports = router
