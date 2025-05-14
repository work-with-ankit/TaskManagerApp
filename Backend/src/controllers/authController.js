const User = require('../models/userModels');
const generateToken=  require("../utils/generateToken");

 
exports.register = async(req, res)=>{
     const {name, email, password}= req.body;
     
     try {
         
         const  userExist= await User.findOne({email});

         if(userExist){
             return res.status(400)
             .json({
                mesasge:" User Already Exist"
             });

         }

         const user=  await User.create({name, email, password});

         res.status(201)
         .json({
            _id : user._id,
            email:user.email,
            email: user.email,
            token: generateToken(user._id)

         });
        
     } catch (error) {
        
        res.status(500)
        .json({

            message: "server Error Cridiential",
            error: error.message,
        });
     }
}


exports.login = async( req, res)=>{
    const{ email, password} = req.body;
    try {
          const user = await User.findOne({email});
          if(!user){
            return res
            .status(401)
            .json({
                message: "User not Found"
            })

          }

          const isMatch =   await  user.matchPassword(password);
          
          if(!isMatch){
          return res.status(401)
            .json({
                message:"invalid crediantial"
            })
          }

          res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id),
          });

    } catch (error) {
       
        res.status(500).json({
            message: "Server error", error: error.message
        });
    }
}



