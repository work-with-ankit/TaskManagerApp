const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


  const userSchema = new mongoose .Schema({

    name:{
        type:String,
        required:true,

    },
    email:{
        type: String,
        required:[ true, " email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "password is required"],

    },

 },
  {timestamps:true})

 userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try {
           this.password =  await  bcrypt.hash(this.password, 10);
           next();
    
      } catch (error) {
         
        next(error)
    
}

 })
  userSchema.methods.matchPassword= async function(enteredPassword){
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error("Password Comparison failed")
        
    }
  }
   




  module.exports= mongoose.model("User", userSchema);