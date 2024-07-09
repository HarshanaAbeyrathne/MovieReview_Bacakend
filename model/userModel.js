const mongoose =  require ('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { 
        type: String, 

    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    mobile: { 
        type: Number, 
   
    },
},{timestamps: true})


module.exports = mongoose.model('User', userSchema)



// {
//     "name" : "Harshana",
//     "email" : "harshana@gmail.com"
//     "password" : "Harshana2001!"
//     "mobile" : "123"
// }