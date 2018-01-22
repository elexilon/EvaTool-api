const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  fullName: { type: String, required: true },
  photo: { type: String, required: true },
  evaluationColor: { type: String, required: true },
  previousEvaluationColor: { type: String, required: true },
  evaluatedAt: { type: Date, default: Date.now }
})


const schoolClassSchema = new Schema({
  batch: { type: Number, required: true },
  students: [studentSchema],
  startsAt: { type: Date, default: Date.now, required: true },
  endsAt: { type: Date, default: Date.now, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('schoolClasses', schoolClassSchema)
