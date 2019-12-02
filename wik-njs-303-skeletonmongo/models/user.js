const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const uuidv4 = require('uuid/v4');

var Users = mongoose.model('users', new mongoose.Schema({ 
  rowid: String,
  pseudo: String,
  lastname: String,
  firstname: String,
  email: String,
  password: String
}))

module.exports = {
  get: async (id) => {
    const user = await Users.findOne({rowid:id})
    return user
  },

  count: async () => {
    return await Users.count()
  },


  getAll: async () => {
     const all = await Users.find({})
     return all
  },

  insert: async (params) => {
    var params = { 
      rowid: uuidv4(),
      pseudo: params.pseudo,
      firstname: params.firstname,
      lastname: params.lastname,
      email: params.email,
      password: params.password
    }

    let newUser = new Users(params)
    newUser.save()
  },

  

  remove: async (id) => {
    Users.findOneAndRemove({
      rowid: id
    },function(err,data) {
          if(!err){
            console.log("Deleted")
          }
      })
    

  },


  update: async (id, params) => {
    var els = { 
      pseudo: params.pseudo,
      firstname: params.firstname,
      lastname: params.lastname,
      email: params.email,
      password: params.password
    }
    return await Users.updateOne({'rowid': id,}, els)
  },
}
