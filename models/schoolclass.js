const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  _id: { type: String, required: false }
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
