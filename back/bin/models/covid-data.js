const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb+srv://vuluong:AQ1M3g2Nia8qity8@cluster0-itsai.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const CovidDataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  data: [
    [
      {
        type: Number,
        min: 0,
        unique: true
      },
      {
        type: Number,
        min: 0
      },
      {
        type: Number,
        min: 0
      }
    ]
  ]
})

module.exports = mongoose.model('CovidData', CovidDataSchema)
