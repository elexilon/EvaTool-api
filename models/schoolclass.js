const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  evaluationColor: { type: String, required: true },
  evaluatedBy: { type: String, required: true },
  evaluatedAt: { type: Date, default: Date.now }
})

const studentSchema = new Schema({
  fullName: { type: String, required: true },
  photo: { type: String, required: true },
  evaluations: [evaluationSchema]
})


const schoolClassSchema = new Schema({
  batch: { type: Number, required: true },
  students: [studentSchema],
  startsAt: { type: Date, default: Date.now, required: true },
  endsAt: { type: Date, default: Date.now, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('schoolClasses', schoolClassSchema)
