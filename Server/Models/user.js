const mongoose = require('mongoose');
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB.')
})
.catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message)
})

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    passwordHash: String

})

// Mongo object -> JSON object? Use utility method .toJSON()
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
    
})

module.exports = mongoose.model('user', userSchema)
