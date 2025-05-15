const mongoose = require ('mongoose');

  const taskSchema  = new mongoose.Schema({
     
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,

    },
    image:{
          type:String,
    },
    status:{
        type:String,
        default: "pending",
    },
    assignedto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },{timestamps:true})

  module.exports= mongoose.model("Task", taskSchema);